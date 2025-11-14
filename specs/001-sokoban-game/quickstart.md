# 快速开始：推箱子游戏

**Date**: 2025-11-04  
**目标受众**：新入职前端开发

## 项目概述

推箱子游戏（Sokoban），玩家用键盘方向键移动角色，推箱子到目标点完成关卡。
技术栈：React 18 + TypeScript 5 + Vite。

---

## 环境准备

### 必需工具
- Node.js ≥18.0（LTS 版本）
- npm ≥9.0 或 pnpm ≥8.0
- 现代浏览器（Chrome/Firefox/Safari/Edge 最新版）

### 安装依赖
```bash
cd sokoban
npm install
```

**预期输出**：
```
added 150 packages in 10s
```

---

## 开发流程

### 启动开发服务器
```bash
npm run dev
```

**预期输出**：
```
  VITE v5.0.0  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

打开浏览器访问 `http://localhost:5173`，看到游戏界面即成功。

### 热更新（HMR）
修改任意 `.tsx` 或 `.ts` 文件保存后，浏览器自动刷新。
无需手动重启服务器。

---

## 项目结构导航

### 核心目录
```text
src/
├── types/          # 类型定义（从这里开始理解数据结构）
├── data/           # 关卡数据（修改这里可添加新关卡）
├── core/           # 游戏逻辑（核心算法在这里）
├── components/     # React 组件（UI 实现）
├── hooks/          # 自定义 Hooks（状态管理）
└── App.tsx         # 应用入口
```

### 关键文件说明

| 文件 | 职责 | 新人优先级 |
|------|------|-----------|
| `types/game.ts` | 所有类型定义 | ⭐⭐⭐ 必读 |
| `data/levels.ts` | 关卡地图配置 | ⭐⭐ 可直接修改 |
| `core/GameEngine.ts` | 移动规则、碰撞检测 | ⭐⭐⭐ 核心逻辑 |
| `core/HistoryManager.ts` | 撤销功能 | ⭐⭐ 独立模块 |
| `components/GameBoard.tsx` | 游戏主画布 | ⭐⭐ UI 入口 |
| `hooks/useGameState.ts` | 游戏状态管理 | ⭐⭐ 重要 Hook |

---

## 常见开发任务

### 任务 1：添加新关卡

**步骤**：
1. 打开 `src/data/levels.ts`
2. 在 `LEVELS` 数组末尾添加新关卡：
   ```typescript
   {
     id: 11,
     name: "新关卡",
     map: [
       "######",
       "#@ . #",
       "#  $ #",
       "######"
     ],
     width: 6,
     height: 4,
     targetCount: 1
   }
   ```
3. 保存，浏览器自动刷新，通关第 10 关后自动进入第 11 关

**验收**：能玩到新关卡，地图显示正确。

---

### 任务 2：修改按键映射

**步骤**：
1. 打开 `src/hooks/useKeyboard.ts`
2. 找到 `keyMap` 对象：
   ```typescript
   const keyMap = {
     'ArrowUp': Direction.Up,
     'ArrowDown': Direction.Down,
     'ArrowLeft': Direction.Left,
     'ArrowRight': Direction.Right,
   };
   ```
3. 添加 WASD 支持：
   ```typescript
   const keyMap = {
     'ArrowUp': Direction.Up,
     'w': Direction.Up,        // 新增
     'ArrowDown': Direction.Down,
     's': Direction.Down,      // 新增
     'ArrowLeft': Direction.Left,
     'a': Direction.Left,      // 新增
     'ArrowRight': Direction.Right,
     'd': Direction.Right,     // 新增
   };
   ```
4. 保存，测试 WASD 键能否移动

**验收**：按 W/A/S/D 能控制角色移动。

---

### 任务 3：修改样式（格子颜色）

