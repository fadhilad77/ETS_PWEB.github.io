const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let score = 0;
let stage = 1;
let speed = 2;
let blockProbability = 0.02;
let isPaused = false; // Tambahkan status pause

let player = {
    x: canvas.width / 2,
    y: 50,
    radius: 25,
    color: 'blue',
    dx: 5
};

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let blocks = [];
const blockWidth = 70;
const blockHeight = 30;

// ... [kode lainnya...]

function pauseGame() {
    isPaused = true;
}

function resumeGame() {
    isPaused = false;
    update();
}

function notifyLevelUp() {
    pauseGame();
    setTimeout(() => {
        alert(`Congratulations! You've advanced to Stage ${stage}!`);
        resumeGame();
    }, 100);
}

function updateStage() {
    if (score >= 200 && stage < 3) {
        stage = 3;
        speed = 6;
        blockProbability = 0.05;
        notifyLevelUp();
    } else if (score >= 100 && stage < 2) {
        stage = 2;
        speed = 4;
        blockProbability = 0.04;
        notifyLevelUp();
    }
}

// Menghapus definisi updateStage yang kedua


function update() {
    if (isPaused) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawPlayer();

    if (Math.random() < blockProbability) {
        let x = Math.random() * (canvas.width - blockWidth);
        blocks.push({x: x, y: canvas.height});
    }

    // ... [kode lainnya di fungsi update...]

    requestAnimationFrame(update);
}

canvas.addEventListener('mousemove', (event) => {
    player.x = event.clientX - canvas.offsetLeft;
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight' && player.x < canvas.width - player.radius) {
        player.x += player.dx;
    }
    if (event.key === 'ArrowLeft' && player.x > player.radius) {
        player.x -= player.dx;
    }
});

update();