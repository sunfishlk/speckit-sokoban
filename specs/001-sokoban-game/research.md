# 技术研究：推箱子游戏

**Date**: 2025-11-04  
**Feature**: 推箱子游戏（Sokoban）  
**Tech Stack**: React + TypeScript

## 研究目标

解决技术上下文中所有已知问题，为 Phase 1 设计阶段提供决策依据。

## 1. 构建工具选择

### 决策：Vite

**为什么选择 Vite**：
- 开发服务器启动速度快（<1 秒）
- 原生支持 TypeScript，无需额外配置
- HMR（热模块替换 - 代码修改后浏览器自动刷新）性能优于 Webpack
- 官方 React 模板开箱即用

**替代方案**：
- **Webpack**: 配置复杂，启动慢（>10 秒），不适合小型项目
- **Create React App**: 已停止维护，不推荐新项目使用
- **Parcel**: 自动配置但扩展性差

**验收标准**：项目能在 2 秒内启动开发服务器。

---

## 2. 状态管理方案

### 决策：React Hooks（useState + useReducer）

**为什么不用 Redux/Zustand**：
- 游戏状态简单：当前关卡、角色位置、箱子位置、操作历史
- 无跨组件复杂共享需求（状态集中在 GameBoard 组件）
- 避免引入额外依赖（遵循"最短流程"原则）

**状态结构**：
```typescript
interface GameState {
  currentLevel: number;          // 当前关卡编号
  playerPosition: Position;      // 角色坐标 {x, y}
  boxes: Position[];             // 所有箱子坐标
  history: GameSnapshot[];       // 操作历史（用于撤销）
  steps: number;                 // 步数计数
  isWin: boolean;                // 是否通关
}
```

**验收标准**：任何状态变更能在一个 setState 调用内完成。

---

## 3. 碰撞检测算法

### 决策：基于二维数组的位置检查

**算法逻辑**：
1. 玩家移动前，计算目标位置 `targetPos = playerPos + direction`
2. 检查目标位置类型：
   - 墙壁（Wall）→ 移动无效
   - 空地/目标点（Empty/Target）→ 玩家移动到目标位置
   - 箱子（Box）→ 检查箱子后方位置
     - 箱子后方是空地/目标点 → 玩家和箱子都移动
     - 箱子后方是墙壁/另一箱子 → 移动无效

**性能优化**：
- 地图用二维数组存储，O(1) 查询任意位置类型
- 箱子用 `Map<string, Box>` 存储（key = `${x},${y}`），O(1) 查询箱子位置

**验收标准**：任意移动操作在 <10ms 内完成检测。

---

## 4. 关卡数据格式

### 决策：字符串数组表示地图

**格式示例**：
```typescript
const level1 = {
  id: 1,
  map: [
    "####",
    "#@.#",  // @ = 角色, . = 目标点
    "#$*#",  // $ = 箱子, * = 箱子在目标点上
    "####"
  ],
  targetCount: 2  // 目标点数量（用于通关检测）
};
```

**字符含义**：
- `#` - 墙壁
- ` ` - 空地（空格）
- `.` - 目标点
- `$` - 箱子
- `*` - 箱子在目标点上
- `@` - 角色
- `+` - 角色在目标点上

**为什么不用 JSON 对象**：
- 字符串数组更直观，便于手工编辑关卡
- 行业标准格式（经典 Sokoban 关卡通用格式）
- 解析简单（单次遍历）

**验收标准**：能从字符串数组解析出所有实体位置。

---

## 5. 撤销功能实现

### 决策：快照栈（Snapshot Stack）

**数据结构**：
```typescript
interface GameSnapshot {
  playerPosition: Position;
  boxes: Position[];
  steps: number;
}

const history: GameSnapshot[] = [];  // 栈结构
```

**工作流程**：
- 每次移动前，保存当前状态到 history 栈顶
- 撤销时，从栈顶弹出一个快照，恢复状态
- 限制历史栈大小为 100 步（防止内存溢出）

