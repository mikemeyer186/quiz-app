let currentQuiz = [];
let currentQuestion = 0;
let quizPoints = 0;
let totalPoints;

let RIGHT = new Audio('./sounds/right_answer.mp3');
let FALSE = new Audio('./sounds/wrong_answer.mp3');
let END = new Audio('./sounds/end_game.mp3');


// init function when body loads
function init() {
    renderPopUps();
    showPopUpBackGround();
    loadPointsLocal();
    unlockQuiz();
}


// render all popups when laoding the page
function renderPopUps() {
    let popUpContent = document.getElementById('popup-content');
    popUpContent.innerHTML = introPopUpTemplate();
}


// show intro popup when page loads first time
function showPopUpBackGround() {
    let popUpBackGround = document.getElementById('popup-background');
    popUpBackGround.classList.remove('d-none');
    setInterval(slideIntroPopUp, 50);
}


// slide intro popup in viewable area
function slideIntroPopUp() {
    let introPopUp = document.getElementById('intro-popup');
    introPopUp.classList.remove('popup-out');
}


// close intro popup when clicking button
function closeIntroPopUp() {
    let popUpBackGround = document.getElementById('popup-background');
    let introPopUp = document.getElementById('intro-popup');
    popUpBackGround.classList.add('d-none');
    introPopUp.classList.remove('show-popup');
}


// check points and unlock buttons of second and third quiz
function unlockQuiz() {
    let buttonBio = document.getElementById('button-bio');
    let buttonTech = document.getElementById('button-tech');
    let diffPointsBio = 5 - totalPoints;
    let diffPointsTech = 10 - totalPoints;

    if (totalPoints >= 5) {
        buttonBio.disabled = false;
        buttonBio.innerHTML = 'Quiz starten';
    } else {
        buttonBio.innerHTML = `Noch ${diffPointsBio} Punkte`;
    }

    if (totalPoints >= 10) {
        buttonTech.disabled = false;
        buttonTech.innerHTML = 'Quiz starten';
    } else {
        buttonTech.innerHTML = `Noch ${diffPointsTech} Punkte`;
    }
}


// start quiz (quiz is parameter from button "start quiz")
function startQuiz(quiz) {
    document.getElementById('intro-cards').classList.add('d-none');
    document.getElementById('quiz-cards').classList.remove('d-none');
    document.getElementById('endscreen').classList.add('d-none');
    document.getElementById('home').classList.remove('d-none');
    document.getElementById('progress-box').classList.remove('d-none');

    currentQuiz = quiz;
    quizPoints = 0;
    setStandard();
    showQuestion();
}


// show current question in quiz card
function showQuestion() {
    document.getElementById('question-image').src = currentQuiz[currentQuestion]['image'];
    document.getElementById('question-text').innerHTML = currentQuiz[currentQuestion]['question'];
    document.getElementById('question-answer1').innerHTML = currentQuiz[currentQuestion]['answer1'];
    document.getElementById('question-answer2').innerHTML = currentQuiz[currentQuestion]['answer2'];
    document.getElementById('question-answer3').innerHTML = currentQuiz[currentQuestion]['answer3'];
    document.getElementById('question-answer4').innerHTML = currentQuiz[currentQuestion]['answer4'];
    document.getElementById('quiz-number').innerHTML = "Frage " + currentQuiz[currentQuestion]['id'] + " " + "von " + currentQuiz.length;
    document.getElementById('progress').innerHTML = currentQuiz[currentQuestion]['kategorie'] + ' - ' + '0%';
}


// show progress of current quiz
function showProgress() {
    let quizLength = currentQuiz.length;
    let solvedQuestions = currentQuestion;
    let progress = ((solvedQuestions) / quizLength) * 100;
    document.getElementById('progress').innerHTML = currentQuiz[currentQuestion]['kategorie'] + ' - ' + progress + '%';
    document.getElementById('progress-bar').style.width = progress + '%';
}


