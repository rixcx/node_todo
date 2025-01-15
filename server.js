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
app.get('/todos', (req, res) => {
  const todos = loadTodos();
  res.json(todos);
});

// サーバーを起動
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});