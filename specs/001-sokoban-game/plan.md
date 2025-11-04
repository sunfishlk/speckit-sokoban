# 实施计划：推箱子游戏

**Branch**: `001-sokoban-game` | **Date**: 2025-11-04 | **Spec**: [spec.md](./spec.md)
**Input**: 纯前端推箱子游戏，使用 React + TypeScript 实现

## 摘要

制作经典推箱子游戏（Sokoban）。
核心玩法：玩家用键盘方向键控制角色推箱子到目标点完成关卡。
技术方案：React 组件化 UI + TypeScript 类型安全 + 本地存储进度。

## 技术上下文

**Language/Version**: TypeScript 5.x + React 18.x  
**Primary Dependencies**: React, TypeScript, Vite（构建工具 - 快速开发服务器和打包）  
**Storage**: localStorage（本地浏览器存储 - 保存游戏进度和解锁关卡）  
**Testing**: Vitest（单元测试）+ React Testing Library（组件测试）  
**Target Platform**: 现代浏览器（Chrome/Firefox/Safari/Edge 最新版）
**Project Type**: 单页 Web 应用（纯前端，无后端）  
**Performance Goals**: 按键响应 <100ms，地图渲染 <200ms，60fps 动画  
**Constraints**: 离线可玩（无网络依赖），<5MB 总资源大小  
**Scale/Scope**: 10+ 关卡，单用户本地游戏，约 1000 行核心代码

## 宪章检查

*关口：Phase 0 研究前必须通过。Phase 1 设计后重新检查。*

### I. 简洁表达
✅ **通过** - 本计划使用短句，专业词已释义（如 Vite、localStorage）

### II. 新人友好
✅ **通过** - 技术上下文包含"是什么"（工具名）、"为什么"（用途）、"怎么验收"（性能指标）

### III. 可验收性
✅ **通过** - 所有需求来自 spec.md，包含明确验收场景（Given-When-Then）

### IV. 删除空话
✅ **通过** - 无"优化体验"等空话，使用具体指标（<100ms、60fps）

### V. 最短流程
✅ **通过** - 用户操作流程：打开页面 → 按方向键 → 完成关卡（≤3 步）

### 隐私与安全
✅ **通过** - 无用户账号系统，仅本地存储进度（localStorage），无敏感数据收集

### 流程优先原则
✅ **通过** - 核心操作（移动、推箱子）为单步操作，符合 ≤3 步要求

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### 源代码结构（仓库根目录）

```text
src/
├── types/              # TypeScript 类型定义
│   ├── game.ts         # 游戏实体类型（Map, Player, Box, Level）
│   └── history.ts      # 操作历史类型
├── data/               # 静态数据
│   └── levels.ts       # 关卡地图配置（10+ 关卡）
├── core/               # 核心游戏逻辑
│   ├── GameEngine.ts   # 游戏引擎（移动规则、碰撞检测、通关判定）
│   ├── HistoryManager.ts  # 撤销/重做管理
│   └── LevelLoader.ts  # 关卡加载器
├── components/         # React 组件
│   ├── GameBoard.tsx   # 游戏主画布
│   ├── Cell.tsx        # 单个格子（墙壁/空地/箱子/目标点/角色）
│   ├── Controls.tsx    # 控制按钮（撤销/重新开始）
│   ├── LevelSelector.tsx  # 关卡选择菜单
│   └── WinDialog.tsx   # 通关提示弹窗
├── hooks/              # 自定义 React Hooks
│   ├── useKeyboard.ts  # 监听键盘输入
│   ├── useGameState.ts # 游戏状态管理
│   └── useLocalStorage.ts  # 本地存储封装
├── utils/              # 工具函数
│   └── storage.ts      # localStorage 读写
├── App.tsx             # 根组件
└── main.tsx            # 应用入口

tests/
├── unit/               # 单元测试
│   ├── GameEngine.test.ts
│   └── HistoryManager.test.ts
└── components/         # 组件测试
    ├── GameBoard.test.tsx
    └── Controls.test.tsx

public/                 # 静态资源
└── assets/
    └── sprites/        # 游戏元素图片（可选，可用 CSS 实现）
```

**结构决策**: 选择单项目结构（纯前端）。
原因：无后端需求，所有逻辑在浏览器运行。
按职责分层：types（类型）→ core（逻辑）→ components（UI）→ hooks（状态）。

## 复杂度跟踪

无违规项。所有宪章检查通过。
