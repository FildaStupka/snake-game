const startBtn = document.getElementById("start-btn")
const displayScore = document.getElementById("display-score")
const grid = document.getElementById("grid")
const width = 10
let squares = []
let currentSnake = [2,1,0]

function createGrid() {
    for (let i = 0; i < width*width; i++) {
        const square = document.createElement("div")
        square.classList.add("square")
        grid.appendChild(square)
        squares.push(square)
    }
}
createGrid()

currentSnake.forEach (index => squares[index].classList.add("snake"))