// HTMLの要素をJavaScriptで使えるように取得するよ
const taskNameInput = document.getElementById('taskName'); // タスク入力欄
const addTaskButton = document.getElementById('addTaskButton'); // タスク追加ボタン
const taskList = document.getElementById('taskList'); // タスクを表示するリスト

// タスク追加ボタンが押された時の処理
addTaskButton.addEventListener('click', () => {
    const taskText = taskNameInput.value; // 入力欄に入力された文字を取得するよ

    // もし何も入力されていなかったら、何もしないで処理を終わるよ
    if (taskText.trim() === '') {
        return;
    }

    // 新しいタスクの項目（<li>要素）を作るよ
    const listItem = document.createElement('li');
    listItem.textContent = taskText; // リスト項目にタスクの文字を入れるよ

    // 削除ボタンを作るよ
    const deleteButton = document.createElement('button');
    deleteButton.textContent = '削除';
    deleteButton.classList.add('delete-button'); // CSSで使うクラスを追加するよ

    // 削除ボタンが押された時の処理
    deleteButton.addEventListener('click', () => {
        taskList.removeChild(listItem); // 親要素（taskList）からこのタスクの項目を削除するよ
        saveTasks(); // 削除したら、タスクを保存し直すよ
    });

    listItem.appendChild(deleteButton); // 削除ボタンをタスクの項目に追加するよ
    taskList.appendChild(listItem); // 作ったタスクの項目をタスクリストに追加するよ

    taskNameInput.value = ''; // 入力欄を空にするよ
    saveTasks(); // 新しいタスクを追加したら、タスクを保存するよ
});

// タスクを保存する関数（ブラウザに記憶させる）
function saveTasks() {
    const tasks = [];
    taskList.querySelectorAll('li').forEach(item => {
        // 削除ボタン以外のテキストだけを取得
        let textContent = item.textContent;
        const deleteButtonText = '削除';
        if (textContent.endsWith(deleteButtonText)) {
            textContent = textContent.slice(0, -deleteButtonText.length);
        }
        tasks.push(textContent.trim());
    });
    // JSON形式に変換してlocalStorageに保存
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// ページが読み込まれた時に保存されているタスクを読み込む
function loadTasks() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        const tasks = JSON.parse(savedTasks); // JSON形式の文字列をJavaScriptの配列に戻す
        tasks.forEach(taskText => {
            const listItem = document.createElement('li');
            listItem.textContent = taskText;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = '削除';
            deleteButton.classList.add('delete-button');

            deleteButton.addEventListener('click', () => {
                taskList.removeChild(listItem);
                saveTasks();
            });

            listItem.appendChild(deleteButton);
            taskList.appendChild(listItem);
        });
    }
}

// ページが完全に読み込まれたらタスクを読み込む
document.addEventListener('DOMContentLoaded', loadTasks);
