# GameEngine 接口契约

**模块**：`src/core/GameEngine.ts`  
**职责**：游戏核心逻辑（移动规则、碰撞检测、通关判定）

## 公共接口

### `move(state: GameState, direction: Direction): GameState`

**是什么**：处理角色移动或推箱子操作。

**输入**：
- `state: GameState` - 当前游戏状态
- `direction: Direction` - 移动方向（上/下/左/右）

**输出**：
- `GameState` - 新的游戏状态（如移动无效则返回原状态）

**行为规则**：
1. 计算目标位置 = 当前角色位置 + 方向向量
2. 检查目标位置类型：
   - **墙壁** → 返回原状态（移动无效）
   - **空地/目标点** → 更新角色位置，步数 +1
   - **箱子** → 检查箱子后方：
     - 箱子后方是空地/目标点 → 移动角色和箱子，步数 +1
     - 箱子后方是墙壁/箱子 → 返回原状态（移动无效）
3. 移动后调用 `checkWin()` 更新 `isWin` 状态

**示例**：
```typescript
const newState = GameEngine.move(currentState, Direction.Right);
// newState.playerPosition = { x: 2, y: 1 }
// newState.steps = currentState.steps + 1
```

**验收**：
- 合法移动后步数 +1
- 非法移动后状态不变
- 推箱子到目标点后 `isWin` 正确更新

---

### `checkWin(boxes: Position[], targets: Position[]): boolean`

**是什么**：检测是否通关（所有箱子都在目标点上）。

**输入**：
- `boxes: Position[]` - 当前所有箱子位置
- `targets: Position[]` - 所有目标点位置

**输出**：
- `boolean` - `true` 表示通关，`false` 表示未通关

**算法**：
```typescript
return targets.every(target => 
  boxes.some(box => box.x === target.x && box.y === target.y)
);
```

**性能要求**：<5ms（10 个箱子场景）

**示例**：
```typescript
const boxes = [{ x: 1, y: 1 }, { x: 2, y: 2 }];
const targets = [{ x: 1, y: 1 }, { x: 2, y: 2 }];
GameEngine.checkWin(boxes, targets); // true
```

---

### `getCellType(state: GameState, pos: Position): CellType`

**是什么**：查询指定位置的格子类型。

**输入**：
- `state: GameState` - 当前游戏状态
- `pos: Position` - 查询位置

**输出**：
- `CellType` - 格子类型（墙壁/空地/箱子/目标点/角色等）

**逻辑优先级**：
1. 检查是否是角色位置 → 返回 `Player` 或 `PlayerOnTarget`
2. 检查是否有箱子 → 返回 `Box` 或 `BoxOnTarget`
3. 检查地图原始类型 → 返回 `Wall`/`Empty`/`Target`

**示例**：
```typescript
const type = GameEngine.getCellType(state, { x: 1, y: 1 });
// type === CellType.Box
```

---

### `isValidPosition(state: GameState, pos: Position): boolean`

**是什么**：检查位置是否在地图范围内。

**输入**：
- `state: GameState` - 当前游戏状态
- `pos: Position` - 检查位置

**输出**：
- `boolean` - `true` 表示位置合法，`false` 表示越界

**算法**：
```typescript
return pos.x >= 0 && pos.x < state.level.width &&
       pos.y >= 0 && pos.y < state.level.height;
```

**示例**：
```typescript
GameEngine.isValidPosition(state, { x: -1, y: 0 }); // false
GameEngine.isValidPosition(state, { x: 2, y: 3 }); // true (假设地图够大)
```

---

## 错误处理

| 场景 | 行为 |
|------|------|
| 传入 `null` 或 `undefined` | 抛出 `Error("Invalid state")` |
| 方向向量无效 | 返回原状态（静默失败） |
| 位置越界 | 视为墙壁（移动无效） |

---

## 性能要求

| 操作 | 时间复杂度 | 目标耗时 |
|------|-----------|----------|
| `move()` | O(n)，n = 箱子数 | <10ms |
| `checkWin()` | O(n*m)，n = 箱子数，m = 目标点数 | <5ms |
| `getCellType()` | O(n)，n = 箱子数 | <1ms |
| `isValidPosition()` | O(1) | <0.1ms |

---

## 依赖

- `types/game.ts` - `GameState`, `Direction`, `Position`, `CellType`
- 无外部库依赖

---

## 测试用例要求

### 移动测试
- ✅ 向空地移动成功
- ✅ 向墙壁移动失败
- ✅ 推箱子到空地成功
- ✅ 推箱子到墙壁失败
- ✅ 推箱子到另一箱子失败
- ✅ 步数正确递增

### 通关测试
- ✅ 所有箱子在目标点上返回 `true`
- ✅ 部分箱子在目标点上返回 `false`
- ✅ 无箱子在目标点上返回 `false`

### 边界测试
- ✅ 地图边缘移动处理正确
- ✅ 越界位置视为墙壁
