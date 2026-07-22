(() => {
  "use strict";

  const STORAGE_KEY = "qitu-career-assessment-ai-v2";
  const AI_SETTING_KEY = "qitu-local-ai-enabled";
  const COLLECTION_CHOICE_KEY = "qitu-data-collection-choice-v1";
  const SUBMISSION_RECEIPTS_KEY = "qitu-submission-receipts-v1";
  const PENDING_SUBMISSIONS_KEY = "qitu-pending-submissions-v1";
  const CONSENT_VERSION = "2026-07-23-v1";

  const dimensions = {
    creative: {
      name: "创造力", code: "C", color: "#7454d6", pale: "#eee9ff", symbol: "✦",
      short: "用新视角连接想法",
      strength: { title: "重新定义问题", text: "你常能跳出既有框架，把看似无关的信息连成一个更有启发性的方向。", icon: "✦" },
      careers: [
        ["产品设计", "把用户问题转化为兼具体验与可行性的方案", "创意 × 用户"],
        ["品牌与内容策略", "建立独特表达，并持续让内容产生影响", "表达 × 策略"],
        ["创意技术", "在设计、内容与技术交叉处创造新体验", "想象 × 实现"]
      ],
      good: ["允许试验、迭代和提出不同做法", "工作成果包含表达、设计或方案创造"],
      watch: ["长期只能照章执行，缺少自主空间", "用唯一标准答案限制探索过程"],
      low: "刻意练习在没有标准答案时，先提出三个不同方案"
    },
    analytical: {
      name: "分析力", code: "A", color: "#4776c8", pale: "#e8f0ff", symbol: "⌁",
      short: "从复杂信息中找到规律",
      strength: { title: "看见隐藏规律", text: "面对复杂信息，你倾向于拆分、验证，再找到真正影响结果的关键变量。", icon: "⌁" },
      careers: [
        ["商业与数据分析", "从数据中识别机会，为重要决策提供依据", "逻辑 × 洞察"],
        ["策略研究", "理解行业与竞争格局，形成有证据的判断", "研究 × 决策"],
        ["用户研究", "把行为与反馈整理为可行动的产品洞察", "观察 × 归纳"]
      ],
      good: ["重视事实、逻辑与高质量的深度思考", "有机会处理复杂问题并建立清晰模型"],
      watch: ["不断要求即时结论，却不给思考与验证时间", "关键决策只依赖直觉或层级"],
      low: "遇到重要判断时，用“假设—证据—结论”写下思考过程"
    },
    influence: {
      name: "影响力", code: "I", color: "#df9452", pale: "#fff0df", symbol: "↗",
      short: "让想法被理解并发生",
      strength: { title: "让共识发生", text: "你愿意清楚表达立场，也能捕捉听众关心的重点，推动大家从讨论走向行动。", icon: "↗" },
      careers: [
        ["市场与增长", "理解受众、验证信息并推动业务增长", "洞察 × 影响"],
        ["商务拓展", "连接资源与需求，把共识转化为合作", "沟通 × 机会"],
        ["管理咨询", "在复杂利益相关方之间推动问题解决", "分析 × 说服"]
      ],
      good: ["目标清晰，并允许你主动影响决策", "需要沟通、展示、谈判或整合资源"],
      watch: ["工作价值长期不可见，也缺少反馈", "只有执行责任，却没有表达空间"],
      low: "在下一次讨论中，提前准备一个观点和一条支持证据"
    },
    collaborative: {
      name: "协作力", code: "H", color: "#35a493", pale: "#e3f5f1", symbol: "◎",
      short: "理解他人并促成共建",
      strength: { title: "读懂关系现场", text: "你会自然关注他人的感受与需要，让不同角色更容易建立信任并一起完成事情。", icon: "◎" },
      careers: [
        ["人才与组织发展", "帮助个体成长，并改善团队协作方式", "成长 × 关系"],
        ["客户成功", "理解客户目标，连接资源实现长期价值", "服务 × 协同"],
        ["社区与项目运营", "维护共同目标，激发成员持续参与", "连接 × 运营"]
      ],
      good: ["成员彼此尊重，信息透明且愿意共同解决问题", "工作能真实改善某类人的体验或成长"],
      watch: ["持续内耗、零和竞争或人际边界模糊", "只看短期数字，忽略合作过程"],
      low: "在协作前主动确认彼此的目标、期待和责任边界"
    },
    execution: {
      name: "执行力", code: "D", color: "#567387", pale: "#e9f0f3", symbol: "✓",
      short: "把目标稳定变成结果",
      strength: { title: "让计划落到地面", text: "你擅长把目标拆成节奏清晰的步骤，持续跟进细节，让承诺可靠地兑现。", icon: "✓" },
      careers: [
        ["项目管理", "协调范围、资源和进度，确保目标落地", "统筹 × 交付"],
        ["业务运营", "建立稳定机制，持续提升效率与质量", "流程 × 优化"],
        ["供应链与质量管理", "在多重约束中保证可靠交付", "秩序 × 结果"]
      ],
      good: ["目标、角色与衡量标准相对明确", "可以拥有一段完整工作并看到落地结果"],
      watch: ["优先级频繁变化，却没有明确决策", "长期停留在讨论，缺少行动与复盘"],
      low: "把本周最重要的目标拆成三个可检查的里程碑"
    },
    exploratory: {
      name: "探索力", code: "X", color: "#b18535", pale: "#fff3d6", symbol: "△",
      short: "在变化中快速学习",
      strength: { title: "走进未知地带", text: "新的领域和不确定性常会激发你的好奇心，你能边行动边学习并快速调整路径。", icon: "△" },
      careers: [
        ["创新业务孵化", "在高不确定环境中验证需求与商业模式", "试验 × 学习"],
        ["新兴行业研究", "持续进入陌生领域，识别趋势与机会", "前沿 × 判断"],
        ["创业与早期团队", "承担多重角色，在变化中建立新事物", "自主 × 适应"]
      ],
      good: ["变化带来学习机会，允许快速试错", "可以接触新领域、新角色或不同类型问题"],
      watch: ["内容高度重复，成长曲线过早变平", "对过程控制过细，不允许灵活调整"],
      low: "每月选择一个陌生主题，完成一次小型输入与输出"
    }
  };

  const profiles = {
    creative: {
      title: "灵感塑造者",
      tagline: "你擅长看见别人尚未注意的可能，并赋予它清晰、动人的形状。",
      keywords: ["重构问题", "审美表达", "可能性思维"],
      icon: '<path d="M33 76c16-3 16-34 30-40 12 8 10 34 25 42"/><path d="M42 83h42M49 91h28"/><circle cx="63" cy="35" r="5"/>'
    },
    analytical: {
      title: "洞察建构者",
      tagline: "你擅长从复杂中找到规律，再把洞见变成清晰、可信的系统。",
      keywords: ["深度思考", "结构化", "证据意识"],
      icon: '<circle cx="55" cy="53" r="25"/><path d="m73 72 18 18M42 54l9 9 18-22M35 91h25"/>'
    },
    influence: {
      title: "共识推动者",
      tagline: "你能让重要的想法被看见、被理解，并推动人们一起向前。",
      keywords: ["清晰表达", "调动资源", "目标感"],
      icon: '<path d="M31 72c13 0 14-24 28-24s15 24 29 24"/><path d="m72 35 17 12-17 12M31 84h58"/><circle cx="31" cy="72" r="4"/>'
    },
    collaborative: {
      title: "共创连接者",
      tagline: "你让人们感到被理解，也让不同的力量有机会汇成共同成果。",
      keywords: ["同理理解", "建立信任", "促成协作"],
      icon: '<circle cx="43" cy="50" r="12"/><circle cx="77" cy="50" r="12"/><path d="M25 87c3-15 10-22 18-22s15 7 18 22M59 87c3-15 10-22 18-22 8 0 15 7 18 22"/>'
    },
    execution: {
      title: "稳健交付者",
      tagline: "你能把模糊目标变成可靠节奏，让重要的事真正抵达终点。",
      keywords: ["目标拆解", "可靠推进", "秩序感"],
      icon: '<rect x="34" y="28" width="53" height="67" rx="8"/><path d="M47 28v-7h27v7M47 48l7 7 15-16M47 70h27M47 81h19"/>'
    },
    exploratory: {
      title: "前沿探索者",
      tagline: "未知会唤醒你的能量，你喜欢边行动边学习，把变化变成机会。",
      keywords: ["快速学习", "适应变化", "好奇驱动"],
      icon: '<path d="m60 23 29 72-29-15-29 15 29-72Z"/><path d="M60 23v57M44 88l16-28 16 28"/>'
    }
  };

  const baseQuestions = [
    { d: "creative", category: "想法与表达", text: "面对一个开放任务时，我脑中常会很快出现多个可能的方向。" },
    { d: "analytical", category: "判断与思考", text: "做重要判断前，我希望先弄清事实、假设与因果关系。" },
    { d: "influence", category: "沟通与推动", text: "当我相信一个想法时，我愿意主动说服他人支持它。" },
    { d: "collaborative", category: "关系与协作", text: "在团队里，我通常能很快察觉谁没有被听见。" },
    { d: "execution", category: "计划与落地", text: "收到一个大目标后，我会自然地把它拆成可执行的步骤。" },
    { d: "exploratory", category: "变化与成长", text: "接触陌生领域会让我兴奋，而不只是感到压力。" },
    { d: "creative", category: "想法与表达", text: "相比设计新方法，我更喜欢直接沿用已经验证的模板。", reverse: true },
    { d: "analytical", category: "判断与思考", text: "即使证据还不充分，我也很少追问一个结论是怎么得出的。", reverse: true },
    { d: "influence", category: "沟通与推动", text: "在意见不一致时，我通常会把自己的立场留在心里。", reverse: true },
    { d: "collaborative", category: "关系与协作", text: "只要结果达成，合作过程中他人的感受并不太重要。", reverse: true },
    { d: "execution", category: "计划与落地", text: "我经常同时开始很多事，却很难稳定地收尾。", reverse: true },
    { d: "exploratory", category: "变化与成长", text: "即使新机会很有潜力，我仍更愿意长期做熟悉的事情。", reverse: true },
    { d: "creative", category: "想法与表达", text: "我喜欢把不同领域的元素组合成一个新的表达或方案。" },
    { d: "analytical", category: "判断与思考", text: "遇到复杂问题时，梳理信息本身会让我逐渐进入状态。" },
    { d: "influence", category: "沟通与推动", text: "我会根据听众关心的重点，调整自己呈现想法的方式。" },
    { d: "collaborative", category: "关系与协作", text: "帮助团队成员发挥优势，会让我感到很有成就感。" },
    { d: "execution", category: "计划与落地", text: "我倾向于为承诺设置时间点，并主动跟进完成情况。" },
    { d: "exploratory", category: "变化与成长", text: "计划被打乱时，我通常能较快接受并寻找新的路径。" },
    { d: "creative", category: "想法与表达", text: "当现有方案不够好时，我愿意推翻重来，寻找更独特的解法。" },
    { d: "analytical", category: "判断与思考", text: "我很容易注意到论证中的矛盾、漏洞或缺失条件。" },
    { d: "influence", category: "沟通与推动", text: "多人讨论陷入停滞时，我愿意站出来促成一个决定。" },
    { d: "collaborative", category: "关系与协作", text: "发生分歧时，我会先理解各方真正担心的是什么。" },
    { d: "execution", category: "计划与落地", text: "即使任务并不新鲜，我也能保持节奏，把细节做到位。" },
    { d: "exploratory", category: "变化与成长", text: "我愿意为了更陡的成长曲线，承担一部分可控的不确定性。" },
    { d: "creative", category: "想法与表达", text: "我会主动留意设计、文字或体验中那些让人眼前一亮的细节。" },
    { d: "analytical", category: "判断与思考", text: "相比一个热闹的观点，我更在意它是否经得起推敲。" },
    { d: "influence", category: "沟通与推动", text: "看到一件有价值的事，我会主动寻找资源让它获得更大影响。" },
    { d: "collaborative", category: "关系与协作", text: "我愿意投入时间建立信任，因为它会让长期合作更顺畅。" },
    { d: "execution", category: "计划与落地", text: "对我来说，一项工作有明确完成标准会明显提升效率。" },
    { d: "exploratory", category: "变化与成长", text: "我会主动尝试尚不熟练但可能打开新方向的任务。" }
  ];

  const advancedQuestions = [
    { d: "creative", category: "创意与重构", text: "我会自然思考：这件事有没有一种更有趣、更有辨识度的做法？" },
    { d: "analytical", category: "证据与系统", text: "看到两个指标同时变化时，我会提醒自己不要轻易把相关当成因果。" },
    { d: "influence", category: "表达与带动", text: "在资源有限时，我仍愿意为优先级最高的主张积极争取。" },
    { d: "collaborative", category: "理解与共创", text: "合作开始前，我会主动了解对方真正想解决的问题。" },
    { d: "execution", category: "节奏与质量", text: "我习惯先确认交付标准，再决定时间和资源如何安排。" },
    { d: "exploratory", category: "学习与适应", text: "遇到不会的任务时，我通常能迅速找到资料、样例或求助对象。" },

    { d: "creative", category: "创意与重构", text: "只要按要求完成，我通常不太在意方案是否有新的表达。", reverse: true },
    { d: "analytical", category: "证据与系统", text: "只要多数人认同一个判断，我很少再检查它背后的证据。", reverse: true },
    { d: "influence", category: "表达与带动", text: "即使方向对我很重要，我也尽量避免成为公开主张它的人。", reverse: true },
    { d: "collaborative", category: "理解与共创", text: "我更愿意独自拿到好结果，而不是花时间帮助团队整体变好。", reverse: true },
    { d: "execution", category: "节奏与质量", text: "我常等到截止日期临近，才集中决定怎么完成任务。", reverse: true },
    { d: "exploratory", category: "学习与适应", text: "一条已经被很多人走过的职业路径，几乎总是更好的选择。", reverse: true },

    { d: "creative", category: "创意与重构", text: "我擅长用比喻、故事或视觉方式，让抽象观点更容易被理解。" },
    { d: "analytical", category: "证据与系统", text: "我喜欢把一个大问题画成结构图，寻找各部分之间的关系。" },
    { d: "influence", category: "表达与带动", text: "我能在较短时间内提炼出一个提案最值得被支持的理由。" },
    { d: "collaborative", category: "理解与共创", text: "当对方表达含糊时，我会耐心确认，而不是急着给建议。" },
    { d: "execution", category: "节奏与质量", text: "项目进行中，我会定期检查风险，而不是只在出问题后补救。" },
    { d: "exploratory", category: "学习与适应", text: "我能接受先做一个不完美的版本，再通过反馈快速修正。" },

    { d: "creative", category: "创意与重构", text: "看到一个平庸的页面、流程或文案，我会忍不住想如何改得更好。" },
    { d: "analytical", category: "证据与系统", text: "面对互相冲突的信息，我愿意花时间判断来源的可靠程度。" },
    { d: "influence", category: "表达与带动", text: "我能敏锐发现哪些利益相关者会影响一项计划的推进。" },
    { d: "collaborative", category: "理解与共创", text: "我会根据不同成员的优势，调整分工或沟通方式。" },
    { d: "execution", category: "节奏与质量", text: "重复但关键的检查，我也愿意稳定完成。" },
    { d: "exploratory", category: "学习与适应", text: "加入一个正在形成中的新领域，对我有很强吸引力。" },

    { d: "creative", category: "创意与重构", text: "我喜欢追问任务最初的定义，因为真正的问题可能并不是表面那个。" },
    { d: "analytical", category: "证据与系统", text: "在给出建议时，我希望能说明它成立的条件和可能失效的情况。" },
    { d: "influence", category: "表达与带动", text: "我愿意承担主持、汇报或对外沟通的角色。" },
    { d: "collaborative", category: "理解与共创", text: "团队气氛紧张时，我会尝试让对话重新回到共同目标。" },
    { d: "execution", category: "节奏与质量", text: "我会为重要任务预留缓冲，而不是按最乐观情况安排时间。" },
    { d: "exploratory", category: "学习与适应", text: "同一套工具已经足够完成工作时，我仍会关注新的替代方法。" },

    { d: "creative", category: "创意与重构", text: "对我来说，从一张白纸开始通常比填充固定模板更有吸引力。" },
    { d: "analytical", category: "证据与系统", text: "我会主动寻找反例，检查自己最初的判断是否站得住。" },
    { d: "influence", category: "表达与带动", text: "一项计划遇阻时，我会重新组织信息，寻找新的支持方式。" },
    { d: "collaborative", category: "理解与共创", text: "即使不是我的责任，我也愿意分享信息来减少他人的重复劳动。" },
    { d: "execution", category: "节奏与质量", text: "完成任务后，我会整理方法，让下一次交付更稳定。" },
    { d: "exploratory", category: "学习与适应", text: "我愿意通过短期项目或副业，低成本验证一个新方向。" },

    { d: "creative", category: "创意与重构", text: "有明确范例可以照着做时，我通常不愿再尝试其他表达。", reverse: true },
    { d: "analytical", category: "证据与系统", text: "追查细节和边界条件会让我不耐烦，我更愿意直接接受大致结论。", reverse: true },
    { d: "influence", category: "表达与带动", text: "当别人误解我的方案时，我很少尝试换一种方式再次说明。", reverse: true },
    { d: "collaborative", category: "理解与共创", text: "同事遇到困难时，只要不影响我的任务，我通常不会特别关注。", reverse: true },
    { d: "execution", category: "节奏与质量", text: "细致记录进展和后续事项，会让我觉得是不必要的负担。", reverse: true },
    { d: "exploratory", category: "学习与适应", text: "如果一种方法还能用，我几乎不会主动了解新的工具或趋势。", reverse: true },

    { d: "creative", category: "创意与重构", text: "我愿意先做草图、原型或片段，让尚不成熟的想法变得可讨论。" },
    { d: "analytical", category: "证据与系统", text: "我能长时间专注于一个需要推理和验证的问题。" },
    { d: "influence", category: "表达与带动", text: "我能在坚持目标的同时，为不同对象设计不同的沟通路径。" },
    { d: "collaborative", category: "理解与共创", text: "我会主动给予具体反馈，帮助合作伙伴知道哪里做得好、哪里可改进。" },
    { d: "execution", category: "节奏与质量", text: "面对多个并行任务时，我能清楚地判断先做什么、暂缓什么。" },
    { d: "exploratory", category: "学习与适应", text: "进入新环境后，我通常能通过观察和提问快速理解规则。" },

    { d: "creative", category: "创意与重构", text: "我乐于比较多种表达方案，并通过反馈继续打磨。" },
    { d: "analytical", category: "证据与系统", text: "当结果和预期不一致时，我会追查是哪一个假设出了问题。" },
    { d: "influence", category: "表达与带动", text: "我享受把分散的资源组织起来，推动一个重要目标实现。" },
    { d: "collaborative", category: "理解与共创", text: "我能区分真正的共识与表面上没有人反对。" },
    { d: "execution", category: "节奏与质量", text: "我不仅关注是否完成，也关注结果是否达到约定的质量。" },
    { d: "exploratory", category: "学习与适应", text: "经历一次失败后，我通常能提取经验并较快开始下一次尝试。" }
  ];

  const questions = [...baseQuestions, ...advancedQuestions];

  const careerLibrary = [
    { job: "AI 产品经理", field: "科技产品", weights: [82, 86, 72, 58, 76, 88], daily: "定义 AI 场景、拆解需求、协调算法与业务团队", experiment: "选一个日常问题，写一页 AI 产品需求说明并做低保真原型" },
    { job: "用户体验设计师", field: "设计体验", weights: [92, 66, 48, 78, 58, 72], daily: "研究用户、设计交互、制作原型并验证体验", experiment: "重新设计一个常用 App 的关键流程，并找 3 人做可用性测试" },
    { job: "服务设计师", field: "设计咨询", weights: [88, 72, 60, 88, 60, 76], daily: "梳理跨触点体验，组织共创并设计服务流程", experiment: "画出一次就医或办事体验旅程，提出 3 个改进点" },
    { job: "品牌策略师", field: "品牌传播", weights: [90, 70, 84, 58, 52, 70], daily: "研究市场与受众，定义定位、叙事和内容方向", experiment: "为一个熟悉品牌写一页定位重构与传播主题" },
    { job: "内容策划 / 创意编导", field: "内容媒体", weights: [94, 54, 82, 48, 58, 80], daily: "寻找选题、设计叙事、制作内容并分析反馈", experiment: "围绕一个主题完成 60 秒脚本或 800 字内容样稿" },
    { job: "游戏系统策划", field: "游戏文娱", weights: [90, 82, 50, 52, 70, 86], daily: "设计玩法与数值系统，制作原型并持续平衡体验", experiment: "拆解一款游戏的核心循环并设计一个新机制" },
    { job: "数据分析师", field: "数据商业", weights: [48, 94, 38, 48, 82, 62], daily: "清洗数据、建立指标、分析变化并形成业务建议", experiment: "用公开数据完成一个问题定义、图表与结论页面" },
    { job: "商业分析师", field: "企业战略", weights: [58, 92, 72, 56, 80, 68], daily: "拆解经营问题，搭建模型并支持管理决策", experiment: "选择一家企业，完成收入驱动因素和竞争对手分析" },
    { job: "用户研究员", field: "产品研究", weights: [68, 90, 48, 90, 62, 70], daily: "设计研究、访谈用户、综合证据并输出洞察", experiment: "围绕一个消费决策访谈 3 人并整理主题与机会点" },
    { job: "行业研究员", field: "研究投资", weights: [54, 96, 46, 42, 74, 82], daily: "跟踪产业、分析公司与政策，形成趋势判断", experiment: "为一个新兴赛道制作两页产业链与趋势简报" },
    { job: "管理咨询顾问", field: "专业服务", weights: [68, 94, 88, 72, 84, 82], daily: "定义问题、访谈分析、设计方案并推动客户共识", experiment: "用咨询结构拆解一个真实企业问题，做 5 页建议稿" },
    { job: "解决方案顾问", field: "企业科技", weights: [62, 84, 92, 80, 72, 72], daily: "理解客户业务、设计方案、演示价值并支持成交", experiment: "选择一款 B2B 产品，制作面向特定客户的方案演示" },
    { job: "增长产品经理", field: "互联网业务", weights: [72, 90, 88, 58, 84, 86], daily: "分析漏斗、设计实验、联动产品市场提升增长", experiment: "拆解一个产品的转化漏斗并提出 3 个可验证实验" },
    { job: "市场增长经理", field: "市场商业", weights: [78, 78, 94, 66, 76, 82], daily: "洞察受众、策划活动、管理渠道并优化转化", experiment: "为一个产品设计一轮小预算获客实验及指标" },
    { job: "商务拓展经理", field: "合作商业", weights: [58, 62, 96, 82, 74, 84], daily: "寻找合作机会、谈判方案、连接资源并经营伙伴关系", experiment: "为一个熟悉产品列出 10 个潜在合作方及合作价值" },
    { job: "公共事务 / 政策沟通", field: "公共治理", weights: [54, 82, 94, 84, 72, 70], daily: "研究政策、沟通多方诉求、形成共识并管理风险", experiment: "选一个公共议题，绘制利益相关方地图和沟通方案" },
    { job: "客户成功经理", field: "企业服务", weights: [48, 62, 86, 94, 84, 62], daily: "理解客户目标、推动采用、协调资源并实现续约", experiment: "为一款软件设计客户入门旅程和成功衡量指标" },
    { job: "人才发展顾问", field: "组织人力", weights: [72, 72, 76, 96, 70, 68], daily: "诊断能力需求、设计学习项目、辅导团队成长", experiment: "访谈 3 位同事，设计一个 60 分钟微型学习工作坊" },
    { job: "组织发展顾问", field: "组织咨询", weights: [66, 86, 80, 96, 72, 72], daily: "诊断组织问题、设计机制、促进共识和变革", experiment: "分析一个团队协作难题，画出原因系统图和干预方案" },
    { job: "社区运营经理", field: "社区内容", weights: [74, 58, 86, 94, 78, 76], daily: "设计社区机制、连接成员、策划活动并维护文化", experiment: "为一个兴趣主题设计 7 天社区启动计划" },
    { job: "项目经理", field: "项目交付", weights: [48, 72, 80, 82, 98, 54], daily: "管理范围、进度、资源、风险和跨团队沟通", experiment: "把一个真实目标拆成里程碑、风险表和责任矩阵" },
    { job: "业务运营经理", field: "企业运营", weights: [54, 82, 72, 70, 96, 62], daily: "搭建流程与指标，协调资源并持续提升效率", experiment: "选择一个低效流程，画出现状并提出可量化的优化方案" },
    { job: "供应链计划师", field: "供应链", weights: [36, 92, 50, 62, 98, 48], daily: "预测需求、平衡库存产能、管理异常与交付", experiment: "用表格模拟一个小型商品的需求、库存和补货计划" },
    { job: "质量与流程改进经理", field: "质量运营", weights: [44, 92, 56, 64, 98, 52], daily: "分析缺陷、建立标准、推动改进并验证效果", experiment: "记录一个重复问题，用 5 Why 找根因并设计防错步骤" },
    { job: "财务规划与分析（FP&A）", field: "企业财务", weights: [38, 96, 56, 50, 94, 50], daily: "预算预测、经营分析、情景模拟并支持业务决策", experiment: "为一个小业务搭建收入成本预测和三种情景模型" },
    { job: "创新孵化经理", field: "创新业务", weights: [90, 74, 86, 72, 66, 98], daily: "发现机会、验证需求、组织试验并推动新业务", experiment: "围绕一个痛点完成 5 次访谈和一张商业模式画布" },
    { job: "创业团队早期成员", field: "创业公司", weights: [84, 72, 88, 72, 86, 98], daily: "承担多角色工作，在不确定中快速试错并交付", experiment: "参加一次周末黑客松，或用 48 小时做出可展示成果" },
    { job: "新兴技术研究员", field: "前沿科技", weights: [66, 96, 40, 44, 64, 96], daily: "跟踪论文与产品，验证技术并判断应用机会", experiment: "选一项新技术，完成原理、玩家、场景和限制四格简报" },
    { job: "可持续发展顾问", field: "ESG 咨询", weights: [62, 88, 76, 82, 78, 80], daily: "分析环境社会议题，设计路径并协调多方落地", experiment: "选择一家企业，识别 3 个重要 ESG 议题和改进行动" },
    { job: "产品运营经理", field: "产品业务", weights: [66, 78, 84, 82, 92, 72], daily: "连接用户与产品，设计机制、活动和运营节奏", experiment: "拆解一个产品的新用户激活路径并提出优化方案" }
  ];

  let state = loadState();
  let activeAiPayload = null;
  let aiRunning = false;
  let transitionTimer = null;
  let pendingStartFresh = false;

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  function makeUuid() {
    if (crypto?.randomUUID) return crypto.randomUUID();
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (character) => (Number(character) ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> Number(character) / 4).toString(16));
  }

  function freshState() {
    return { current: 0, answers: Array(questions.length).fill(null), sessionId: makeUuid(), deletionToken: makeUuid(), startedAt: Date.now() };
  }

  function loadState() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (saved && Array.isArray(saved.answers) && saved.answers.length === questions.length) {
        return {
          current: Math.min(Number(saved.current) || 0, questions.length - 1),
          answers: saved.answers,
          sessionId: saved.sessionId || makeUuid(),
          deletionToken: saved.deletionToken || makeUuid(),
          startedAt: Number(saved.startedAt) || Date.now()
        };
      }
    } catch (_) { /* localStorage may be unavailable */ }
    return freshState();
  }

  function saveState() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (_) { /* non-blocking */ }
  }

  function showView(name) {
    $$(".view").forEach((view) => view.classList.toggle("is-active", view.dataset.view === name));
    $("#site-header").style.display = name === "home" ? "flex" : "none";
    window.scrollTo({ top: 0, behavior: "instant" });
    document.body.dataset.view = name;
  }

  function getCollectionChoice() {
    try { return localStorage.getItem(COLLECTION_CHOICE_KEY); } catch (_) { return null; }
  }

  function setCollectionChoice(choice) {
    try { localStorage.setItem(COLLECTION_CHOICE_KEY, choice); } catch (_) { /* non-blocking */ }
  }

  function openConsentModal(forceFresh) {
    pendingStartFresh = forceFresh;
    $("#consent-confirm").checked = false;
    $("[data-action='consent-submit']").disabled = true;
    $("#data-consent-modal").hidden = false;
    document.body.style.overflow = "hidden";
    setTimeout(() => $("#consent-confirm").focus(), 50);
  }

  function finishConsentChoice(choice) {
    setCollectionChoice(choice);
    $("#data-consent-modal").hidden = true;
    document.body.style.overflow = "";
    const forceFresh = pendingStartFresh;
    pendingStartFresh = false;
    startQuiz(forceFresh);
  }

  function startQuiz(forceFresh = false) {
    if (!getCollectionChoice()) {
      openConsentModal(forceFresh);
      return;
    }
    if (forceFresh || state.answers.every((answer) => answer !== null)) state = freshState();
    const firstOpen = state.answers.findIndex((answer) => answer === null);
    if (firstOpen >= 0 && state.current > firstOpen) state.current = firstOpen;
    showView("quiz");
    renderQuestion();
  }

  function renderQuestion() {
    const question = questions[state.current];
    const selected = state.answers[state.current];
    $("#question-kicker").textContent = `${question.category} · ${String(state.current + 1).padStart(2, "0")}`;
    $("#question-text").textContent = question.text;
    $("#progress-label").textContent = `${state.current + 1} / ${questions.length}`;
    $("#progress-fill").style.width = `${((state.current + 1) / questions.length) * 100}%`;
    $("#prev-question").disabled = state.current === 0;
    $("#next-question").disabled = selected === null;
    $("#next-question").firstChild.textContent = state.current === questions.length - 1 ? "查看结果" : "下一题";

    const labels = ["非常不符合", "不符合", "比较不符合", "不确定", "比较符合", "符合", "非常符合"];
    $(".scale-options").innerHTML = labels.map((label, index) => {
      const value = index + 1;
      const active = selected === value;
      return `<button type="button" class="scale-option${active ? " is-selected" : ""}" role="radio" aria-checked="${active}" aria-label="${label}" title="${label}" data-value="${value}"></button>`;
    }).join("");
  }

  function selectAnswer(value, autoAdvance = true) {
    if (document.body.dataset.view !== "quiz") return;
    state.answers[state.current] = value;
    saveState();
    renderQuestion();
    clearTimeout(transitionTimer);
    if (autoAdvance) {
      transitionTimer = setTimeout(() => {
        if (state.current < questions.length - 1) {
          state.current += 1;
          saveState();
          renderQuestion();
        } else {
          finishQuiz();
        }
      }, 330);
    }
  }

  function nextQuestion() {
    if (state.answers[state.current] === null) return;
    clearTimeout(transitionTimer);
    if (state.current < questions.length - 1) {
      state.current += 1;
      saveState();
      renderQuestion();
    } else {
      finishQuiz();
    }
  }

  function previousQuestion() {
    clearTimeout(transitionTimer);
    if (state.current > 0) {
      state.current -= 1;
      saveState();
      renderQuestion();
    }
  }

  function finishQuiz() {
    if (state.answers.some((answer) => answer === null)) {
      state.current = state.answers.findIndex((answer) => answer === null);
      renderQuestion();
      showToast("还有题目没有回答");
      return;
    }
    showView("loading");
    const steps = [
      ["连接你的选择...", "正在识别你自然投入的工作方式"],
      ["组合六种驱动力...", "正在寻找反复出现的优势模式"],
      ["生成行动建议...", "正在把洞察转化为下一步"]
    ];
    steps.forEach((step, index) => {
      setTimeout(() => {
        $("#loading-title").textContent = step[0];
        $("#loading-copy").textContent = step[1];
      }, index * 650);
    });
    setTimeout(() => {
      renderResults();
      showView("result");
    }, 2100);
  }

  function calculateScores() {
    const buckets = {};
    Object.keys(dimensions).forEach((key) => { buckets[key] = []; });
    questions.forEach((question, index) => {
      const answer = state.answers[index] || 4;
      buckets[question.d].push(question.reverse ? 8 - answer : answer);
    });
    return Object.fromEntries(Object.entries(buckets).map(([key, values]) => {
      const average = values.reduce((sum, value) => sum + value, 0) / values.length;
      return [key, Math.round(((average - 1) / 6) * 100)];
    }));
  }

  function readStoredArray(key) {
    try {
      const value = JSON.parse(localStorage.getItem(key));
      return Array.isArray(value) ? value : [];
    } catch (_) { return []; }
  }

  function writeStoredArray(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (_) { /* non-blocking */ }
  }

  function setSubmissionStatus(kind, title, copy) {
    const box = $("#submission-status");
    box.classList.remove("is-success", "is-local", "is-error");
    if (kind) box.classList.add(`is-${kind}`);
    $("#submission-title").textContent = title;
    $("#submission-copy").textContent = copy;
  }

  function endpointUrl(path) {
    return new URL(path.replace(/^\//, ""), new URL("./", location.href));
  }

  function queueSubmission(payload) {
    const pending = readStoredArray(PENDING_SUBMISSIONS_KEY).filter((item) => item.sessionId !== payload.sessionId);
    pending.push(payload);
    writeStoredArray(PENDING_SUBMISSIONS_KEY, pending.slice(-10));
  }

  function removePendingSubmission(sessionId) {
    writeStoredArray(PENDING_SUBMISSIONS_KEY, readStoredArray(PENDING_SUBMISSIONS_KEY).filter((item) => item.sessionId !== sessionId));
  }

  function saveSubmissionReceipt(payload) {
    const receipts = readStoredArray(SUBMISSION_RECEIPTS_KEY).filter((item) => item.sessionId !== payload.sessionId);
    receipts.push({ sessionId: payload.sessionId, deletionToken: payload.deletionToken, submittedAt: new Date().toISOString() });
    writeStoredArray(SUBMISSION_RECEIPTS_KEY, receipts.slice(-30));
  }

  async function sendSubmission(payload, updateUi = true) {
    const alreadySubmitted = readStoredArray(SUBMISSION_RECEIPTS_KEY).some((item) => item.sessionId === payload.sessionId);
    if (alreadySubmitted) {
      removePendingSubmission(payload.sessionId);
      if (updateUi) setSubmissionStatus("success", "匿名答题数据已提交", "本机保留了删除凭证，可在隐私说明页撤回并删除这条记录。");
      return true;
    }
    queueSubmission(payload);
    if (updateUi) setSubmissionStatus("", "正在匿名提交答题数据", "数据通过同域服务端写入受 RLS 保护的数据库，请稍候。");
    try {
      const response = await fetch(endpointUrl("api/submit"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
        credentials: "same-origin",
        body: JSON.stringify(payload)
      });
      const detail = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(detail.error || `提交失败（${response.status}）`);
      saveSubmissionReceipt(payload);
      removePendingSubmission(payload.sessionId);
      if (updateUi) setSubmissionStatus("success", "匿名答题数据已提交", "不包含姓名、手机号、邮箱或位置；本机已保存撤回与删除凭证。");
      return true;
    } catch (error) {
      if (updateUi) setSubmissionStatus("error", "匿名提交暂未完成", `${error.message || "网络暂时不可用"}。记录已在本机排队，下次打开网站会自动重试。`);
      return false;
    }
  }

  function handleAssessmentSubmission(scores, ranked, profile, resultCode) {
    if (getCollectionChoice() !== "submit") {
      setSubmissionStatus("local", "本次选择了仅本地作答", "答案和结果只保存在当前浏览器，不会写入网站数据库。可在隐私说明页修改选择。");
      return;
    }
    const referralSource = new URL(location.href).searchParams.get("ref") || "direct";
    const payload = {
      sessionId: state.sessionId,
      deletionToken: state.deletionToken,
      answers: state.answers.slice(),
      scores,
      resultCode,
      resultTitle: profile.title,
      topDimensions: ranked.slice(0, 3).map((key) => dimensions[key].name),
      aiEnabled: getAiOptIn(),
      durationSeconds: Math.round((Date.now() - state.startedAt) / 1000),
      consentVersion: CONSENT_VERSION,
      referralSource
    };
    sendSubmission(payload, true);
  }

  async function flushPendingSubmissions() {
    if (getCollectionChoice() !== "submit") return;
    for (const payload of readStoredArray(PENDING_SUBMISSIONS_KEY)) await sendSubmission(payload, false);
  }

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>'"]/g, (character) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
    })[character]);
  }

  function rankSpecificCareers(scores) {
    const keys = Object.keys(dimensions);
    return careerLibrary.map((career) => {
      const distance = keys.reduce((sum, key, index) => sum + Math.abs(scores[key] - career.weights[index]), 0) / keys.length;
      const fitScore = Math.max(55, Math.min(96, Math.round(100 - distance * 0.62)));
      const evidence = keys
        .map((key, index) => ({ key, strength: (scores[key] + career.weights[index]) / 2 }))
        .sort((a, b) => b.strength - a.strength)
        .slice(0, 2)
        .map((item) => dimensions[item.key].name);
      const gap = keys
        .map((key, index) => ({ key, gap: career.weights[index] - scores[key] }))
        .sort((a, b) => b.gap - a.gap)[0];
      return {
        ...career,
        fitScore,
        why: `这项工作会反复调用你的${evidence.join("与")}，与当前作答中的高能量模式较一致。`,
        watch: gap.gap > 18
          ? `岗位对${dimensions[gap.key].name}要求较高，建议先用小项目确认这部分是否可通过经验补足。`
          : "整体驱动力没有明显短板，但仍需通过真实任务验证行业与团队环境。"
      };
    }).sort((a, b) => b.fitScore - a.fitScore);
  }

  function getAiOptIn() {
    const input = $("#ai-opt-in");
    return input ? input.checked : true;
  }

  function buildAiPayload(scores, ranked, shortlist) {
    const strongSignals = questions.map((question, index) => {
      const raw = state.answers[index] || 4;
      const adjusted = question.reverse ? 8 - raw : raw;
      return { statement: question.text, dimension: dimensions[question.d].name, strength: adjusted };
    }).filter((item) => item.strength >= 6).slice(0, 14);
    return {
      scores,
      scoreLabels: Object.fromEntries(Object.keys(dimensions).map((key) => [dimensions[key].name, scores[key]])),
      topDimensions: ranked.slice(0, 3).map((key) => dimensions[key].name),
      lowerDimensions: ranked.slice(-2).map((key) => dimensions[key].name),
      strongSignals,
      candidates: shortlist.slice(0, 10).map((career) => ({
        job: career.job,
        field: career.field,
        fitScore: career.fitScore,
        daily: career.daily,
        experiment: career.experiment
      }))
    };
  }

  function renderAiCards(recommendations, sourceLabel = "算法预选") {
    $("#ai-career-grid").innerHTML = recommendations.map((item, index) => {
      const fit = typeof item.fit === "string" ? item.fit : `${item.fitScore || "—"} 分匹配`;
      return `<article class="ai-career-card">
        <span class="ai-rank">${String(index + 1).padStart(2, "0")}</span>
        <span class="ai-fit">${escapeHtml(sourceLabel)} · ${escapeHtml(fit)}</span>
        <h3>${escapeHtml(item.job)}</h3>
        <p>${escapeHtml(item.why)}</p>
        <ul class="ai-evidence">
          <li><strong>典型工作：</strong>${escapeHtml(item.daily)}</li>
          <li><strong>留意：</strong>${escapeHtml(item.watch)}</li>
        </ul>
        <div class="ai-experiment">${escapeHtml(item.experiment)}</div>
      </article>`;
    }).join("");
  }

  function setAiStatus({ kicker, title, copy, progress = null, indeterminate = false, buttonText, disabled = false, stateClass = "" }) {
    const shell = $(".ai-advisor-shell");
    shell.classList.remove("is-error", "is-done");
    if (stateClass) shell.classList.add(stateClass);
    $("#ai-status-kicker").textContent = kicker;
    $("#ai-status-title").textContent = title;
    $("#ai-status-copy").textContent = copy;
    const progressBar = $("#ai-progress");
    progressBar.classList.toggle("is-active", progress !== null || indeterminate);
    progressBar.classList.toggle("is-indeterminate", indeterminate);
    if (progress !== null) $("#ai-progress i").style.width = `${Math.max(0, Math.min(100, progress))}%`;
    const button = $(".ai-run-button");
    button.disabled = disabled;
    if (buttonText) button.textContent = buttonText;
  }

  function prepareAiAdvisor(scores, ranked) {
    const fingerprint = JSON.stringify(scores);
    if (activeAiPayload?.fingerprint === fingerprint) return;
    const shortlist = rankSpecificCareers(scores).slice(0, 8);
    activeAiPayload = { ...buildAiPayload(scores, ranked, shortlist), shortlist, fingerprint };
    aiRunning = false;
    $("#ai-summary").hidden = true;
    $("#ai-progress-label").textContent = "规则引擎已从 30 个具体职业中完成初筛";
    renderAiCards(shortlist.slice(0, 4), "算法预选");

    if (!("gpu" in navigator)) {
      setAiStatus({
        kicker: "已启用兼容模式", title: "当前浏览器无法运行本地生成模型",
        copy: "下方仍展示基于 84 道作答生成的职业预选。若要获得 AI 深度解释，请使用支持 WebGPU 的新版 Chrome 或 Edge。",
        buttonText: "浏览器不支持 WebGPU", disabled: true, stateClass: "is-error"
      });
      return;
    }

    setAiStatus({
      kicker: "算法预选已完成", title: getAiOptIn() ? "本地 AI 将自动开始分析" : "本地 AI 深度分析已关闭",
      copy: "模型只会读取当前页面中的作答摘要，推理过程在本机完成。首次需下载并缓存约 800MB 模型文件。",
      buttonText: "开始本地 AI 分析"
    });
    if (getAiOptIn()) setTimeout(startLocalAi, 800);
  }

  async function startLocalAi() {
    if (aiRunning || !activeAiPayload) return;
    if (!("gpu" in navigator)) {
      setAiStatus({ kicker: "无法启动", title: "此浏览器不支持 WebGPU", copy: "请升级到新版 Chrome 或 Edge；算法预选仍然可用。", buttonText: "浏览器不支持 WebGPU", disabled: true, stateClass: "is-error" });
      return;
    }
    aiRunning = true;
    setAiStatus({ kicker: "LOCAL AI · 初始化", title: "正在加载开源模型", copy: "首次运行会下载模型，下载完成后将在浏览器缓存中复用。请保持此页面打开。", indeterminate: true, buttonText: "本地 AI 运行中", disabled: true });
    $("#ai-progress-label").textContent = "连接模型文件...";
    try {
      const { generateLocalCareerAdvice } = await import("./local-ai.js");
      const response = await generateLocalCareerAdvice(activeAiPayload, (event) => {
        if (event.phase === "download") {
          const progress = Number.isFinite(event.progress) ? event.progress : null;
          setAiStatus({ kicker: "LOCAL AI · 模型下载", title: "正在把模型载入你的设备", copy: "只下载公开模型文件，不会上传作答内容。下载完成后会自动开始生成。", progress, indeterminate: progress === null, buttonText: "本地 AI 运行中", disabled: true });
          $("#ai-progress-label").textContent = `${event.file || "模型文件"}${progress === null ? "" : ` · ${Math.round(progress)}%`}`;
        } else if (event.phase === "generate") {
          setAiStatus({ kicker: "LOCAL AI · 本地推理", title: "正在生成具体职业建议", copy: "模型正在比较你的驱动力、强信号和候选职业日常。", indeterminate: true, buttonText: "正在生成", disabled: true });
          $("#ai-progress-label").textContent = event.message || "逐项组织匹配理由...";
        }
      });

      if (response.data?.recommendations?.length) {
        const allowed = new Map(activeAiPayload.shortlist.map((career) => [career.job, career]));
        const usedJobs = new Set();
        const normalized = [];
        response.data.recommendations.slice(0, 5).forEach((item, index) => {
          const base = allowed.get(item.job) || activeAiPayload.shortlist[index] || activeAiPayload.shortlist[0];
          const job = allowed.has(item.job) ? item.job : base.job;
          if (usedJobs.has(job)) return;
          usedJobs.add(job);
          normalized.push({
            job,
            fit: item.fit || `${base.fitScore} 分匹配`,
            why: item.why || base.why,
            daily: item.daily || base.daily,
            watch: item.watch || base.watch,
            experiment: item.experiment || base.experiment
          });
        });
        activeAiPayload.shortlist.forEach((base) => {
          if (normalized.length >= 5 || usedJobs.has(base.job)) return;
          usedJobs.add(base.job);
          normalized.push({ ...base, fit: `${base.fitScore} 分匹配` });
        });
        renderAiCards(normalized, "本地 AI 推荐");
        $("#ai-summary").innerHTML = `<strong>AI 综合判断：</strong>${escapeHtml(response.data.summary || "你的高分驱动力能够形成多条可迁移的职业路径，建议优先验证工作内容，而不是只看职位名称。")}`;
        $("#ai-summary").hidden = false;
      } else {
        $("#ai-summary").innerHTML = `<strong>AI 补充观察：</strong>${escapeHtml(response.raw || "模型完成了分析，但未返回结构化职业卡片。下方保留可靠的算法预选结果。")}`;
        $("#ai-summary").hidden = false;
      }
      setAiStatus({ kicker: "LOCAL AI · 已完成", title: "本地 AI 职业建议已生成", copy: "建议已经结合你的作答特征完成个性化解释；请继续用真实任务验证。", progress: 100, buttonText: "分析完成", disabled: true, stateClass: "is-done" });
      $("#ai-progress-label").textContent = "全部推理均在当前设备完成";
    } catch (error) {
      console.warn("Local AI unavailable, keeping deterministic recommendations:", error);
      setAiStatus({ kicker: "已切换兼容模式", title: "本地 AI 暂时没有完成", copy: "可能是网络、显存或浏览器兼容问题。算法预选结果仍然有效，你可以稍后重试。", buttonText: "重试本地 AI", stateClass: "is-error" });
      $("#ai-progress-label").textContent = error?.message ? `错误：${error.message}` : "本地模型加载失败";
    } finally {
      aiRunning = false;
    }
  }

  function renderResults() {
    const scores = calculateScores();
    const ranked = Object.keys(dimensions).sort((a, b) => scores[b] - scores[a]);
    const [primaryKey, secondaryKey] = ranked;
    const lowestKey = ranked[ranked.length - 1];
    const primary = dimensions[primaryKey];
    const secondary = dimensions[secondaryKey];
    const profile = profiles[primaryKey];
    const resultCode = `${primary.code}${secondary.code}`;

    $("#result-code").textContent = resultCode;
    $("#emblem-code").textContent = resultCode;
    $("#result-combo").textContent = `${primary.name.replace("力", "")} × ${secondary.name.replace("力", "")}`;
    $("#result-title").textContent = profile.title;
    $("#result-tagline").textContent = profile.tagline;
    $("#result-keywords").innerHTML = [...profile.keywords, secondary.short].map((item) => `<span>${item}</span>`).join("");
    $("#result-icon").innerHTML = `${profile.icon}<style>#result-icon path,#result-icon circle,#result-icon rect{fill:none;stroke:#f3c553;stroke-width:3;stroke-linecap:round;stroke-linejoin:round}</style>`;

    renderRadar(scores);
    $("#score-list").innerHTML = ranked.map((key) => {
      const dimension = dimensions[key];
      return `<div class="score-item" style="--score-color:${dimension.color}">
        <div class="score-item-top"><span class="score-name"><i></i>${dimension.name}</span><span class="score-value">${scores[key]}<small> / 100</small></span></div>
        <div class="score-track"><i data-width="${scores[key]}%"></i></div>
        <p>${dimension.short}</p>
      </div>`;
    }).join("");
    requestAnimationFrame(() => $$(".score-track i").forEach((bar) => { bar.style.width = bar.dataset.width; }));

    $("#strength-grid").innerHTML = ranked.slice(0, 3).map((key) => {
      const dimension = dimensions[key];
      return `<article class="strength-card" style="--card-color:${dimension.color};--card-pale:${dimension.pale}">
        <span>${dimension.strength.icon}</span><h3>${dimension.strength.title}</h3><p>${dimension.strength.text}</p>
      </article>`;
    }).join("");

    const goodItems = [...primary.good, ...secondary.good].slice(0, 4);
    const watchItems = [...primary.watch.slice(0, 2), `当${dimensions[lowestKey].name}需求很高时：${dimensions[lowestKey].low}`];
    $("#good-environment").innerHTML = goodItems.map((item) => `<li>${item}</li>`).join("");
    $("#watch-environment").innerHTML = watchItems.map((item) => `<li>${item}</li>`).join("");

    const careerPool = [
      ...primary.careers.slice(0, 3).map((item) => [item, primary]),
      ...secondary.careers.slice(0, 2).map((item) => [item, secondary]),
      ...dimensions[ranked[2]].careers.slice(0, 1).map((item) => [item, dimensions[ranked[2]]])
    ];
    $("#career-grid").innerHTML = careerPool.map(([career, dimension], index) => `<article class="career-card">
      <span>${String(index + 1).padStart(2, "0")} · ${dimension.name}</span><h3>${career[0]}</h3><p>${career[1]}</p><small>${career[2]}</small>
    </article>`).join("");

    prepareAiAdvisor(scores, ranked);

    const actions = [
      ["DAY 1", "记录能量线索", `回想近三个月，写下 3 个最投入的时刻，标注其中与“${primary.name}”有关的行为。`],
      ["DAY 3", "访谈一个真实从业者", `从“${careerPool[0][0][0]}”方向找一位从业者，询问日常任务、压力来源和成长路径。`],
      ["DAY 5", "完成一个 90 分钟实验", `选择一项能同时使用${primary.name}与${secondary.name}的小任务，做出一个可以展示的结果。`],
      ["DAY 7", "只用证据复盘", "记录哪些环节让你更有能量、哪些让你消耗，再决定要继续、调整还是停止。"]
    ];
    $("#action-list").innerHTML = actions.map((action) => `<div class="action-item"><span class="action-day">${action[0]}</span><div><strong>${action[1]}</strong><small>${action[2]}</small></div></div>`).join("");

    handleAssessmentSubmission(scores, ranked, profile, resultCode);
    document.title = `${profile.title}｜启途 AI 职业探索报告`;
  }

  function renderRadar(scores) {
    const keys = Object.keys(dimensions);
    const center = { x: 180, y: 160 };
    const radius = 115;
    const point = (index, value) => {
      const angle = -Math.PI / 2 + index * (Math.PI * 2 / keys.length);
      return [center.x + Math.cos(angle) * radius * value, center.y + Math.sin(angle) * radius * value];
    };
    const grids = [0.25, 0.5, 0.75, 1].map((level) => {
      const points = keys.map((_, index) => point(index, level).join(",")).join(" ");
      return `<polygon points="${points}" fill="none" stroke="#e6e1ed" stroke-width="1"/>`;
    }).join("");
    const axes = keys.map((_, index) => {
      const [x, y] = point(index, 1);
      return `<line x1="${center.x}" y1="${center.y}" x2="${x}" y2="${y}" stroke="#eeeaf2"/>`;
    }).join("");
    const dataPoints = keys.map((key, index) => point(index, scores[key] / 100));
    const polygon = dataPoints.map((p) => p.join(",")).join(" ");
    const dots = dataPoints.map((p, index) => `<circle cx="${p[0]}" cy="${p[1]}" r="4" fill="${dimensions[keys[index]].color}" stroke="#fff" stroke-width="2"/>`).join("");
    const labels = keys.map((key, index) => {
      const [x, y] = point(index, 1.25);
      const anchor = x < center.x - 10 ? "end" : x > center.x + 10 ? "start" : "middle";
      return `<text x="${x}" y="${y}" text-anchor="${anchor}" dominant-baseline="middle" fill="#696473" font-size="12" font-weight="700">${dimensions[key].name}</text>`;
    }).join("");
    $("#radar-chart").innerHTML = `${grids}${axes}<polygon points="${polygon}" fill="rgba(101,68,207,.18)" stroke="#6544cf" stroke-width="2.5" stroke-linejoin="round"/>${dots}${labels}`;
  }

  function showToast(message) {
    const toast = $("#toast");
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2200);
  }

  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (_) {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      const copied = document.execCommand("copy");
      textarea.remove();
      return copied;
    }
  }

  async function shareAssessment() {
    const shareUrl = new URL("./", window.location.href);
    shareUrl.searchParams.set("ref", "share");
    const onResult = document.body.dataset.view === "result";
    const resultName = onResult ? $("#result-title").textContent.trim() : "";
    const resultCode = onResult ? $("#result-code").textContent.trim() : "";
    const shareData = {
      title: "启途 AI｜84 题职业规划测评",
      text: onResult
        ? `我的启途职业原型是「${resultName} ${resultCode}」。来看看你的职业驱动力与具体方向。`
        : "用 84 道工作情境题看见职业驱动力，再由本地开源 AI 生成具体职业建议。",
      url: shareUrl.href
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        showToast("分享面板已打开");
        return;
      } catch (error) {
        if (error?.name === "AbortError") return;
      }
    }
    const copied = await copyText(`${shareData.text}\n${shareData.url}`);
    showToast(copied ? "分享文案和链接已复制" : "无法复制，请从地址栏复制链接");
  }

  function setupReveal() {
    if (!("IntersectionObserver" in window)) {
      $$(".reveal").forEach((element) => element.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14 });
    $$(".reveal").forEach((element) => observer.observe(element));
  }

  document.addEventListener("click", (event) => {
    const actionTarget = event.target.closest("[data-action]");
    if (actionTarget) {
      const action = actionTarget.dataset.action;
      if (action === "start") startQuiz(false);
      if (action === "home") {
        event.preventDefault();
        showView("home");
        document.title = "启途 AI 专业版｜84 题职业规划测评";
      }
      if (action === "exit") { showView("home"); showToast("进度已保存在当前浏览器"); }
      if (action === "close-help") $("#tip-modal").hidden = true;
      if (action === "retake") startQuiz(true);
      if (action === "print") window.print();
      if (action === "run-ai") startLocalAi();
      if (action === "share") shareAssessment();
      if (action === "consent-local") finishConsentChoice("local");
      if (action === "consent-submit" && $("#consent-confirm").checked) finishConsentChoice("submit");
    }

    const scaleOption = event.target.closest(".scale-option");
    if (scaleOption) selectAnswer(Number(scaleOption.dataset.value));
  });

  $("#next-question").addEventListener("click", nextQuestion);
  $("#prev-question").addEventListener("click", previousQuestion);
  $("#quiz-help").addEventListener("click", () => { $("#tip-modal").hidden = false; });
  $("#consent-confirm").addEventListener("change", (event) => { $("[data-action='consent-submit']").disabled = !event.currentTarget.checked; });
  $(".nav-toggle").addEventListener("click", (event) => {
    const open = $(".main-nav").classList.toggle("is-open");
    event.currentTarget.setAttribute("aria-expanded", String(open));
  });
  $$(".main-nav a").forEach((link) => link.addEventListener("click", () => $(".main-nav").classList.remove("is-open")));

  document.addEventListener("keydown", (event) => {
    if (document.body.dataset.view !== "quiz" || !$("#tip-modal").hidden || !$("#data-consent-modal").hidden) return;
    if (/^[1-7]$/.test(event.key)) selectAnswer(Number(event.key));
    if (event.key === "ArrowLeft") previousQuestion();
    if (event.key === "ArrowRight" && state.answers[state.current] !== null) nextQuestion();
    if (event.key === "Escape") { showView("home"); showToast("进度已保存在当前浏览器"); }
  });

  window.addEventListener("beforeprint", () => {
    if (state.answers.every((answer) => answer !== null)) renderResults();
  });

  try {
    const savedAiSetting = localStorage.getItem(AI_SETTING_KEY);
    if (savedAiSetting !== null) $("#ai-opt-in").checked = savedAiSetting === "true";
  } catch (_) { /* settings remain at the privacy-forward default */ }
  $("#ai-opt-in").addEventListener("change", (event) => {
    try { localStorage.setItem(AI_SETTING_KEY, String(event.currentTarget.checked)); } catch (_) { /* non-blocking */ }
  });

  const absoluteShareImage = new URL("share-card.png", window.location.href).href;
  $$("meta[property='og:image'], meta[name='twitter:image']").forEach((meta) => { meta.content = absoluteShareImage; });
  if ("serviceWorker" in navigator && (location.protocol === "https:" || ["localhost", "127.0.0.1"].includes(location.hostname))) {
    window.addEventListener("load", () => navigator.serviceWorker.register("./sw.js").catch(() => {}));
  }
  window.addEventListener("load", () => setTimeout(flushPendingSubmissions, 1200));

  document.body.dataset.view = "home";
  setupReveal();
})();