// check when clicking answer
function checkAnswer(answer) {
    let rightAnswer = currentQuiz[currentQuestion]['right'];
    let button = document.getElementById('next-question');

    if (answer == rightAnswer) {
        correctAnswer(answer);
    } else {
        wrongAnswer(answer, rightAnswer);
    }

    noClickEvent();
    button.disabled = false;
}


// right answer
function correctAnswer(answer) {
    RIGHT.play();
    document.getElementById(`question-answer${answer}`).classList.add('right');
    increasePoints();
}


// wrong answer
function wrongAnswer(answer, rightAnswer) {
    FALSE.play();
    document.getElementById(`question-answer${answer}`).classList.add('false');
    document.getElementById(`question-answer${rightAnswer}`).classList.add('right');
}


// pointer events: none -> when answer is selected
function noClickEvent() {
    for (let i = 1; i < 5; i++) {
        document.getElementById(`question-answer${i}`).classList.add('noclick');
    }
}


// pointer events: auto -> new question
function clickEvent() {
    for (let i = 1; i < 5; i++) {
        document.getElementById(`question-answer${i}`).classList.remove('noclick');
    }
}


// increase points if answer is right
function increasePoints() {
    quizPoints++;
    totalPoints++;
    document.getElementById('points').innerHTML = totalPoints;
    savePointsLocal();
    unlockQuiz();
}


// next question when clicking in button "next question"
function nextQuestion() {
    currentQuestion++;

    if (currentQuestion == currentQuiz.length) {
        END.play();
        endOfQuiz();
    } else {
        setStandard();
        showQuestion();
        showProgress();
    }
}


// remove all colors from answers
function removeColors() {
    for (let i = 1; i < 5; i++) {
        document.getElementById(`question-answer${i}`).classList.remove('right');
        document.getElementById(`question-answer${i}`).classList.remove('false');
    }
}


// set pointer events, colors and buttons to standard -> new question
function setStandard() {
    let button = document.getElementById('next-question');
    button.disabled = true;
    document.getElementById('progress-bar').style.width = '0%';

    stopPlaySounds();
    removeColors();
    clickEvent();
}


// stop playing sounds when loading new question
function stopPlaySounds() {
    FALSE.pause();
    FALSE.currentTime = 0;
    RIGHT.pause();
    RIGHT.currentTime = 0;
}


// end of quiz
function endOfQuiz() {
    currentQuestion = 0;
    document.getElementById('quiz-cards').classList.add('d-none');
    document.getElementById('progress').innerHTML = currentQuiz[currentQuestion]['kategorie'] + ' - ' + '100%';
    document.getElementById('progress-bar').style.width = '100%';
    document.getElementById('endscreen').classList.remove('d-none');
    document.getElementById('home').classList.add('d-none');
    endScreen();
}


// endscreen points
function endScreen() {
    endWord = endSlogan();
    document.getElementById('end-word').innerHTML = endWord;
    document.getElementById('solved').innerHTML = quizPoints;
    document.getElementById('all').innerHTML = currentQuiz.length;
}


// select slogan for endscreen
function endSlogan() {
    let index = quizPoints;
    let slogan = winnerSlogan[index];

    return slogan;
}


//go back to main menu (quiz selection)
function backToMenu() {
    currentQuestion = 0;
    document.getElementById('intro-cards').classList.remove('d-none');
    document.getElementById('quiz-cards').classList.add('d-none');
    document.getElementById('endscreen').classList.add('d-none');
    document.getElementById('home').classList.add('d-none');
    document.getElementById('progress').innerHTML = '';
    document.getElementById('progress-box').classList.add('d-none');
}


// save points in local storage
function savePointsLocal() {
    localStorage.setItem('points', totalPoints);
}


// load points from local storage
function loadPointsLocal() {
    totalPoints = localStorage.getItem('points');

    if (!totalPoints) {
        totalPoints = 0;
    }

    document.getElementById('points').innerHTML = totalPoints;
}