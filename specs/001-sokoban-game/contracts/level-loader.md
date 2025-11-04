# LevelLoader 接口契约

**模块**：`src/core/LevelLoader.ts`  
**职责**：解析关卡地图字符串，初始化游戏状态

## 公共接口

### `parseLevel(level: Level): GameState`

**是什么**：从关卡配置解析出初始游戏状态。

**输入**：
- `level: Level` - 关卡配置（包含地图字符串数组）

**输出**：
- `GameState` - 初始游戏状态（角色位置、箱子位置、目标点位置）

**解析规则**：
| 字符 | 含义 | 解析行为 |
|------|------|----------|
| `#` | 墙壁 | 标记为不可通行 |
| ` ` | 空地 | 可通行 |
| `.` | 目标点 | 记录到 `targets` 数组 |
| `$` | 箱子 | 记录到 `boxes` 数组 |
| `*` | 箱子在目标点上 | 同时记录到 `boxes` 和 `targets` |
| `@` | 角色 | 设置 `playerPosition` |
| `+` | 角色在目标点上 | 设置 `playerPosition` + 记录目标点 |

**算法流程**：
```typescript
1. 遍历地图每个格子 (x, y)
2. 根据字符类型：
   - '@' 或 '+' → 设置 playerPosition = {x, y}
   - '$' 或 '*' → 添加到 boxes 数组
   - '.' 或 '*' 或 '+' → 添加到 targets 数组
3. 验证：
   - 有且仅有 1 个角色
   - boxes.length === targets.length
4. 返回初始 GameState
```

**示例**：
```typescript
const level = {
  id: 1,
  map: [
    "####",
    "#@.#",
    "#$ #",
    "####"
  ],
  width: 4,
  height: 4,
  targetCount: 1,
};

const gameState = LevelLoader.parseLevel(level);
// gameState.playerPosition = { x: 1, y: 1 }
// gameState.boxes = [{ x: 1, y: 2 }]
// gameState.targets = [{ x: 2, y: 1 }]
// gameState.steps = 0
// gameState.isWin = false
```

**验收**：
- 所有实体位置正确解析
- 初始步数为 0
- 初始 `isWin` 为 `false`

---

### `validateLevel(level: Level): boolean`

**是什么**：验证关卡配置是否合法。

**输入**：
- `level: Level` - 待验证的关卡配置

**输出**：
- `boolean` - `true` 表示合法，`false` 表示不合法

**验证规则**：
1. 地图所有行长度相等（`map[i].length === width`）
2. 地图行数等于 `height`
3. 有且仅有 1 个角色（`@` 或 `+`）
4. 箱子数量等于目标点数量（`$` + `*` 数量 = `.` + `*` + `+` 数量）
5. 地图被墙壁包围（第一行/最后一行全是 `#`，第一列/最后一列全是 `#`）

**示例**：
```typescript
LevelLoader.validateLevel(validLevel);   // true
LevelLoader.validateLevel(invalidLevel); // false
```

**验收**：
- 合法关卡返回 `true`
- 不合法关卡返回 `false`（并打印错误原因到 console）

---

### `loadLevelById(id: number, levels: Level[]): Level | null`

**是什么**：根据关卡 ID 加载关卡配置。

**输入**：
- `id: number` - 关卡编号
- `levels: Level[]` - 所有关卡列表

**输出**：
- `Level | null` - 找到的关卡配置，未找到返回 `null`

**算法**：
```typescript
return levels.find(level => level.id === id) || null;
```

**示例**：
```typescript
const level = LevelLoader.loadLevelById(1, allLevels);
if (level) {
  const gameState = LevelLoader.parseLevel(level);
}
```

**验收**：
- 存在的 ID 返回对应关卡
- 不存在的 ID 返回 `null`

---

## 错误处理

| 场景 | 行为 |
|------|------|
| 地图格式错误（行长度不一致） | 抛出 `Error("Invalid map format")` |
| 无角色或多个角色 | 抛出 `Error("Invalid player count")` |
| 箱子数 ≠ 目标点数 | 抛出 `Error("Boxes and targets mismatch")` |
| 未知字符 | 忽略（视为空地） |
| 空地图（`map.length === 0`） | 抛出 `Error("Empty map")` |

---

## 性能要求

| 操作 | 时间复杂度 | 目标耗时 |
|------|-----------|----------|
| `parseLevel()` | O(w*h)，w = 宽度，h = 高度 | <50ms |
| `validateLevel()` | O(w*h) | <20ms |
| `loadLevelById()` | O(n)，n = 关卡数 | <1ms |

**场景**：20x20 地图，10 个关卡

---

## 使用场景

### 场景 1：加载并初始化关卡
```typescript
import { LEVELS } from '@/data/levels';

function startLevel(levelId: number) {
  const level = LevelLoader.loadLevelById(levelId, LEVELS);
  if (!level) {
    throw new Error(`Level ${levelId} not found`);
  }
  
  if (!LevelLoader.validateLevel(level)) {
    throw new Error(`Level ${levelId} is invalid`);
  }
  
  const gameState = LevelLoader.parseLevel(level);
  return gameState;
}
```

### 场景 2：预验证所有关卡
```typescript
function validateAllLevels(levels: Level[]) {
  const invalid = levels.filter(level => !LevelLoader.validateLevel(level));
  if (invalid.length > 0) {
    console.error('Invalid levels:', invalid.map(l => l.id));
  }
}
```

---

## 测试用例要求

### 解析测试
- ✅ 简单地图（4x4）正确解析
- ✅ 复杂地图（20x20，多箱子）正确解析
- ✅ 箱子在目标点上（`*`）正确解析为两个数组
- ✅ 角色在目标点上（`+`）正确解析

### 验证测试
- ✅ 合法关卡验证通过
- ✅ 无角色关卡验证失败
- ✅ 多角色关卡验证失败
- ✅ 箱子数 ≠ 目标点数验证失败
- ✅ 行长度不一致验证失败

### 边界测试
- ✅ 最小地图（3x3）正确处理
- ✅ 大地图（50x50）正确处理
- ✅ 空地图抛出异常
- ✅ 不存在的 ID 返回 `null`

---

## 依赖

- `types/game.ts` - `Level`, `GameState`, `Position`
- `data/levels.ts` - 关卡数据（可选，用于测试）
- 无外部库依赖
