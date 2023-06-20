const RANDOM_MIN_NUMBER = 3;
const RANDOM_MAX_NUMBER = 11;

let WORD_LENGTH  = 4;
const NUMBER_OF_ATTEMPTS = 5;

let attempts = 0;
let generated;

function startGame() {

    const lengthInput = document.getElementById('lengthInput');
    const inputLength = parseInt(lengthInput.value);
    if (inputLength >= RANDOM_MIN_NUMBER && inputLength <= RANDOM_MAX_NUMBER) {
        WORD_LENGTH = inputLength;
    } else {
        lengthInput.value = WORD_LENGTH; // Восстановить предыдущее значение
        return;
    }

    const gameContainer = document.getElementById('gameContainer');
    gameContainer.style.display = 'flex';

    const stopBtn = document.getElementById('stopBtn');
    stopBtn.style.display = 'block';

    const startBtn = document.getElementById('startBtn');
    startBtn.textContent = 'Грати знову';
    startBtn.addEventListener('click', resetGame);

    play();
}

function play() {
    secretWord = getSecretWord(WORD_LENGTH);

    console.log(secretWord);

    attempts = 0;

    const submitBtn = document.getElementById('submitBtn');
    submitBtn.addEventListener('click', handleGuess);

    const wordInput = document.getElementById('wordInput');
    const keyupHandler = function(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            handleGuess();
        }
    };

    wordInput.addEventListener('keyup', keyupHandler);

    updateAttemptsText();
}

function handleGuess() {
    const inputElement = document.getElementById('wordInput');
    const guessedWord = inputElement.value.toLowerCase();

    if (!isValidWord(guessedWord)) {
        inputElement.value = '';
        return;
    }

    attempts++;

    console.log(guessedWord);

    let greenLetters = 0;
    let yellowLetters = 0;

    const historyItem = document.createElement('div');
    historyItem.classList.add('historyItem');

    for (let i = 0; i < secretWord.length; i++) {
        const letter = document.createElement('span');
        letter.textContent = guessedWord[i];

        if (guessedWord[i] === secretWord[i]) {
            greenLetters += 1;
            letter.classList.add('bull');
        } else if (secretWord.includes(guessedWord[i])) {
            yellowLetters += 1;
            letter.classList.add('cow');
        }

        historyItem.appendChild(letter);
    }

    const historyContainer = document.getElementById('historyContainer');
    historyContainer.appendChild(historyItem);

    inputElement.value = '';

    updateAttemptsText();

    if (greenLetters === WORD_LENGTH) {
        const resultSpan = document.createElement('p');
        resultSpan.textContent = 'Ви перемогли.';
        historyContainer.appendChild(resultSpan);

        submitBtn.removeEventListener('click', handleGuess);

        const startBtn = document.getElementById('startBtn');
        startBtn.textContent = 'Грати знову';
        startBtn.addEventListener('click', resetGame);
        
    } else if (attempts === NUMBER_OF_ATTEMPTS) {
        const resultSpan = document.createElement('p');
        resultSpan.textContent = 'Ви програли.';
        historyContainer.appendChild(resultSpan);

        submitBtn.removeEventListener('click', handleGuess);
    }
}

function resetGame() {

    clearHistory();

    attempts = 0; // Обнуляем количество попыток
    
}

function breakGame() {

    const gameContainer = document.getElementById('gameContainer');
    gameContainer.style.display = 'none';

    startBtn.textContent = 'Начать игру';
    startBtn.addEventListener('click', resetGame);

    stopBtn.style.display = 'none';

    clearHistory();

    attempts = 0; // Обнуляем количество попыток
    
}

function updateAttemptsText() {
    const attemptsElement = document.getElementById('attempts');
    attemptsElement.textContent = `Спроба: ${attempts}/${NUMBER_OF_ATTEMPTS}`;
}

function clearHistory() {
    const historyContainer = document.getElementById('historyContainer');
    historyContainer.innerHTML = '';
}

function getSecretWord(length) {
    const words = [
    'пан',
    'пані',
    'кохання',
    'лебідка',
    'митець',
    'байдики',
    'метикуватий',
    'байдикувати',
    'млосний',
    'слушний',
    'пройдисвіт',
    'примарний',
    'обопільний',
    'легіт',
    'абищиця',
    'кебета',
    'нестелепа',
    'тужавий',
    'чвиря',
    'примилятися',
    'мріти',
    'сопух',
    'брунька',
    'легіт',
    'мама',
    'тато',
    'брат'
    ];
    const filteredWords = words.filter(word => word.length === length);
    const randomIndex = getRandomNumber(0, filteredWords.length);
    const secret = filteredWords[randomIndex];

return secret.split('');
}


function getRandomNumber(min, max) {
    return Math.trunc(Math.random() * (max - min)) + min;
}

function isValidWord(word) {
    const regex = /^[а-яА-ЯґҐєЄіІїЇ]+$/u;
    return word.length === WORD_LENGTH && regex.test(word);
  }
  