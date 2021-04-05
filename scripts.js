window.onload = init;
const field = [[],[],[]];
const size = 3;
const crossHTML = "<h2>X</h2>";
const zeroHTML = "<h2>O</h2>";

function init() {
    console.log('Скрипты подключены');
    let rows = document.getElementsByTagName("tr");
    for (let i = 0; i < size; i++) {
        let cells = rows[i].children;
        for (let j = 0; j < size; j++) {
            field[i][j] = cells[j];
            cells[j].onclick = () => click(i, j);
        }
    }
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
            crossWin();
            return "X";
        }
        if (isZero(field[i][0].innerHTML) && isZero(field[i][1].innerHTML) && isZero(field[i][2].innerHTML)) {
            zeroWin();
            return "O";
        }
        if (isCross(field[0][i].innerHTML) && isCross(field[1][i].innerHTML) && isCross(field[2][i].innerHTML)) {
            crossWin();
            return "X";
        }
        if (isZero(field[0][i].innerHTML) && isZero(field[1][i].innerHTML) && isZero(field[2][i].innerHTML)) {
            zeroWin();
            return "O";
        }
    }
    if (isCross(field[0][0].innerHTML) && isCross(field[1][1].innerHTML) && isCross(field[2][2].innerHTML)) {
        crossWin();
        return "X";
    }
    if (isZero(field[0][0].innerHTML) && isZero(field[1][1].innerHTML) && isZero(field[2][2].innerHTML)) {
        zeroWin();
        return "O";
    }
    if (isCross(field[0][2].innerHTML) && isCross(field[1][1].innerHTML) && isCross(field[2][0].innerHTML)) {
        crossWin();
        return "X";
    }
    if (isZero(field[0][2].innerHTML) && isZero(field[1][1].innerHTML) && isZero(field[2][0].innerHTML)) {
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

function draw() {
    document.getElementsByClassName("field")[0].style["opacity"] = 0.5;
    console.log("ничья");
}

function zeroWin() {
    document.getElementsByClassName("field")[0].style["opacity"] = 0.5;
    console.log("нолики победили");
}

function crossWin() {
    document.getElementsByClassName("field")[0].style["opacity"] = 0.5;
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