// popup template
function introPopUpTemplate() {
    return /*html*/`
        <div id="popup-background" class="popup-bg d-none">
            <div id="intro-popup" class="modal popup-out show-popup" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Willkommen zur Quiz App</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onclick="closeIntroPopUp()"></button>
                        </div>
                        <div class="modal-body">
                            <p>Teste dein Wissen in verschieden Themengebieten. Sammle Punkte für jede richtig beantwortete Frage und schalte damit neue Quiz-Herausforderungen frei. Bist du breit?</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" onclick="closeIntroPopUp()">Los geht's!</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}