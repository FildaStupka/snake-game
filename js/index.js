const startBtn = document.getElementById("start-btn")
const restartBtn = document.getElementById("restart-btn")
const stopBtn = document.getElementById("stop-btn")
const displayScore = document.getElementById("display-score")
const displayHighscore = document.getElementById("display-highscore")
const gameOverContainer = document.getElementById("game-over-container")
const grid = document.getElementById("grid")
const width = 10
const speedup = .9
let squares = []
let currentSnake = [2,1,0]
let direction = 1
let interval = 0
let appleLocation
let score = 0
let intervalTime = 1000
let highscore = 0

displayScore.textContent = score
displayHighscore.textContent = highscore

//console.log(gameOverContainer)


function createGrid() {
    for (let i = 0; i < width*width; i++) {
        const square = document.createElement("div")
        square.classList.add("square")
        grid.appendChild(square)
        squares.push(square)
    }
}
createGrid()

//start, restart, stop
function startGame() {
    generateApple()
    interval = setInterval(move, intervalTime)
    startBtn.style.display = "none"
    currentSnake.forEach (index => squares[index].classList.add("snake"))
}

function restartGame() {
    currentSnake.forEach (index => squares[index].classList.remove("snake"))
    currentSnake = [2,1,0]
    direction = 1
    score = 0
    displayScore.textContent = score
    squares[appleLocation].classList.remove("apple")
}

function gameOver() {
    clearInterval(interval)
    
    gameOverContainer.style.display = "block"
    
    console.log("Game over!")
}

//movement, growth and endings
function move() {
    //endings
    if ((currentSnake[0] % width === 9 && direction === 1) ||
        (currentSnake[0] + direction >= 100) ||
        (currentSnake[0] % width === 0 && direction === -1) ||
        (currentSnake[0] + direction < 0) ||
        squares[currentSnake[0] + direction].classList.contains("snake")) 
        return gameOver()

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
        score++
        displayScore.textContent = score

        if (score>highscore) {
            highscore = score
            displayHighscore.textContent = highscore
        }

        clearInterval(interval)
        intervalTime *= speedup
        interval = setInterval(move, intervalTime)
    }
}

//constrols
function control(e) {
    if (e.keyCode === 39 || e.key === "ArrowRight") {
        direction = 1
    } else if (e.keyCode === 40 || e.key === "ArrowDown") {
        direction = width
    } else if (e.keyCode === 37 || e.key === "ArrowLeft") {
        direction = -1
    } else if (e.keyCode === 38 || e.key === "ArrowUp") {
        direction = -width
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
