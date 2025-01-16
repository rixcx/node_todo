const URL = 'http://localhost:3000';
const API_URL = `${URL}/todos`; //HACK: envに移すべき？

// Todoのfetch
async function fetchTodos() {
  const response = await fetch(API_URL); //TODO:取得できなかった場合のエラー
  const todos = await response.json();
  
  const todoList = document.getElementById('js-todolists');
  todos.forEach((todo, index) => {
    const liItem = document.createElement('li');
    const innerItem = `${todo} <button onclick="deleteTodo(${index})">削除</button>`
    liItem.innerHTML = innerItem;
    todoList.appendChild(liItem);
  });
}

// Todo post
async function addTodo() {
  const todoInput = document.getElementById('js-newtodo');
  const newTodo = todoInput.value.trim();
  console.log(newTodo);
  
  if (!newTodo) {
    alert('content is required');
    return;
  }
  
  // POSTするAPI
  await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }, //jsonで送ることを宣言
    body: JSON.stringify({ todo: newTodo }) //送れるのは文字列だけなので、文字列にする
  });
  todoInput.value = '';
}
// クリック後発火
document.getElementById('js-addtodo').addEventListener('click', addTodo);

async function deleteTodo(index) {
  await fetch(`${API_URL}/${index}`, {
    method: 'DELETE'
  });
}

// ロード後発火
window.onload = fetchTodos;