const pegs = document.querySelectorAll('.peg');
const messageElement = document.getElementById('message');
const startButton = document.getElementById('start-game');
const resetButton = document.getElementById('reset-game');
const undoButton = document.getElementById('undo');
const redoButton = document.getElementById('redo');
const plateCountInput = document.getElementById('plate-count');
const stepCountElement = document.getElementById('step-count');
const timerElement = document.getElementById('timer');
const backgroundMusic = document.getElementById('background-music');
const moveSound = document.getElementById('move-sound');
const winSound = document.getElementById('win-sound');

let draggedDisk = null;
let stepCount = 0;
let timerInterval;
let startTime;
let gameInProgress = false;
let moveHistory = [];
let redoStack = [];

startButton.addEventListener('click', startGame);
resetButton.addEventListener('click', resetGame);
undoButton.addEventListener('click', undoMove);
redoButton.addEventListener('click', redoMove);

function startGame() {
    const plateCount = parseInt(plateCountInput.value);
    if (plateCount < 3 || plateCount > 9) {
        alert('Please enter a number between 3 and 9');
        return;
    }
    resetGame();
    initGame(plateCount);
    gameInProgress = true;
    startTimer();
    backgroundMusic.play();
}

function resetGame() {
    pegs.forEach(peg => {
        while (peg.lastElementChild.className === 'disk') {
            peg.removeChild(peg.lastElementChild);
        }
    });
    stepCount = 0;
    updateStepCount();
    clearInterval(timerInterval);
    timerElement.textContent = 'Time: 00:00';
    messageElement.textContent = '';
    gameInProgress = false;
    moveHistory = [];
    redoStack = [];
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
}

function initGame(diskCount) {
    const firstPeg = document.getElementById('pegA');
    for (let i = diskCount; i > 0; i--) {
        const disk = document.createElement('div');
        disk.className = 'disk';
        disk.style.width = `${i * 30 + 20}px`;
        disk.style.bottom = `${(diskCount - i) * 22 + 20}px`;
        disk.draggable = true;
        firstPeg.appendChild(disk);
    }
}

function startTimer() {
    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    const minutes = Math.floor(elapsedTime / 60).toString().padStart(2, '0');
    const seconds = (elapsedTime % 60).toString().padStart(2, '0');
    timerElement.textContent = `Time: ${minutes}:${seconds}`;
}

function updateStepCount() {
    stepCountElement.textContent = `Steps: ${stepCount}`;
}

function undoMove() {
    if (moveHistory.length > 0 && gameInProgress) {
        const lastMove = moveHistory.pop();
        redoStack.push(lastMove);
        lastMove.from.appendChild(lastMove.disk);
        rearrangeDisk(lastMove.from);
        rearrangeDisk(lastMove.to);
        stepCount--;
        updateStepCount();
    }
}

function redoMove() {
    if (redoStack.length > 0 && gameInProgress) {
        const nextMove = redoStack.pop();
        moveHistory.push(nextMove);
        nextMove.to.appendChild(nextMove.disk);
        rearrangeDisk(nextMove.from);
        rearrangeDisk(nextMove.to);
        stepCount++;
        updateStepCount();
    }
}

pegs.forEach(peg => {
    peg.addEventListener('dragover', e => e.preventDefault());

    peg.addEventListener('dragstart', e => {
        if (gameInProgress && e.target.classList.contains('disk') && e.target === peg.lastElementChild) {
            draggedDisk = e.target;
        } else {
            e.preventDefault();
        }
    });

    peg.addEventListener('drop', e => {
        e.preventDefault();
        if (gameInProgress && isValidMove(peg)) {
            const fromPeg = draggedDisk.parentNode;
            moveHistory.push({ disk: draggedDisk, from: fromPeg, to: peg });
            redoStack = [];
            peg.appendChild(draggedDisk);
            rearrangeDisk(peg);
            rearrangeDisk(fromPeg);
            stepCount++;
            updateStepCount();
            moveSound.play();
            checkWinCondition();
        }
    });
});

function isValidMove(peg) {
    const topDisk = peg.lastElementChild;
    if (topDisk.className !== 'disk' || parseInt(draggedDisk.style.width) < parseInt(topDisk.style.width)) {
        return true;
    }
    return false;
}

function rearrangeDisk(peg) {
    const disks = Array.from(peg.querySelectorAll('.disk'));
    disks.forEach((disk, index) => {
        disk.style.bottom = `${index * 22 + 20}px`;
    });
}

function checkWinCondition() {
    const lastPeg = document.getElementById('pegC');
    if (lastPeg.querySelectorAll('.disk').length === parseInt(plateCountInput.value)) {
        gameInProgress = false;
        clearInterval(timerInterval);
        messageElement.textContent = 'Congratulations! You won!';
        backgroundMusic.pause();
        winSound.play();
    }
}