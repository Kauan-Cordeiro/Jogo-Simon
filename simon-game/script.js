const buttons = document.querySelectorAll('.button');
const startButton = document.getElementById('start');
const messageDisplay = document.getElementById('message');
const usernameInput = document.getElementById('username');
const rankingDisplay = document.getElementById('ranking');

let sequence = [];
let userSequence = [];
let level = 0;
let username = '';

const sounds = {
    green: new Audio('sounds/green.mp3'),
    red: new Audio('sounds/red.mp3'),
    yellow: new Audio('sounds/yellow.mp3'),
    blue: new Audio('sounds/blue.mp3'),
};

const colors = ['green', 'red', 'yellow', 'blue'];
let ranking = [];

function startGame() {
    username = usernameInput.value.trim();
    if (username === '') {
        alert('Por favor, insira seu nome.');
        return;
    }
    level = 0;
    sequence = [];
    userSequence = [];
    messageDisplay.textContent = `Nível ${level}`;
    nextSequence();
}

function nextSequence() {
    userSequence = [];
    level++;
    messageDisplay.textContent = `Nível ${level}`;
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    sequence.push(randomColor);
    playSequence();
}

function playSequence() {
    sequence.forEach((color, index) => {
        setTimeout(() => {
            flashButton(color);
            playSound(color);
        }, index * 1000);
    });
}

function flashButton(color) {
    const button = document.getElementById(color);
    button.classList.add('active');
    setTimeout(() => {
        button.classList.remove('active');
    }, 500);
}

function playSound(color) {
    sounds[color].play();
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const color = button.id;
        userSequence.push(color);
        playSound(color);
        flashButton(color);
        checkAnswer(userSequence.length - 1);
    });
});

function checkAnswer(currentLevel) {
    if (userSequence[currentLevel] === sequence[currentLevel]) {
        if (userSequence.length === sequence.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    } else {
        messageDisplay.textContent = 'Game Over! Tente novamente.';
        saveProgress();
    }
}

function saveProgress() {
    ranking.push({ username: username, level: level, date: new Date().toLocaleString() });
    displayRanking();
}

function displayRanking() {
    rankingDisplay.innerHTML = '<h3>Ranking:</h3>';
    ranking.forEach(entry => {
        const entryElement = document.createElement('div');
        entryElement.textContent = `${entry.username} - Nível: ${entry.level} (em ${entry.date})`;
        rankingDisplay.appendChild(entryElement);
    });
}

startButton.addEventListener('click', startGame);