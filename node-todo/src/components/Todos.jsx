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

// TodoのDELETE
async function deleteTodo(categoryId, todoId, setTodos) {
  const response = await fetch(`${API_URL}/${categoryId}/${todoId}`, {
    method: 'DELETE'
  });
  if (!response.ok) {
    throw new Error(`Failed to delete todo: ${response.status} ${response.statusText}`);
  }

// 状態を更新する処理 fetchTodos()だと再度API通信が必要になるため、見た目だけ変える
  setTodos((previousTodos) => { //useStateによって管理されている現在の状態
    // 対象のカテゴリを探す
    const updatedTodos = previousTodos.map((category) => {
      // カテゴリが一致する場合
      if (category.categoryId === categoryId) {
        // 該当カテゴリ内の todos をフィルタリングして削除対象を除外したリストを作成
        const filteredTodos = category.todos.filter((todo) => todo.id !== todoId);
        // フィルタリングされた todos を新しいtodoリストとして返す
        return {
          ...category, // もとのカテゴリデータを保持
          todos: filteredTodos, // 更新された todos を設定
        };
      }

      // カテゴリが一致しない場合はそのまま返す
      return category;
    });

    // 4. 更新後の全カテゴリを返して状態を更新
    return updatedTodos;
  });
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
                <li key={todo.id}>
                  {todo.todo}
                  <button onClick={() => deleteTodo(todos.categoryId, todo.id, setTodos)}>削除</button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}
