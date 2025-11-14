# 数据模型：推箱子游戏

**Date**: 2025-11-04  
**Feature**: 推箱子游戏核心实体定义

## 核心实体

### Position（坐标）

**是什么**：二维网格坐标。

**属性**：
| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| x | number | ✅ | 横坐标（从 0 开始） |
| y | number | ✅ | 纵坐标（从 0 开始） |

**验证规则**：
- `x >= 0` 且 `y >= 0`
- `x < mapWidth` 且 `y < mapHeight`

**TypeScript 定义**：
```typescript
interface Position {
  x: number;
  y: number;
}
```

---

### CellType（格子类型）

**是什么**：地图上单个格子的类型枚举。

**枚举值**：
| 值 | 含义 | 字符表示 |
|---|------|----------|
| Wall | 墙壁 | `#` |
| Empty | 空地 | ` `（空格） |
| Target | 目标点 | `.` |
| Box | 箱子 | `$` |
| BoxOnTarget | 箱子在目标点上 | `*` |
| Player | 角色 | `@` |
| PlayerOnTarget | 角色在目标点上 | `+` |

**TypeScript 定义**：
```typescript
enum CellType {
  Wall = 'wall',
  Empty = 'empty',
  Target = 'target',
  Box = 'box',
  BoxOnTarget = 'box-on-target',
  Player = 'player',
  PlayerOnTarget = 'player-on-target',
}
```

---

### Direction（移动方向）

**是什么**：角色移动的四个方向。

**枚举值**：
| 值 | 含义 | 坐标变化 | 键盘按键 |
|---|------|----------|----------|
| Up | 上 | `(0, -1)` | `ArrowUp` |
| Down | 下 | `(0, +1)` | `ArrowDown` |
| Left | 左 | `(-1, 0)` | `ArrowLeft` |
| Right | 右 | `(+1, 0)` | `ArrowRight` |

**TypeScript 定义**：
```typescript
enum Direction {
  Up = 'up',
  Down = 'down',
  Left = 'left',
  Right = 'right',
}

const DIRECTION_VECTORS: Record<Direction, Position> = {
  [Direction.Up]: { x: 0, y: -1 },
  [Direction.Down]: { x: 0, y: 1 },
  [Direction.Left]: { x: -1, y: 0 },
  [Direction.Right]: { x: 1, y: 0 },
};
```

---

### Level（关卡）

**是什么**：完整的游戏关卡配置，包含地图和元数据。

**属性**：
| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | number | ✅ | 关卡编号（从 1 开始） |
| name | string | ❌ | 关卡名称（如"初学者"） |
| map | string[] | ✅ | 地图数组，每行一个字符串 |
| width | number | ✅ | 地图宽度（列数） |
| height | number | ✅ | 地图高度（行数） |
| targetCount | number | ✅ | 目标点数量（用于通关检测） |

**约束**：
- `map.length === height`
- `map[i].length === width`（所有行长度相同）
- 目标点数量 = 箱子数量
- 有且仅有一个角色起始位置

**示例**：
```typescript
const level1: Level = {
  id: 1,
  name: "第一关",
  map: [
    "####  ",
    "#@.#  ",
    "#$ #  ",
    "#### ",
  ],
  width: 6,
  height: 4,
  targetCount: 1,
};
```

**TypeScript 定义**：
```typescript
interface Level {
  id: number;
  name?: string;
  map: string[];
  width: number;
  height: number;
  targetCount: number;
}
```

---

### GameState（游戏状态）

**是什么**：当前游戏的完整状态（运行时数据）。

**属性**：
| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| level | Level | ✅ | 当前关卡配置 |
| playerPosition | Position | ✅ | 角色当前位置 |
| boxes | Position[] | ✅ | 所有箱子位置 |
| targets | Position[] | ✅ | 所有目标点位置（固定不变） |
| steps | number | ✅ | 当前步数（移动或推箱子计数） |
| isWin | boolean | ✅ | 是否通关 |

