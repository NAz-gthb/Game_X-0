let area = document.querySelector('.game__area')
let game_item = document.getElementsByClassName('game__item')
let currentPlayer = document.getElementById('currentValue')
const btn = document.querySelector('.btn')

let player = "x"
let stat = {
    'x': 0,
    'o': 0,
    'd': 0
}
let winCombinate = [
    [1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10],
    [11, 12, 13, 14, 15],
    [16, 17, 18, 19, 20],
    [21, 22, 23, 24, 25],
    [1, 6, 11, 16, 21],
    [2, 7, 12, 17, 22],
    [3, 8, 13, 18, 23],
    [4, 9, 14, 19, 24],
    [5, 10, 15, 20, 25],
    [5, 9, 13, 17, 21],
    [11, 12, 13, 14, 15],
    [1, 7, 13, 19, 25],
];

for(let i = 1; i <= 25; i++) {
    area.innerHTML += "<div class='game__item' index=" + i + "></div>"
}

for (let s = 0; s < game_item.length; s++) {
    game_item[s].addEventListener('click', cellClick, false)
}

function cellClick() {
    let arr = [];
    
    if(!this.innerHTML) {
        this.innerHTML = player
    }else {
        alert("Ячейка занята")
        return;
    }

    for(let v in game_item){
        if(game_item[v].innerHTML == player){
            arr.push(parseInt(game_item[v].getAttribute('index')))
        }
    }

    if(checkForWin(arr)) {
        stat[player] += 1
        restart("Выграл: " + player)
    }else {
        let draw = true
        for(let e in game_item) {
            if(game_item[e].innerHTML == '') draw = false
        }
        if(draw) {
            stat.d += 1
            restart("Ничья")
        }
    }

    player = player == "x" ? "o" : "x"
    currentPlayer.innerHTML = player.toUpperCase()
}

function checkForWin(arr) {
    for(let q in winCombinate) {
        let win = true
        for(let j in winCombinate[q]) {
            let id = winCombinate[q][j]
            let index = arr.indexOf(id)

            if(index == -1) {
                win = false
            }
        }

        if(win) return true
    }
    return false;
}

const restart = (text) => {
    alert(text)
    for(let w = 0; w < game_item.length; w++) {
        game_item[w].innerHTML = ''
    }
    updateStat();
}

const res = () => {
    for(let w = 0; w < game_item.length; w++) {
        game_item[w].innerHTML = ''
    }
}

const updateStat = () => {
    document.getElementById('X').innerHTML = stat.x
    document.getElementById('O').innerHTML = stat.o
    document.getElementById('D').innerHTML = stat.d
}
btn.addEventListener('click', res)