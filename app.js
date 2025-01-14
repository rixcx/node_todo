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
番号を選んでください 今は1か0しか選べません: `;

// メニュー表示
const showMenu = () => {
  rl.question(menu, (choice) => { //第一引数：表示内容 第二引数:返り値
    switch (choice) {
      case '1':
        console.log('1を選んだんですね!良い選択です。');
        showMenu();
        // displayTasks();
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