**替代方案**：
- **命令模式（Command Pattern）**：过度设计，增加复杂度
- **仅记录操作序列**：需要从初始状态重放所有操作，性能差

**验收标准**：撤销操作在 <50ms 内完成。

---

## 6. 通关检测逻辑

### 决策：目标点覆盖检查

**算法**：
```typescript
function checkWin(boxes: Position[], targets: Position[]): boolean {
  // 检查每个目标点上是否都有箱子
  return targets.every(target => 
    boxes.some(box => box.x === target.x && box.y === target.y)
  );
}
```

**触发时机**：每次推动箱子后立即检查。

**优化**：用计数器代替 every/some 嵌套循环：
```typescript
let boxesOnTarget = 0;
boxes.forEach(box => {
  if (isTarget(box.x, box.y)) boxesOnTarget++;
});
return boxesOnTarget === targets.length;
```

**验收标准**：通关检测在 <5ms 内完成。

---

## 7. 键盘输入处理

### 决策：全局事件监听 + Hook 封装

**实现**：
```typescript
function useKeyboard(onMove: (direction: Direction) => void) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const keyMap = {
        'ArrowUp': Direction.Up,
        'ArrowDown': Direction.Down,
        'ArrowLeft': Direction.Left,
        'ArrowRight': Direction.Right,
      };
      const direction = keyMap[e.key];
      if (direction) {
        e.preventDefault();  // 防止页面滚动
        onMove(direction);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onMove]);
}
```

**为什么用全局监听**：
- 游戏在任何时候都应响应按键（无需聚焦特定元素）
- React 组件卸载时自动清理事件监听器

**验收标准**：按键响应时间 <100ms。

---

## 8. 本地存储方案

### 决策：localStorage 存储进度

**存储内容**：
```typescript
interface SaveData {
  unlockedLevels: number[];  // 已解锁关卡列表
  currentLevel: number;      // 当前关卡
  bestSteps: Record<number, number>;  // 每关最少步数记录
}
```

**读写时机**：
- **读取**：应用启动时
- **写入**：通关时更新 unlockedLevels 和 bestSteps

**错误处理**：
- localStorage 不可用（隐私模式）→ 降级到内存存储（刷新后丢失）
- 数据损坏 → 重置为默认值（从第一关开始）

**验收标准**：存储操作在 <10ms 内完成。

---

## 9. UI 渲染方案

### 决策：CSS Grid 布局 + Unicode 字符

**方案 A：CSS Grid（推荐）**：
```css
.game-board {
  display: grid;
  grid-template-columns: repeat(auto-fit, 40px);
  gap: 0;
}
.cell { width: 40px; height: 40px; }
```

优点：响应式，代码简洁，无需图片资源。

**方案 B：Canvas 渲染**：
优点：性能高（适合大地图）。
缺点：交互复杂，不适合小地图（10x10 以下）。

**选择理由**：关卡地图通常 <20x20，CSS Grid 性能足够，且开发效率高。

**验收标准**：20x20 地图渲染时间 <200ms。

---

## 10. 测试策略

### 单元测试（核心逻辑）

**测试目标**：
- `GameEngine.move()` - 所有移动场景
- `HistoryManager.undo()` - 撤销功能
- `LevelLoader.parse()` - 关卡解析

**工具**：Vitest（语法类似 Jest，但速度更快）

### 组件测试（UI 交互）

**测试目标**：
- `GameBoard` - 渲染正确元素数量
- `Controls` - 按钮点击触发正确回调

**工具**：React Testing Library

**不测试内容**：
- 样式细节（视觉回归测试成本高）
- 端到端流程（小项目无需 E2E）

**验收标准**：核心逻辑测试覆盖率 >80%。

---

## 总结

所有技术决策已明确，无 NEEDS CLARIFICATION 项。
Phase 1 可开始数据模型和契约设计。
