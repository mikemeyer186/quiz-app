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