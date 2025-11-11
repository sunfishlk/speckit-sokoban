---
description: "推箱子游戏实施任务清单"
---

# 任务清单：推箱子游戏 (Sokoban Game)

**输入文档**: 来自 `/specs/001-sokoban-game/` 的设计文档
**前置条件**: plan.md, spec.md, research.md, data-model.md, contracts/

**测试**: 不包含测试任务 - 功能规格中未明确要求 TDD 方法

**组织结构**: 任务按用户故事分组，以便每个故事可以独立实施和测试

## 格式：`[ID] [P?] [Story?] 描述`

- **[P]**: 可并行执行（不同文件，无依赖关系）
- **[Story]**: 此任务所属的用户故事（如 US1, US2, US3）
- 描述中包含确切的文件路径

## 路径约定

- **单项目结构**: 仓库根目录下的 `src/`, `tests/`
- 项目类型：纯前端（React + TypeScript + Vite）

---

## 阶段 1：环境搭建（共享基础设施）

**目标**：项目初始化和基本结构

- [X] T001 在仓库根目录初始化 Vite React TypeScript 项目
- [X] T002 [P] 安装依赖包（React 18, TypeScript 5, Vite）
- [X] T003 [P] 在 tsconfig.json 中配置 TypeScript 严格模式
- [X] T004 [P] 在 vite.config.ts 中配置 Vitest 单元测试
- [X] T005 [P] 创建项目目录结构（src/types, src/data, src/core, src/components, src/hooks, src/utils）

---

## 阶段 2：基础架构（阻塞性前置条件）

**目标**：所有用户故事依赖的核心类型定义和数据基础设施

**⚠️ 关键**：在此阶段完成之前，不能开始任何用户故事的工作

- [X] T006 [P] 在 src/types/game.ts 中定义 Position 接口
- [X] T007 [P] 在 src/types/game.ts 中定义 CellType 枚举
- [X] T008 [P] 在 src/types/game.ts 中定义 Direction 枚举和 DIRECTION_VECTORS
- [X] T009 [P] 在 src/types/game.ts 中定义 Level 接口
- [X] T010 [P] 在 src/types/game.ts 中定义 GameState 接口
- [X] T011 [P] 在 src/types/game.ts 中定义 GameSnapshot 接口
- [X] T012 [P] 在 src/types/game.ts 中定义 SaveData 接口
- [X] T013 在 src/data/levels.ts 中创建初始关卡数据（至少 3 关）
- [X] T014 [P] 在 src/core/LevelLoader.ts 中实现 LevelLoader.parseLevel()
- [X] T015 [P] 在 src/core/LevelLoader.ts 中实现 LevelLoader.validateLevel()
- [X] T016 [P] 在 src/core/LevelLoader.ts 中实现 LevelLoader.loadLevelById()
- [X] T017 在 src/core/GameEngine.ts 中实现 GameEngine.getCellType()
- [X] T018 [P] 在 src/core/GameEngine.ts 中实现 GameEngine.isValidPosition()
- [X] T019 在 src/core/GameEngine.ts 中实现 GameEngine.checkWin()
- [X] T020 在 src/core/GameEngine.ts 中实现包含碰撞检测的 GameEngine.move()

**检查点**：基础架构就绪 - 现在可以并行开始用户故事实施

---

## 阶段 3：用户故事 1 - 开始游戏并玩第一关 (优先级: P1) 🎯 MVP

**目标**：玩家可以加载游戏，看到第一关地图，用方向键移动角色，推箱子到目标点，看到通关提示

**独立测试**：加载游戏 → 看到包含角色、箱子、墙壁、目标点的地图 → 按方向键 → 角色移动 → 推箱子到目标点 → 看到"恭喜通关"消息

### 用户故事 1 的实施

- [X] T021 [P] [US1] 在 src/components/Cell.tsx 中创建 Cell 组件来渲染单个网格格子
- [X] T022 [P] [US1] 在 src/hooks/useKeyboard.ts 中创建处理方向键输入的 useKeyboard hook
- [X] T023 [US1] 在 src/hooks/useGameState.ts 中创建游戏状态管理的 useGameState hook（依赖 T020）
- [X] T024 [US1] 在 src/components/GameBoard.tsx 中创建渲染游戏网格的 GameBoard 组件（依赖 T021）
- [X] T025 [US1] 在 src/components/WinDialog.tsx 中创建通关提示的 WinDialog 组件
- [X] T026 [US1] 在 src/hooks/useGameState.ts 中集成键盘控制与游戏状态（依赖 T022, T023）
- [X] T027 [US1] 在 src/hooks/useGameState.ts 中添加每次移动后的通关检测触发（依赖 T019）
- [X] T028 [US1] 实现 App.tsx 以初始化第一关游戏并渲染 GameBoard
- [X] T029 [US1] 创建 main.tsx 入口点以挂载 React 应用
- [X] T030 [US1] 为游戏棋盘网格布局添加基本 CSS 样式

**检查点**：此时用户故事 1 应该完全可用 - 可以从开始到通关玩第一关

---

## 阶段 4：用户故事 2 - 撤销操作 (优先级: P2)