**步骤**：
1. 打开 `src/components/Cell.tsx`
2. 找到样式定义（CSS-in-JS 或 className）
3. 修改颜色值，如墙壁改为深灰色：
   ```tsx
   const cellStyles = {
     wall: { backgroundColor: '#333' },  // 原 #000
     empty: { backgroundColor: '#fff' },
     // ...
   };
   ```
4. 保存，浏览器自动更新

**验收**：游戏界面墙壁显示深灰色。

---

### 任务 4：运行测试

**运行所有测试**：
```bash
npm run test
```

**预期输出**：
```
 ✓ src/core/GameEngine.test.ts (12)
 ✓ src/core/HistoryManager.test.ts (8)

Test Files  2 passed (2)
     Tests  20 passed (20)
```

**运行单个测试文件**：
```bash
npm run test src/core/GameEngine.test.ts
```

**监听模式（文件变化自动重测）**：
```bash
npm run test:watch
```

---

## 调试技巧

### 1. 查看游戏状态
在 `GameBoard.tsx` 中添加：
```tsx
console.log('当前状态:', gameState);
```

浏览器 Console 显示：
```json
{
  "playerPosition": { "x": 1, "y": 1 },
  "boxes": [{ "x": 2, "y": 2 }],
  "steps": 5,
  "isWin": false
}
```

### 2. React DevTools
安装 React DevTools 浏览器插件。
查看组件树和 Props/State。

### 3. 断点调试
在 Chrome DevTools → Sources → 找到 `GameEngine.ts`。
在 `move()` 函数打断点，按方向键触发。

---

## 常见问题

### Q1: 开发服务器启动失败
**现象**：`Error: Cannot find module 'vite'`

**解决**：
```bash
rm -rf node_modules package-lock.json
npm install
```

---

### Q2: 修改代码后浏览器不刷新
**原因**：HMR 失效

**解决**：
1. 手动刷新浏览器（F5）
2. 重启开发服务器（Ctrl+C → `npm run dev`）

---

### Q3: TypeScript 类型报错
**现象**：`Property 'x' does not exist on type 'Position'`

**解决**：
1. 检查 `types/game.ts` 是否导出了类型
2. 确认 import 语句：`import { Position } from '@/types/game'`

---

### Q4: 游戏卡顿（按键无响应）
**排查步骤**：
1. 打开 Chrome DevTools → Performance
2. 录制游戏操作
3. 查找耗时超过 100ms 的函数调用
4. 优化算法或减少 re-render

---

## 构建生产版本

### 打包命令
```bash
npm run build
```

**预期输出**：
```
vite v5.0.0 building for production...
✓ 120 modules transformed.
dist/index.html                   0.45 kB
dist/assets/index-a3b4c5d6.js    45.2 kB │ gzip: 15.3 kB
```

### 预览生产版本
```bash
npm run preview
```

打开 `http://localhost:4173` 查看生产版本。

---

## 提交代码前检查清单

- [ ] 代码格式化（`npm run format`，如果有配置）
- [ ] 类型检查通过（`npm run type-check`）
- [ ] 测试通过（`npm run test`）
- [ ] 本地运行无报错（`npm run dev`）
- [ ] Commit 信息清晰（如"feat: 添加第 11 关"）

---

## 下一步学习

### 进阶任务
1. 实现死局检测（箱子推到墙角自动提示）
2. 添加音效（使用 Web Audio API）
3. 实现计时功能（记录通关时间）
4. 添加关卡编辑器

### 学习资源
- React 官方文档：https://react.dev
- TypeScript 手册：https://www.typescriptlang.org/docs
- Vite 文档：https://vitejs.dev
- 推箱子算法：搜索"Sokoban solver algorithm"

---

## 需要帮助？

- 查看 `docs/architecture.md`（架构设计，如果有）
- 查看 `specs/001-sokoban-game/data-model.md`（数据模型）
- 查看 `specs/001-sokoban-game/contracts/`（接口文档）
- 问团队其他成员（建议先自己调试 15 分钟）
