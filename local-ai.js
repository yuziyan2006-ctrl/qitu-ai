const TRANSFORMERS_MODULE = "https://cdn.jsdelivr.net/npm/@xenova/transformers@2.17.2/dist/transformers.min.js";
const MODEL_ID = "onnx-community/Qwen2.5-0.5B-Instruct";

let generatorPromise = null;

function extractAssistantText(output) {
  const generated = output?.[0]?.generated_text;
  if (Array.isArray(generated)) {
    const assistant = [...generated].reverse().find((message) => message?.role === "assistant");
    return assistant?.content || generated.at(-1)?.content || "";
  }
  return typeof generated === "string" ? generated : "";
}

function parseJsonResponse(text) {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/i)?.[1];
  const candidate = (fenced || text).trim();
  const start = candidate.indexOf("{");
  const end = candidate.lastIndexOf("}");
  if (start < 0 || end <= start) return null;
  try {
    const data = JSON.parse(candidate.slice(start, end + 1));
    if (!data || !Array.isArray(data.recommendations)) return null;
    return data;
  } catch (_) {
    return null;
  }
}

async function getGenerator(onProgress) {
  if (!generatorPromise) {
    generatorPromise = (async () => {
      const adapter = await navigator.gpu?.requestAdapter();
      if (!adapter) throw new Error("未检测到可用的 WebGPU 适配器");
      const { pipeline, env } = await import(TRANSFORMERS_MODULE);
      env.allowLocalModels = true;
      env.allowRemoteModels = true;
      env.backends.onnx.wasm.wasmPaths = "/";
      env.useBrowserCache = true;
      return pipeline("text-generation", MODEL_ID, {
        device: "webgpu",
        dtype: "q4f16",
        progress_callback: (event) => {
          if (!onProgress) return;
          const numericProgress = Number(event?.progress);
          onProgress({
            phase: "download",
            progress: Number.isFinite(numericProgress) ? numericProgress : null,
            file: event?.file ? String(event.file).split("/").at(-1) : "模型组件"
          });
        }
      });
    })().catch((error) => {
      generatorPromise = null;
      throw error;
    });
  }
  return generatorPromise;
}

export async function generateLocalCareerAdvice(payload, onProgress) {
  const generator = await getGenerator(onProgress);
  onProgress?.({ phase: "generate", message: "正在比较候选职业与个人驱动力..." });

  const compactProfile = {
    六维分数: payload.scoreLabels,
    优势维度: payload.topDimensions,
    相对低分维度: payload.lowerDimensions,
    强作答信号: payload.strongSignals,
    可选职业: payload.candidates
  };

  const messages = [
    {
      role: "system",
      content: "你是一名谨慎的中文职业探索顾问。测评只代表当前偏好，不代表能力上限。只能从用户提供的可选职业中推荐，不做心理诊断，不承诺成功，不使用性别、年龄等敏感推断。你的任务是解释匹配、指出风险，并提供低成本验证动作。"
    },
    {
      role: "user",
      content: `请根据以下本地测评摘要，选择 5 个具体职业。职业名称必须与“可选职业”中的 job 完全一致。不要输出 Markdown，只输出一个合法 JSON 对象，格式为：
{"summary":"80字以内的综合判断","recommendations":[{"job":"职业名称","fit":"高匹配或中高匹配","why":"60字以内，引用具体维度说明匹配原因","daily":"45字以内的典型工作内容","watch":"45字以内的风险或待验证点","experiment":"45字以内、7天可完成的验证动作"}]}
不要添加 JSON 以外的任何文字。测评摘要：${JSON.stringify(compactProfile)}`
    }
  ];

  const output = await generator(messages, {
    max_new_tokens: 760,
    do_sample: false,
    repetition_penalty: 1.08,
    return_full_text: false
  });
  const raw = extractAssistantText(output).trim();
  return { raw, data: parseJsonResponse(raw) };
}

export const localAiMetadata = {
  library: "Transformers.js 4.2.0",
  model: MODEL_ID,
  license: "Apache-2.0",
  runtime: "WebGPU",
  quantization: "q4f16"
};
