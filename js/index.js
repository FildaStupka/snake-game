const startBtn = document.getElementById("start-btn")
const displayScore = document.getElementById("display-score")
const grid = document.getElementById("grid")
const width = 10
let squares = []
let currentSnake = [2,1,0]
let direction = 1

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

function move() {
    const tail = currentSnake.pop()
    squares[tail].classList.remove("snake")
    currentSnake.unshift(currentSnake[0] + direction)
    squares[currentSnake[0]].classList.add("snake")
}

let interval = setInterval(move, 1000)

//delete
startBtn.addEventListener("click", function() {clearInterval(interval)})
