<!--
SYNC IMPACT REPORT
==================
Version Change: [Template] → 1.0.0
Rationale: Initial constitution ratification with 5 core principles derived from user requirements.

Modified Principles:
- NEW: I. 简洁表达 (Concise Communication)
- NEW: II. 新人友好 (Beginner-Friendly)
- NEW: III. 可验收性 (Testable Deliverables)
- NEW: IV. 删除空话 (No Empty Words)
- NEW: V. 最短流程 (Shortest Path)

Added Sections:
- 输出规范 (Output Standards)
- 产品原则 (Product Principles) - marked NON-NEGOTIABLE

Removed Sections: None (initial version)

Templates Requiring Updates:
- ✅ spec-template.md: Already includes "上下文摘要" section via User Scenarios
- ✅ plan-template.md: Constitution Check section references this file correctly
- ✅ tasks-template.md: Aligned with user story decomposition approach
- ⚠️  All templates: Should enforce "简洁表达" and "删除空话" principles in guidance comments

Follow-up TODOs:
- Ratification date set to 2025-11-04 (today); update if formal approval date differs
- Templates should add explicit reminders to avoid verbose/empty language
- Consider adding examples of "空话" to avoid in future template updates
-->

# Sokoban 项目宪章

## 核心原则

### I. 简洁表达

**规则**:
- 文档受众是"新入职的前端/后端/QA/设计同学"
- 优先使用短句；每段不超过 5 行
- 专业词首次出现时必须给白话释义（例：MVP - 最小可行产品）
- 段落结构：用短句，避免复合从句

**为什么**: 新人理解速度快，减少沟通成本，降低误解风险。

**怎么验收**: 任意段落超过 5 行则不通过；专业词无释义则不通过。

### II. 新人友好

**规则**:
- 每个需求点必须包含三部分：
  1. **是什么** - 清晰定义功能或概念
  2. **为什么** - 解释目的和价值
  3. **怎么验收** - 给出可测试的标准
- 避免假设读者有领域背景

**为什么**: 降低团队成员学习曲线，保证任何人都能独立理解需求。

**怎么验收**: 随机选取需求点，检查是否包含"是什么/为什么/怎么验收"三要素。

### III. 可验收性 (NON-NEGOTIABLE)

**规则**:
- 所有功能需求必须可测试、可演示
- 每个用户故事必须独立可验收（即使只实现这一个故事，也能交付价值）
- 使用 Given-When-Then 格式定义验收场景
- 禁止使用模糊词汇（如"优化"、"改进"），必须量化（如"响应时间 <500ms"）

**为什么**: 防止需求歧义，保证开发目标明确，支持迭代交付。

**怎么验收**: QA 能根据文档独立设计测试用例；产品能根据文档判定功能是否完成。

### IV. 删除空话 (NON-NEGOTIABLE)

**规则**:
- 禁止使用无证据的描述词：
  - "全面提升" → 必须说明提升哪些具体指标
  - "显著增强" → 必须给出增强前后的对比数据
  - "优化体验" → 必须说明优化了哪个操作步骤、减少了多少时间
- 每个形容词必须有数据或用户场景支撑

**为什么**: 空话导致需求不可验收，浪费开发和测试资源。

**怎么验收**: 检查文档中是否存在上述禁用词；如存在，必须补充具体数据或删除。

### V. 最短流程

**规则**:
- 所有用户操作流程要尽可能短
- 每增加一个步骤，必须说明为何无法合并到前一步
- 默认值优先：能自动填充的字段不让用户手动输入

**为什么**: 减少用户操作成本，提高完成率，降低出错概率。

**怎么验收**: 审查用户故事，数操作步数；如超过 3 步，必须提供简化方案或合理说明。

## 输出规范

### spec.md 结构要求

**规则**:
- 文档最前方必须包含《上下文摘要》章节
- 摘要内容：30 字以内说明"要做什么"，50 字以内说明"为什么做"
- 表格一律使用 Markdown 格式（不使用 HTML `<table>`）

**为什么**: 快速传达核心信息，降低读者理解成本。

**怎么验收**: spec.md 第一章节必须是《上下文摘要》；摘要字数符合要求；无 HTML 表格。

### 不确定性处理

**规则**:
- 遇到不确定的需求时，产出"澄清清单"
- 清单格式：
  ```markdown
  ## 澄清清单
  - [ ] 问题描述 - 当前理解 - 需要确认的内容
  ```
- 禁止猜测或假设，必须明确标记为"待澄清"

**为什么**: 避免错误假设导致返工。

**怎么验收**: 文档中使用 `NEEDS CLARIFICATION` 标记不确定点；或单独输出澄清清单。

## 产品原则 (NON-NEGOTIABLE)

### 隐私与安全优先

**规则**:
- 所有功能设计必须符合当地法律法规（GDPR、个人信息保护法等）
- 用户数据收集必须遵循"最小必要"原则
- 敏感数据（密码、支付信息）必须加密存储和传输
- 用户必须能够随时查看、导出、删除自己的数据

**为什么**: 法律合规是不可协商的底线；用户隐私是核心价值。

**怎么验收**: 
- 新功能上线前必须通过隐私合规审查
- 技术方案中必须包含数据加密、权限控制设计
- 用户能在 UI 中找到数据管理入口（查看/导出/删除）

### 流程优先原则

**规则**:
- 用户流程必须在 3 步内完成核心操作
- 禁止为了"功能完整"而增加非必要步骤
- 每个页面跳转必须说明为何无法在当前页完成

**为什么**: 用户完成率与步骤数成反比；每增加 1 步，流失率增加 20%（行业数据）。

**怎么验收**: 绘制用户流程图，数步骤数；超过 3 步需提供 A/B 测试数据或简化方案。

## 治理规则

### 宪章优先级

本宪章优先级高于所有其他开发实践文档。
如规范冲突，以本宪章为准。

### 修订流程

1. 提出修订的 Pull Request，说明修改原因
2. 团队 Review，至少 2 人批准
3. 更新版本号（遵循语义化版本）：
   - MAJOR: 删除或重新定义核心原则
   - MINOR: 新增原则或章节
   - PATCH: 文字澄清、错误修正
4. 更新 `Last Amended` 日期

### 合规检查

所有 Pull Request 必须在描述中说明：
- 是否符合"简洁表达"原则（段落 ≤5 行）
- 是否符合"可验收性"原则（有明确验收标准）
- 是否符合"隐私与安全"原则（如涉及数据处理）

**Version**: 1.0.0 | **Ratified**: 2025-11-04 | **Last Amended**: 2025-11-04
