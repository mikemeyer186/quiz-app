let currentQuiz = [];
let currentQuestion = [];


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
    let introCards = document.getElementById('intro-cards');
    let quizCard = document.getElementById('quiz-cards');
    introCards.classList.add('d-none');
    quizCard.classList.remove('d-none');

    currentQuiz = quiz;
    showQuestion();
}


// show current question in quiz card
function showQuestion() {
    document.getElementById('question-image').src = currentQuiz[0]["image"];
    document.getElementById('question-title').innerHTML = 'Frage ' + currentQuiz[0]["id"];
    document.getElementById('question-text').innerHTML = currentQuiz[0]["question"];
    document.getElementById('question-answer1').innerHTML = currentQuiz[0]["answer1"];
    document.getElementById('question-answer2').innerHTML = currentQuiz[0]["answer2"];
    document.getElementById('question-answer3').innerHTML = currentQuiz[0]["answer3"];
    document.getElementById('question-answer4').innerHTML = currentQuiz[0]["answer4"];
    showProgress();
}

function showProgress() {
    document.getElementById('progress').innerHTML = currentQuiz[0]["name"] + ' - ' + '25%';
}