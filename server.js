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
// GET 一覧表示
app.get('/todos', (req, res) => {
  const todos = loadTodos();
  res.json(todos);
});

// POST todo追加
app.post('/todos', (req, res) => {
  const todos = loadTodos();
  const newTodo = req.body.todo; // キー名 'todo' を使って値を取得
  if (!newTodo) {
    return res.status(400).json({ error: 'Task content is required' });
  }
  todos.push(newTodo);
  saveTodos(todos);
  res.status(201).json({ message: 'Task added', todo: newTodo });
});


// サーバーを起動
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});