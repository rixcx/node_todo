const API_URL = import.meta.env.VITE_API_URL;


// TodoのFETCH
export async function fetchTodos() {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch todos");
  }
  const result = await response.json();
  return result;
}


// TodoのPOST
export async function addTodo(categoryId, todoText) {
  if (!categoryId) {
    alert('category is required');
    return;
  }
  const todo = todoText.trim();
  if (!todo) {
    alert('content is required');
    return;
  }

  // 新しいTodoのデータを作成
  const newTodoData = {
    categoryId: categoryId,
    todos: {
      todo: todo,
    },
  };

  // POSTするAPI
   const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newTodoData)
  });
  if (!response.ok) {
    throw new Error('Failed to add');
  }

  const updatedResult = await fetchTodos(); // 最新のリストを取得
  return updatedResult;
}


// TodoのDELETE
export async function deleteTodo(categoryId, todoId) {
  const response = await fetch(`${API_URL}/${categoryId}/${todoId}`, {
    method: 'DELETE'
  });
  if (!response.ok) {
    throw new Error("Failed to delete todo");
  }
}
