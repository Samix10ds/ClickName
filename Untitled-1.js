// ==UserScript==
// @name         Click Counter Button
// @author       Samix10ds
// @version      1.0.0
// @description  Un semplice contatore di click accanto al tuo nome utente.
// ==/UserScript==

import { Plugin, registerPlugin } from "vencord";
import { React } from "@webpack/common";
import { findByProps } from "@webpack";

// Trova il componente dell'area utente in basso a sinistra
const UserArea = findByProps("AccountProfile");

let clickCount = 0;

function ClickCounter() {
    const [count, setCount] = React.useState(clickCount);
    const [animate, setAnimate] = React.useState(false);

    const handleClick = () => {
        clickCount++;
        setCount(clickCount);
        setAnimate(true);
        setTimeout(() => setAnimate(false), 200);
    };

    return React.createElement("button", {
        onClick: handleClick,
        style: {
            marginLeft: 8,
            background: "#43b581",
            color: "#fff",
            border: "none",
            borderRadius: 4,
            padding: "4px 12px",
            fontWeight: "bold",
            cursor: "pointer",
            outline: animate ? "2px solid #fff" : "none",
            transition: "outline 0.2s"
        }
    }, `Click: ${count}`);
}

export default registerPlugin({
    name: "ClickCounter",
    description: "Aggiunge un contatore di click vicino al tuo nome utente.",
    authors: [{ name: "Samix10ds" }],
    start() {
        // Patcha il render dell'area utente per aggiungere il pulsante
        const orig = UserArea.prototype.render;
        UserArea.prototype.render = function () {
            const res = orig.apply(this, arguments);
            if (res.props.children && !res.props.children.find?.(el => el?.key === "click-counter-btn")) {
                res.props.children.push(
                    React.createElement(ClickCounter, { key: "click-counter-btn" })
                );
            }
            return res;
        };
    },
    stop() {
        clickCount = 0;
        // Ripristina il render originale se serve
        if (UserArea.prototype.render.__orig) {
            UserArea.prototype.render = UserArea.prototype.render.__orig;
        }
    }
});