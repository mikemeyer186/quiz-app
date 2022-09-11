let currentQuiz = [];
let currentQuestion = 0;
let quizPoints = 0;
let totalPoints = 0;


// init function when body loads
function init() {
    renderPopUps();
    showPopUpBackGround();
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


// start quiz (quiz is parameter from button "start quiz")
function startQuiz(quiz) {
    document.getElementById('intro-cards').classList.add('d-none');
    document.getElementById('quiz-cards').classList.remove('d-none');
    document.getElementById('endscreen').classList.add('d-none');
    document.getElementById('home').classList.remove('d-none');

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
}


// check when clicking answer
function checkAnswer(answer) {
    let rightAnswer = currentQuiz[currentQuestion]['right'];
    let button = document.getElementById('next-question');

    if (answer == rightAnswer) {
        document.getElementById(`question-answer${answer}`).classList.add('right');
        increasePoints();
    } else {
        document.getElementById(`question-answer${answer}`).classList.add('false');
    }

    noClickEvent();
    button.disabled = false;
}


// add no click event when answer is selected
function noClickEvent() {
    for (let i = 1; i < 5; i++) {
        document.getElementById(`question-answer${i}`).classList.add('noclick');
    }
}


// remove no click event
function clickEvent() {
    for (let i = 1; i < 5; i++) {
        document.getElementById(`question-answer${i}`).classList.remove('noclick');
    }
}


// increase points if answer is right
function increasePoints() {
    quizPoints++;
    totalPoints++;
    document.getElementById('points').innerHTML = totalPoints + ' Punkte';
}


// next question when clicking in button "next question"
function nextQuestion() {
    currentQuestion++;

    if (currentQuestion == currentQuiz.length) {
        endOfQuiz();
    } else {
        setStandard();
        showQuestion();
        showProgress();
    }
}


// remove all colors form answers
function removeColors() {
    for (let i = 1; i < 5; i++) {
        document.getElementById(`question-answer${i}`).classList.remove('right');
        document.getElementById(`question-answer${i}`).classList.remove('false');
    }
}


// set click event, colors and buttons to standard
function setStandard() {
    let button = document.getElementById('next-question');
    button.disabled = true;

    removeColors();
    clickEvent();
}


// end of quiz
function endOfQuiz() {
    currentQuestion = 0;
    document.getElementById('quiz-cards').classList.add('d-none');
    document.getElementById('progress').innerHTML = currentQuiz[currentQuestion]['kategorie'] + ' - ' + '100%';
    document.getElementById('endscreen').classList.remove('d-none');
    endScreen();
}


// endscreen points
function endScreen() {
    endWord = "super";
    document.getElementById('end-word').innerHTML = endWord;
    document.getElementById('solved').innerHTML = quizPoints;
    document.getElementById('all').innerHTML = currentQuiz.length;
}


//go back to main menu (quiz selection)
function backToMenu() {
    currentQuestion = 0;
    document.getElementById('intro-cards').classList.remove('d-none');
    document.getElementById('quiz-cards').classList.add('d-none');
    document.getElementById('endscreen').classList.add('d-none');
    document.getElementById('home').classList.add('d-none');
    document.getElementById('progress').innerHTML = '';
}