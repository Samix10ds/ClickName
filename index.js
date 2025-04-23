/**
 * @name ClickCounter
 * @author Samix10ds
 * @description Aggiunge un pulsante accanto al nome utente che conta quanti click fai durante la sessione.
 * @version 1.0.0
 */

let clickCount = 0;
let buttonEl = null;

module.exports = {
    start() {
        // Aspetta che l'elemento user-panel sia pronto
        const interval = setInterval(() => {
            const userPanel = document.querySelector('[class*="accountProfile"]');
            if (userPanel && !document.getElementById('click-counter-btn')) {
                buttonEl = document.createElement("button");
                buttonEl.id = "click-counter-btn";
                buttonEl.innerText = `Click: ${clickCount}`;
                buttonEl.style.marginLeft = "8px";
                buttonEl.style.background = "#43b581";
                buttonEl.style.color = "#fff";
                buttonEl.style.border = "none";
                buttonEl.style.borderRadius = "4px";
                buttonEl.style.padding = "4px 12px";
                buttonEl.style.fontWeight = "bold";
                buttonEl.style.cursor = "pointer";
                buttonEl.onclick = () => {
                    clickCount++;
                    buttonEl.innerText = `Click: ${clickCount}`;
                    buttonEl.style.outline = "2px solid #fff";
                    setTimeout(() => buttonEl.style.outline = "none", 200);
                };
                userPanel.appendChild(buttonEl);
                clearInterval(interval);
            }
        }, 1000);
    },
    stop() {
        clickCount = 0;
        if (buttonEl) {
            buttonEl.remove();
            buttonEl = null;
        }
    }
};