**目标**：玩家在出错时可以撤销移动

**独立测试**：进行 3 步移动 → 点击撤销按钮或按 Z 键 → 游戏返回到 2 步后的状态 → 可以撤销直到初始状态

### 用户故事 2 的实施

- [X] T031 [P] [US2] 在 src/core/HistoryManager.ts 中实现 HistoryManager.push()
- [X] T032 [P] [US2] 在 src/core/HistoryManager.ts 中实现 HistoryManager.pop()
- [X] T033 [P] [US2] 在 src/core/HistoryManager.ts 中实现 HistoryManager.clear()
- [X] T034 [P] [US2] 在 src/core/HistoryManager.ts 中实现 HistoryManager.canUndo()
- [X] T035 [P] [US2] 在 src/core/HistoryManager.ts 中实现 HistoryManager.size()
- [X] T036 [US2] 将 HistoryManager 与 useGameState hook 集成，在每次移动前保存状态
- [X] T037 [US2] 向 useGameState 添加调用 HistoryManager.pop() 的撤销函数
- [X] T038 [US2] 在 src/components/Controls.tsx 中创建包含撤销按钮的 Controls 组件
- [X] T039 [US2] 在 useKeyboard hook 中添加撤销的键盘快捷键（Z 键）
- [X] T040 [US2] 更新 GameBoard 以包含 Controls 组件
- [X] T041 [US2] 为 Controls 组件添加 CSS 样式

**检查点**：此时用户故事 1 和 2 都应该工作 - 可以玩游戏并撤销错误

---

## 阶段 5：用户故事 3 - 重新开始当前关卡 (优先级: P2)

**目标**：玩家在卡住时可以重新开始当前关卡

**独立测试**：进行几步移动 → 点击重新开始按钮 → 游戏重置为当前关卡的初始状态

### 用户故事 3 的实施

- [X] T042 [US3] 向 useGameState 添加重新开始函数，清除历史并重新加载当前关卡
- [X] T043 [US3] 在 src/components/Controls.tsx 的 Controls 组件中添加重新开始按钮
- [X] T044 [US3] 在 useKeyboard hook 中为重新开始添加键盘快捷键（R 键）
- [X] T045 [US3] 确保通关后重新开始功能正常工作

**检查点**：所有基本游戏功能正常 - 游戏、撤销、重新开始

---

## 阶段 6：用户故事 4 - 切换关卡 (优先级: P3)

**目标**：玩家通关后进入下一关，可以从菜单选择已解锁的关卡

**独立测试**：通关第 1 关 → 2 秒后自动加载第 2 关 → 打开关卡选择器 → 跳转到第 3 关

### 用户故事 4 的实施

- [X] T046 [P] [US4] 在 src/utils/storage.ts 中实现 localStorage 读写函数
- [X] T047 [P] [US4] 在 src/hooks/useLocalStorage.ts 中创建管理存档数据的 useLocalStorage hook
- [X] T048 [P] [US4] 向 src/data/levels.ts 添加 7+ 更多关卡（总共 10+ 关）
- [X] T049 [US4] 将 useLocalStorage 与 useGameState 集成以跟踪已解锁关卡和最佳步数
- [X] T050 [US4] 在 useGameState 中添加通关后自动进入下一关（2 秒延迟）
- [X] T051 [US4] 在 src/components/LevelSelector.tsx 中创建带关卡网格/列表的 LevelSelector 组件
- [X] T052 [US4] 添加关卡解锁逻辑（通关第 N 关解锁第 N+1 关）
- [X] T053 [US4] 向 Controls 组件添加打开 LevelSelector 的按钮
- [X] T054 [US4] 实现点击 LevelSelector 中关卡时的关卡加载
- [X] T055 [US4] 在游戏 UI 中显示当前关卡号和步数
- [X] T056 [US4] 为 LevelSelector 组件添加 CSS 样式
- [X] T057 [US4] 关卡完成时将进度保存到 localStorage

**检查点**：所有用户故事现在都应该独立可用 - 完整的游戏体验

---

## 阶段 7：完善和跨功能关注点

**目标**：测试、性能和最终改进

- [ ] T058 [P] 在 tests/unit/GameEngine.test.ts 中为 GameEngine.move() 添加单元测试
- [ ] T059 [P] 在 tests/unit/GameEngine.test.ts 中为 GameEngine.checkWin() 添加单元测试
- [ ] T060 [P] 在 tests/unit/HistoryManager.test.ts 中为 HistoryManager 添加单元测试
- [ ] T061 [P] 在 tests/unit/LevelLoader.test.ts 中为 LevelLoader.parseLevel() 添加单元测试
- [ ] T062 [P] 在 tests/components/GameBoard.test.tsx 中为 GameBoard 添加组件测试
- [ ] T063 [P] 在 tests/components/Controls.test.tsx 中为 Controls 添加组件测试
- [ ] T064 运行 npm test 验证所有测试通过
- [ ] T065 运行 npm run lint 验证代码质量
- [ ] T066 测试性能：验证按键响应 <100ms，地图渲染 <200ms
- [ ] T067 测试所有 10+ 关卡都可玩且可通关
- [ ] T068 添加视觉完善：改进颜色，添加悬停效果，平滑过渡
- [ ] T069 向游戏 UI 添加步数计数器显示
- [ ] T070 测试 localStorage 在不可用时的降级方案（隐私浏览模式）
- [ ] T071 验证游戏在 Chrome、Firefox、Safari、Edge 中正常工作
- [ ] T072 运行 quickstart.md 验证场景

