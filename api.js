const URL = 'http://localhost:3000';
const API_URL = `${URL}/todos`;

// Todoのfetch
async function fetchTodos() {
  const response = await fetch(API_URL); //※取得できなかった場合のエラー追加
  const todos = await response.json();
  
  const todoList = document.getElementById('js-todolists');
  todos.forEach(todo => {
    const liItem = document.createElement('li');
    liItem.textContent = todo;
    todoList.appendChild(liItem);
  });
}

// ロード後発火
window.onload = fetchTodos;