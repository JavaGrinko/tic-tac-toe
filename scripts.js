window.onload = init;
const field = [[],[],[]];

function init() {
    console.log('Скрипты подключены');
    let rows = document.getElementsByTagName("tr");
    for (let i = 0; i < rows.length; i++) {
        let cells = rows[i].children;
        for (let j = 0; j < cells.length; j++) {
            field[i][j] = cells[j];
            cells[j].onclick = () => click(i, j);
        }
    }
}

function click(i, j) {
    if (Math.random() > 0.5) {
        field[i][j].innerHTML = "<h2>X</h2>";
    } else {
        field[i][j].innerHTML = "<h2>O</h2>";
    }
}