**验证规则**：
- `boxes.length === targets.length === level.targetCount`
- 所有位置在地图范围内

**TypeScript 定义**：
```typescript
interface GameState {
  level: Level;
  playerPosition: Position;
  boxes: Position[];
  targets: Position[];
  steps: number;
  isWin: boolean;
}
```

---

### GameSnapshot（游戏快照）

**是什么**：用于撤销功能的状态快照，仅存储可变数据。

**属性**：
| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| playerPosition | Position | ✅ | 角色位置 |
| boxes | Position[] | ✅ | 箱子位置数组 |
| steps | number | ✅ | 步数 |

**为什么不存储完整 GameState**：
- `level` 和 `targets` 不变，无需重复存储
- 减少内存占用（快照栈最多 100 个）

**TypeScript 定义**：
```typescript
interface GameSnapshot {
  playerPosition: Position;
  boxes: Position[];
  steps: number;
}
```

---

### SaveData（存档数据）

**是什么**：本地存储的游戏进度数据。

**属性**：
| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| currentLevel | number | ✅ | 当前关卡编号 |
| unlockedLevels | number[] | ✅ | 已解锁关卡列表 |
| bestSteps | Record<number, number> | ✅ | 每关最少步数（key=关卡 id, value=步数） |

**默认值**：
```typescript
const DEFAULT_SAVE_DATA: SaveData = {
  currentLevel: 1,
  unlockedLevels: [1],
  bestSteps: {},
};
```

**TypeScript 定义**：
```typescript
interface SaveData {
  currentLevel: number;
  unlockedLevels: number[];
  bestSteps: Record<number, number>;
}
```

---

## 实体关系图

```text
Level (1) ─────> (N) Position (targets)
  │
  └──> GameState (1) ─────> (1) Position (playerPosition)
            │
            ├──> (N) Position (boxes)
            │
            └──> (N) GameSnapshot (history stack)
                      │
                      └──> (1) Position (playerPosition)
                           └──> (N) Position (boxes)

SaveData (1) ─────> (N) number (unlockedLevels)
           └──> Record<number, number> (bestSteps)
```

**说明**：
- `Level` 是静态配置，定义关卡地图
- `GameState` 是运行时状态，包含玩家操作产生的数据
- `GameSnapshot` 是状态快照，用于撤销功能
- `SaveData` 是持久化数据，存储在 localStorage

---

## 验证规则总结

| 实体 | 验证规则 |
|------|----------|
| Position | 坐标非负且在地图范围内 |
| Level | 地图行列一致，目标点数 = 箱子数，有且仅有 1 个角色 |
| GameState | 箱子数 = 目标点数，所有位置合法 |
| GameSnapshot | 位置数据非空 |
| SaveData | currentLevel 在 unlockedLevels 中 |

---

## 类型定义汇总文件

**文件路径**：`src/types/game.ts`

```typescript
export interface Position {
  x: number;
  y: number;
}

export enum CellType {
  Wall = 'wall',
  Empty = 'empty',
  Target = 'target',
  Box = 'box',
  BoxOnTarget = 'box-on-target',
  Player = 'player',
  PlayerOnTarget = 'player-on-target',
}

export enum Direction {
  Up = 'up',
  Down = 'down',
  Left = 'left',
  Right = 'right',
}

export interface Level {
  id: number;
  name?: string;
  map: string[];
  width: number;
  height: number;
  targetCount: number;
}

export interface GameState {
  level: Level;
  playerPosition: Position;
  boxes: Position[];
  targets: Position[];
  steps: number;
  isWin: boolean;
}

export interface GameSnapshot {
  playerPosition: Position;
  boxes: Position[];
  steps: number;
}

export interface SaveData {
  currentLevel: number;
  unlockedLevels: number[];
  bestSteps: Record<number, number>;
}
```
