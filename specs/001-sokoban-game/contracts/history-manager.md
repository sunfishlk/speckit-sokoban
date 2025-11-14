# HistoryManager 接口契约

**模块**：`src/core/HistoryManager.ts`  
**职责**：管理操作历史，支持撤销功能

## 公共接口

### `push(snapshot: GameSnapshot): void`

**是什么**：保存当前游戏状态快照到历史栈。

**输入**：
- `snapshot: GameSnapshot` - 包含角色位置、箱子位置、步数的快照

**行为**：
1. 将快照推入历史栈顶
2. 如历史栈大小超过 100，移除最旧快照（栈底）

**示例**：
```typescript
const snapshot = {
  playerPosition: { x: 1, y: 1 },
  boxes: [{ x: 2, y: 2 }],
  steps: 5,
};
historyManager.push(snapshot);
```

**验收**：
- 快照成功保存
- 栈大小不超过 100

---

### `pop(): GameSnapshot | null`

**是什么**：从历史栈顶弹出上一步状态（撤销操作）。

**输出**：
- `GameSnapshot | null` - 上一步快照，如栈空则返回 `null`

**行为**：
1. 从历史栈顶弹出一个快照
2. 如栈空则返回 `null`（无法继续撤销）

**示例**：
```typescript
const previousState = historyManager.pop();
if (previousState) {
  // 恢复到上一步状态
  gameState.playerPosition = previousState.playerPosition;
  gameState.boxes = previousState.boxes;
  gameState.steps = previousState.steps;
}
```

**验收**：
- 成功返回上一步快照
- 栈空时返回 `null`
- 连续撤销到初始状态后再撤销返回 `null`

---

### `clear(): void`

**是什么**：清空历史栈（重新开始关卡时调用）。

**行为**：
1. 清空历史栈所有快照
2. 释放内存

**示例**：
```typescript
historyManager.clear(); // 历史栈清空
historyManager.pop();   // 返回 null
```

**验收**：
- 调用后 `canUndo()` 返回 `false`
- 内存占用降为 0

---

### `canUndo(): boolean`

**是什么**：检查是否可以撤销（历史栈非空）。

**输出**：
- `boolean` - `true` 表示可撤销，`false` 表示无法撤销

**算法**：
```typescript
return history.length > 0;
```

**示例**：
```typescript
if (historyManager.canUndo()) {
  const prevState = historyManager.pop();
  // 撤销操作
}
```

**验收**：
- 有历史时返回 `true`
- 无历史时返回 `false`

---

### `size(): number`

**是什么**：获取历史栈当前大小。

**输出**：
- `number` - 历史栈快照数量

**示例**：
```typescript
historyManager.push(snapshot1);
historyManager.push(snapshot2);
historyManager.size(); // 2
```

**验收**：
- 返回值等于实际快照数量

---

## 内部实现建议

### 数据结构
```typescript
class HistoryManager {
  private history: GameSnapshot[] = [];
  private readonly MAX_SIZE = 100;

  push(snapshot: GameSnapshot): void {
    this.history.push(snapshot);
    if (this.history.length > this.MAX_SIZE) {
      this.history.shift(); // 移除最旧快照
    }
  }

  pop(): GameSnapshot | null {
    return this.history.pop() || null;
  }

  clear(): void {
    this.history = [];
  }

  canUndo(): boolean {
    return this.history.length > 0;
  }

  size(): number {
    return this.history.length;
  }
}
```

---

## 性能要求

| 操作 | 时间复杂度 | 目标耗时 |
|------|-----------|----------|
| `push()` | O(1)（均摊）| <1ms |
| `pop()` | O(1) | <1ms |
| `clear()` | O(1) | <1ms |
| `canUndo()` | O(1) | <0.1ms |
| `size()` | O(1) | <0.1ms |

**内存限制**：
- 单个快照约 200 字节（10 个箱子场景）
- 100 个快照总内存 ≈ 20KB

---

## 使用场景

### 场景 1：玩家移动前保存状态
```typescript
// 移动前保存当前状态
historyManager.push({
  playerPosition: gameState.playerPosition,
  boxes: [...gameState.boxes], // 深拷贝
  steps: gameState.steps,
});

// 执行移动
const newState = GameEngine.move(gameState, Direction.Right);
```

### 场景 2：撤销操作
```typescript
function undo() {
  const prevState = historyManager.pop();
  if (prevState) {
    gameState.playerPosition = prevState.playerPosition;
    gameState.boxes = prevState.boxes;
    gameState.steps = prevState.steps;
    gameState.isWin = false; // 撤销后重新检查通关状态
  }
}
```

### 场景 3：重新开始关卡
```typescript
function restartLevel() {
  historyManager.clear();
  gameState = initGameState(currentLevel);
}
```

---

## 错误处理

| 场景 | 行为 |
|------|------|
| `push(null)` | 抛出 `Error("Invalid snapshot")` |
| `pop()` 空栈 | 返回 `null`（不抛异常） |
| 快照数据不完整 | 抛出 `Error("Incomplete snapshot")` |

---

## 测试用例要求

### 基础功能测试
- ✅ `push()` 成功保存快照
- ✅ `pop()` 成功恢复快照
- ✅ `clear()` 清空历史栈
- ✅ `canUndo()` 正确返回状态

### 边界测试
- ✅ 空栈 `pop()` 返回 `null`
- ✅ 超过 100 个快照自动移除最旧
- ✅ 深拷贝测试（修改原快照不影响历史栈）

### 性能测试
- ✅ 100 次 `push()` 总耗时 <10ms
- ✅ 100 次 `pop()` 总耗时 <10ms
