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
  const tasks = loadTodos();
  if (tasks.length === 0) {
    console.log('現在タスクはありません。');
  } else {
    console.log('--- 現在のタスク ---');
    tasks.forEach((task, index) => {
      console.log(`${index + 1}: ${task}`);
    });
  }
  showMenu();
};

// タスクを追加する
const addTask = () => {
  rl.question('追加するタスクを入力してください: ', (task) => {
    if (task.trim() === '') {
      console.log('無効なタスクです。');
    } else {
      const tasks = loadTodos();
      tasks.push(task);
      saveTasks(tasks);
      console.log(`タスク「${task}」を追加しました。`);
    }
    showMenu();
  });
};

// タスクをJSONファイルに保存する
const saveTasks = (tasks) => {
  fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
};

// タスクを削除する
const deleteTask = () => {
  const tasks = loadTodos();
  if (tasks.length === 0) {
    console.log('削除するタスクがありません。');
    return showMenu();
  }

  displayTasks();
  rl.question('削除するタスクの番号を入力してください: ', (num) => {
    const index = parseInt(num) - 1;
    if (isNaN(index) || index < 0 || index >= tasks.length) {
      console.log('無効な番号です。');
    } else {
      const deletedTask = tasks.splice(index, 1);
      saveTasks(tasks);
      console.log(`タスク「${deletedTask}」を削除しました。`);
    }
    showMenu();
  });
};

// メニュー表示
const showMenu = () => {
  rl.question(menu, (choice) => { //第一引数：表示内容 第二引数:返り値
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