---

## 依赖关系和执行顺序

### 阶段依赖关系

- **环境搭建（阶段 1）**：无依赖 - 可以立即开始
- **基础架构（阶段 2）**：依赖环境搭建（阶段 1）完成 - 阻塞所有用户故事
- **用户故事（阶段 3-6）**：都依赖基础架构阶段完成
  - 然后用户故事可以并行进行（如果有人力）
  - 或按优先级顺序依次进行（US1 → US2 → US3 → US4）
- **完善（阶段 7）**：依赖所有用户故事完成

### 用户故事依赖关系

- **用户故事 1（P1）**：依赖基础架构（阶段 2）- 不依赖其他故事
- **用户故事 2（P2）**：依赖基础架构（阶段 2）- 与 US1 集成但可独立测试
- **用户故事 3（P2）**：依赖基础架构（阶段 2）- 与 US1/US2 集成但可独立测试
- **用户故事 4（P3）**：依赖基础架构（阶段 2）- 与 US1 集成但可独立测试

### 每个用户故事内部

- 核心逻辑（GameEngine, HistoryManager）在 hooks 之前
- Hooks 在组件之前
- 单个组件在集成之前
- 基础组件功能在键盘快捷键之前
- 故事完成后再进入下一优先级

### 并行机会

**阶段 1（环境搭建）**：T002, T003, T004, T005 可以并行

**阶段 2（基础架构）**：
- T006-T012（所有类型定义）可以并行
- T014-T016（LevelLoader 方法）可以并行
- T017-T019（GameEngine 辅助方法）可以并行

**阶段 3（US1）**：
- T021, T022 可以并行（Cell 组件 + useKeyboard hook）
- T023 完成后：T024, T025 可以并行

**阶段 4（US2）**：
- T031-T035（所有 HistoryManager 方法）可以并行
- T038, T041 可以并行（组件 + 样式）

**阶段 6（US4）**：
- T046, T047, T048 可以并行
- T051, T056 可以并行（组件 + 样式）

**阶段 7（完善）**：
- T058-T063（所有测试）可以并行
- T066, T067, T070, T071（所有测试任务）可以并行

---

## 并行示例：用户故事 1

```bash
# 基础架构阶段完成后，并行启动：
任务 T021：在 src/components/Cell.tsx 中创建 Cell 组件来渲染单个网格格子
任务 T022：在 src/hooks/useKeyboard.ts 中创建处理方向键输入的 useKeyboard hook

# T023 完成后，并行启动：
任务 T024：在 src/components/GameBoard.tsx 中创建渲染游戏网格的 GameBoard 组件
任务 T025：在 src/components/WinDialog.tsx 中创建通关提示的 WinDialog 组件
```

---

## 实施策略

### MVP 优先（仅用户故事 1）

1. 完成阶段 1：环境搭建（T001-T005）
2. 完成阶段 2：基础架构（T006-T020）- 关键
3. 完成阶段 3：用户故事 1（T021-T030）
4. **停止并验证**：玩第 1 关，测试移动，推箱子，验证通关对话框
5. 部署/演示 MVP

### 增量交付

1. 完成环境搭建 + 基础架构 → 基础就绪（20 个任务）
2. 添加用户故事 1 → 独立测试 → 部署/演示（MVP！总共 30 个任务）
3. 添加用户故事 2 → 测试撤销功能 → 部署/演示（总共 41 个任务）
4. 添加用户故事 3 → 测试重新开始功能 → 部署/演示（总共 45 个任务）
5. 添加用户故事 4 → 测试关卡进度 → 部署/演示（总共 57 个任务）
6. 完善和测试 → 生产就绪（总共 72 个任务）

### 并行团队策略

多个开发者时：

1. 团队一起完成环境搭建 + 基础架构（T001-T020）
2. 基础架构完成后：
   - 开发者 A：用户故事 1（T021-T030）
   - 开发者 B：用户故事 2（T031-T041）- 可以并行开始核心逻辑
   - 开发者 C：用户故事 4 数据准备（T048）
3. 故事顺利集成，因为都依赖同一基础

---

## 注释

- [P] 任务 = 不同文件，阶段内无依赖
- [Story] 标签将任务映射到特定用户故事以便追踪
- 每个用户故事都应该可以独立完成和测试
- 在每个任务或逻辑组后提交
- 在任何检查点停下来独立验证故事
- 总任务：72 个（环境搭建：5，基础架构：15，US1：10，US2：11，US3：4，US4：12，完善：15）
- 估计并行执行：在适当人力配置下约 45% 的任务可以并行
- MVP 范围：任务 T001-T030（30 个任务）- 交付可玩的单关卡游戏