import React, { useState, useEffect } from "react";

const URL = 'http://localhost:3000';
const API_URL = `${URL}/todos`; //HACK: envに移すべき？

// Todoのfetch
async function fetchTodos() {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch todos");
  }
  const result = await response.json();
  return result;
}

export const Todos = () => {
  const [todos, setTodos] = useState([]); // todos の状態管理

  useEffect(() => {
    const loadTodos = async () => {
      const data = await fetchTodos(); // 非同期データ取得
      setTodos(data); // 状態を更新
    };
    loadTodos(); // 初回読み込み時に読込関数発火
  }, []); //todosに変化があったら再度読み込み？

  return (
    <>
      <div>
        {todos.map((todos) => (
          <div key={todos.categoryId}>{todos.title}
            <ul>
              {todos.todos.map((todo) => (
                <li key={todo.id}>{todo.todo}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}
