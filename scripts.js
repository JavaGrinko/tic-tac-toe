window.onload = init;
const field = [[],[],[]];
const size = 3;
const crossHTML = "<h2>X</h2>";
const zeroHTML = "<h2>O</h2>";
let canvas;
let table;

function init() {
    console.log('Скрипты подключены');
    const lineThrough = document.getElementById("line-through");
    table = document.getElementsByClassName("field")[0];
    lineThrough.width = table.clientWidth;
    lineThrough.height = table.clientHeight;
    canvas = lineThrough.getContext("2d");
    canvas.lineWidth = 15;
    canvas.strokeStyle = '#ff0000';
    let rows = document.getElementsByTagName("tr");
    for (let i = 0; i < size; i++) {
        let cells = rows[i].children;
        for (let j = 0; j < size; j++) {
            field[i][j] = cells[j];
            cells[j].onclick = () => click(i, j);
        }
    }
}

function drawLine(x0, y0, x1, y1) {
    canvas.beginPath();
    canvas.moveTo(x0, y0);
    canvas.lineTo(x1, y1);
    canvas.stroke();
}

function click(i, j) {
    console.log(checkWin());
    if (checkWin()) return;
    if (isEmpty(i, j)) {
        field[i][j].innerHTML = crossHTML;
        if (!checkWin()) {
            robotTurn();
        }
        checkWin();
    }
}

function isCross(text) {
    return text.includes(crossHTML);
}

function isZero(text) {
    return text.includes(zeroHTML);
}

function checkWin() {
    for (let i = 0; i < size; i++) {
        if (isCross(field[i][0].innerHTML) && isCross(field[i][1].innerHTML) && isCross(field[i][2].innerHTML)) {
            horizontalLineThrough(i);
            crossWin();
            return "X";
        }
        if (isZero(field[i][0].innerHTML) && isZero(field[i][1].innerHTML) && isZero(field[i][2].innerHTML)) {
            horizontalLineThrough(i);
            zeroWin();
            return "O";
        }
        if (isCross(field[0][i].innerHTML) && isCross(field[1][i].innerHTML) && isCross(field[2][i].innerHTML)) {
            verticalLineThrough(i);
            crossWin();
            return "X";
        }
        if (isZero(field[0][i].innerHTML) && isZero(field[1][i].innerHTML) && isZero(field[2][i].innerHTML)) {
            verticalLineThrough(i);
            zeroWin();
            return "O";
        }
    }
    if (isCross(field[0][0].innerHTML) && isCross(field[1][1].innerHTML) && isCross(field[2][2].innerHTML)) {
        ltrbLineThrough();
        crossWin();
        return "X";
    }
    if (isZero(field[0][0].innerHTML) && isZero(field[1][1].innerHTML) && isZero(field[2][2].innerHTML)) {
        ltrbLineThrough();
        zeroWin();
        return "O";
    }
    if (isCross(field[0][2].innerHTML) && isCross(field[1][1].innerHTML) && isCross(field[2][0].innerHTML)) {
        lbrtLineThrough();
        crossWin();
        return "X";
    }
    if (isZero(field[0][2].innerHTML) && isZero(field[1][1].innerHTML) && isZero(field[2][0].innerHTML)) {
        lbrtLineThrough();
        zeroWin();
        return "O";
    }
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (field[i][j].innerHTML === "") {
                return;
            }
        }
    }
    draw();
    return "-";
}

function ltrbLineThrough() {
    drawLine(0, 0, table.clientWidth, table.clientHeight);
}

function lbrtLineThrough() {
    drawLine(table.clientWidth, 0, 0, table.clientHeight);
}

function horizontalLineThrough(number) {
    let tableRowHeight = table.clientHeight / 3;
    let y = tableRowHeight * number + tableRowHeight / 2;
    drawLine(0, y, table.clientWidth, y);
}

function verticalLineThrough(number) {
    let tableColumnHeight = table.clientWidth / 3;
    let x = tableColumnHeight * number + tableColumnHeight / 2;
    drawLine(x, 0, x, table.clientHeight);
}

function draw() {
    table.style["opacity"] = 0.5;
    console.log("ничья");
}

function zeroWin() {
    table.style["opacity"] = 0.5;
    console.log("нолики победили");
}

function crossWin() {
    table.style["opacity"] = 0.5;
    console.log("крестики победили");
}

function robotTurn() {
    let i;
    let j;
    while (!isEmpty(i, j)) {
        i = Math.round(Math.random() * (size - 1));
        j = Math.round(Math.random() * (size - 1));
        console.log('i', i, 'j', j);
    }
    return field[i][j].innerHTML = zeroHTML;
}

function isEmpty(i, j) {
    if (i === undefined || j === undefined) return false; // если нет i или j, то false
    return field[i][j].innerHTML === "";
}