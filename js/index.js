const startBtn = document.getElementById("start-btn")
const restartBtn = document.getElementById("restart-btn")
const stopBtn = document.getElementById("stop-btn")
const displayScore = document.getElementById("display-score")
const grid = document.getElementById("grid")
const width = 10
let squares = []
let currentSnake = [6,5,4,3,2,1,0]
let direction = 1
let interval = 0
let appleLocation
let score = 0

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

function startGame() {
    generateApple()
    interval = setInterval(move, 1000)
}

function restartGame() {
    currentSnake.forEach (index => squares[index].classList.remove("snake"))
    currentSnake = [6,5,4,3,2,1,0]
    direction = 1
    currentSnake.forEach (index => squares[index].classList.add("snake"))
    score = 0
    displayScore.textContent = score
}

function stopGame() {
    clearInterval(interval)
    console.log("You lost!")
}

//movement, growth and endings
function move() {
    //endings
    if ((currentSnake[0] % 10 === 9 && direction === 1) ||
        (currentSnake[0] + direction >= 100) ||
        (currentSnake[0] % 10 === 0 && direction === -1) ||
        (currentSnake[0] + direction < 0) ||
        squares[currentSnake[0] + direction].classList.contains("snake")) 
        return stopGame()

    //movement
    const tail = currentSnake.pop()
    squares[tail].classList.remove("snake")
    currentSnake.unshift(currentSnake[0] + direction)
    squares[currentSnake[0]].classList.add("snake")

    //growth
    if (squares[currentSnake[0]].classList.contains("apple")) {
        squares[currentSnake[0]].classList.remove("apple")
        currentSnake.push(tail)
        squares[tail].classList.add("snake")
        generateApple()
        score += 1
        displayScore.textContent = score
    }
}

//constrols
function control(e) {
    if (e.keyCode === 39 || e.key === "ArrowRight") {
        direction = 1
    } else if (e.keyCode === 40 || e.key === "ArrowDown") {
        direction = 10
    } else if (e.keyCode === 37 || e.key === "ArrowLeft") {
        direction = -1
    } else if (e.keyCode === 38 || e.key === "ArrowUp") {
        direction = -10
    }
}

//apples
function generateApple() {
    do {
        appleLocation = Math.floor(Math.random()*100)
    } while (squares[appleLocation].classList.contains("snake"))
    squares[appleLocation].classList.add("apple")
}

//listeners
document.addEventListener("keyup", control)
startBtn.addEventListener("click", startGame)
restartBtn.addEventListener("click", restartGame)
stopBtn.addEventListener("click", stopGame)
