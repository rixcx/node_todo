// モジュールインポート
const fs = require('fs');
const readline = require('readline');

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

// コマンドラインインターフェイスを設定
const rl = readline.createInterface({
  input: process.stdin,   // 入力受取
  output: process.stdout, // 入力出力
});

// コマンドラインインターフェイス
const menu = `
--- ToDoアプリ ---
1. タスクを表示
2. タスクを追加
3. タスクを削除
0. 終了
番号を選んでください: `;

// タスクを表示するコマンド
const displayTasks = () => {
  const todos = loadTodos();
  if (todos.length === 0) {
    console.log('現在タスクはありません。');
  } else {
    console.log('「1. タスクを表示」が選択されました。タスクを表示します。');
    console.log('--- 現在のタスク ---');
    todos.forEach((todo, index) => {
      console.log(`${index + 1}: ${todo}`);
    });
  }
  showMenu();
};

// タスクを追加する
const addTask = () => {
  console.log('「2. タスクを追加」が選択されました。');
  rl.question('追加するタスクを入力してください: ', (todo) => {
    if (todo.trim() === '') { //空白だったら
      console.log('無効なタスクです。');
    } else {
      const todos = loadTodos();
      newTodos = [...todos, todo]
      // todos.push(todo);
      saveTasks(newTodos);
      console.log(`タスク「${todo}」を追加しました。`);
    }
    showMenu();
  });
};

// タスクをJSONファイルに保存する
const saveTasks = (todos) => {
  // 書き込み先と書き込み内容(値、抽出キー、インデント)
  fs.writeFileSync(filePath, JSON.stringify(todos, null, 2));
};

// タスクを削除する
const deleteTask = () => {
  const todos = loadTodos();
  if (todos.length === 0) {
    console.log('削除するタスクがありません。');
    return showMenu();
  } else {
    console.log('「3. タスクを削除」が選択されました。');
    console.log('--- 現在のタスク ---');
    todos.forEach((todo, index) => {
      console.log(`${index + 1}: ${todo}`);
    });
  }
  rl.question('削除するタスクの番号を入力してください: ', (num) => {
    // numは入力値 index参照用に値を調整
    const index = parseInt(num) - 1;
    // number型でない、0より小さい、長さより短い場合
    if (isNaN(index) || index < 0 || index >= todos.length) {
      console.log('無効な番号です。');
    } else {
      // 配列操作 splice(対象のindex番号、取り出す個数)
      // 取り出した要素がdeletedTodo、配列操作されたのがtodos
      const deletedTodo = todos.splice(index, 1);
      saveTasks(todos);
      console.log(`タスク「${deletedTodo}」を削除しました。`);
    }
    showMenu();
  });
};

// メニュー表示
const showMenu = () => {
  rl.question(menu, (choice) => { // 表示内容,選択項目
    switch (choice) {
      case '1':
        displayTasks();
        break;
      case '2':
        addTask();
        break;
      case '3':
        deleteTask();
        break;
      case '0':
        console.log('アプリを終了します。');
        rl.close();
        break;
      default:
        console.log('無効な選択です。もう一度選んでください。');
        showMenu();
    }
  });
};

// アプリを起動
showMenu();