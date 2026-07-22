# AI 模型文件

本目录存放浏览器端 AI 推理所需的模型权重文件。

## 需要的文件

- `onnx-community/Qwen2.5-0.5B-Instruct` 的 q4 量化 ONNX 模型（约 483MB）

## 获取方式

在开发机上运行以下命令，然后将 `models/` 目录复制到部署服务器：

```bash
# 方法一：通过 Transformers.js 下载（推荐）
mkdir -p models
cd models
npm install @xenova/transformers
node -e "
const { pipeline } = require('@xenova/transformers');
pipeline('text-generation', 'onnx-community/Qwen2.5-0.5B-Instruct', { quantized: true })
  .then(() => console.log('done'))
"
# 模型会缓存到 ~/.cache/huggingface/ 或 models/

# 方法二：HuggingFace Hub
pip install huggingface_hub
huggingface-cli download onnx-community/Qwen2.5-0.5B-Instruct \
  --include "*.onnx" "tokenizer.json" "config.json" \
  --local-dir models/onnx-community/Qwen2.5-0.5B-Instruct
```

## 部署

将整个 `models/` 目录复制到服务器 `/opt/qitu/models/` 后，Docker 构建时会自动包含。

如果 models 目录为空，网站仍可运行，但本地 AI 功能会尝试从境外 CDN 下载模型，可能失败或违反合规要求。
