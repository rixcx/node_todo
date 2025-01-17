// モジュールインポート
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();

// jsonのパス
const filePath = './todolist.json';

// タスクをJSONファイルから読み込む
const loadTodos = () => {
  try {
    const todos = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(todos);
  } catch (err) {
    return [];
  }
};

// タスクをJSONファイルに保存する
const saveTodos = (todos) => {
  // 書き込み先と書き込み内容stringify(値、抽出キー、インデント)
  fs.writeFileSync(filePath, JSON.stringify(todos, null, 2));
};

// ミドルウェア
app.use(cors());
app.use(express.json());

// エンドポイント
// GET todo一覧表示
app.get('/todos', (req, res) => {
  const dbTodos = loadTodos();
  res.json(dbTodos);
});

// POST todo追加
app.post('/todos', (req, res) => {
  const dbTodos = loadTodos();
  
  const { categoryId, todos } = req.body;

  // ResponseのcategoryIdに一致するカテゴリを取得
  const category = dbTodos.find((item) => item.categoryId === Number(categoryId));
  if (!category) {
    return res.status(404).json({ error: "Category not found" });
  }
  const todo = todos.todo;
  if (!todo) {
    return res.status(400).json({ error: 'Task content is required' });
  }
  
  const newTodo = {
    id: Date.now(),
    todo: todo
  };
  category.todos.push(newTodo);

  saveTodos(dbTodos);
  res.status(201).json({ message: 'Task added', todo: newTodo });
});

// DELETE todo削除
app.delete('/todos/:index', (req, res) => {
  const todos = loadTodos();
  const index = parseInt(req.params.index, 10);
  if (index >= 0 && index < todos.length) {
    const deletedTodo = todos.splice(index, 1); //spliteしたものを代入
    saveTodos(todos); //spliteされた結果でセーブ
     res.json({ message: 'Task deleted', todo: deletedTodo });
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
});

// サーバーを起動
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});