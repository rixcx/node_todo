const URL = 'http://localhost:3000';
const API_URL = `${URL}/todos`; //HACK: envに移すべき？

// Todoのfetch
async function fetchTodos() {
  const response = await fetch(API_URL); //TODO:取得できなかった場合のエラー
  const result = await response.json();
  
  // todoリストの表示
  const todoListSection = document.getElementById('js-todolists');
  
  // カテゴリごとに回す
  result.forEach((category) => {
    // カテゴリごとにdivタグを作成
    const categoryItem = document.createElement('div');
    categoryItem.textContent = category.title;
    
    // カテゴリ内にulを生成
    const todoList = document.createElement('ul');
    // カテゴリ内のTodoごとに回してliタグ生成
    category.todos.forEach((todo, index) => {
      const todoItem = document.createElement('li');
      const innerItem = `${todo.todo} <button onclick="deleteTodo(${index})">削除</button>`
      todoItem.innerHTML = innerItem;
      
      // ulに生成したliを追加
      todoList.appendChild(todoItem);
    });
  
    // ulをカテゴリのdivに追加
    categoryItem.appendChild(todoList);
    
    // カテゴリのdivをセクションのdivに追加
    todoListSection.appendChild(categoryItem);
  });

  // カテゴリセレクトボックスの表示
  const CategorySelectSection = document.getElementById('js-category');
  const selectList = document.createElement('select');
  selectList.name = "categories";
  selectList.id = "js-selectcategory";
  
  const firstOptionItem = document.createElement('option');
  firstOptionItem.value = "";
  firstOptionItem.textContent = "--Choose an option--";
  selectList.appendChild(firstOptionItem);
  
  result.forEach((category) => {
    const optionItem = document.createElement('option');
    optionItem.value = category.categoryId;
    optionItem.textContent = category.title;
    selectList.appendChild(optionItem);
  });
  
  CategorySelectSection.appendChild(selectList);
}

// TodoのPOST
async function addTodo() {
  // セレクトボックスの値取得
  const categorySelected = document.getElementById('js-selectcategory');
  const categoryId = categorySelected.value;
  if (!categoryId) {
    alert('category is required');
    return;
  }

  // Todoの内容取得
  const todoInput = document.getElementById('js-newtodo');
  const todo = todoInput.value.trim();
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
  await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newTodoData)
  });
  todoInput.value = '';
  categorySelected.value = '';
}
// クリック後発火
document.getElementById('js-addtodo').addEventListener('click', addTodo);


// TodoのDELETE
async function deleteTodo(index) {
  await fetch(`${API_URL}/${index}`, {
    method: 'DELETE'
  });
}

// ロード後発火
window.addEventListener('load', function() {
  fetchTodos();  
})