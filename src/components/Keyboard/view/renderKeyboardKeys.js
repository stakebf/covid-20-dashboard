import getShiftValue from '../model/shift'

const keyLayoutEN = [
    "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
    "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]",
    "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "\\", "enter",
    "shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/",
    "done", "mute", "EN", "space", "<", ">"
];

const keyLayoutRU = [
    "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
    "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ",
    "caps", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "enter",
    "shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".",
    "done", "mute", "RU", "space", "<", ">"
];


const renderKeyBoard = (lang, isCaps, isMute, isShift) => {
    // const keyboard__keys = document.querySelector('.keyboard__keys');
    const keyboard = document.querySelector('.keyboard');
    const hidebtn = `<button type='button' class='hide_btn'><i class="material-icons">hide</i></button>`;

    if (keyboard !== null) {
        document.body.removeChild(keyboard);
    }
    const main = document.createElement("div");
    const keysContainer = document.createElement("div");

    main.classList.add("keyboard");
    main.innerHTML += hidebtn;
    keysContainer.classList.add("keyboard__keys");
    const fragment = document.createDocumentFragment();
    const createIconHTML = (icon_name) => {
        return `<i class="material-icons">${icon_name}</i>`;
    };

    const keyLayout = lang === 'EN' ? keyLayoutEN : keyLayoutRU;
    keyLayout.forEach(key => {
        const keyElement = document.createElement("button");
        const insertLineBreak = lang === 'EN' ? ["backspace", "]", "enter", "/", "ъ"].indexOf(key) !== -1 : ["backspace", "]", "enter", ".", "ъ"].indexOf(key) !== -1;
        keyElement.setAttribute("type", "button");
        keyElement.classList.add("keyboard__key");

        switch (key) {
            case "backspace":
                keyElement.classList.add("keyboard__key--wide", 'backspace');
                keyElement.innerHTML = createIconHTML("backspace");
                break;

            case "caps":
                keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable", "caps");
                if (isCaps) keyElement.classList.add("keyboard__key--active");
                keyElement.innerHTML = createIconHTML("caps");
                break;

            case "enter":
                keyElement.classList.add("keyboard__key--wide", 'enter');
                keyElement.innerHTML = createIconHTML("return");
                break;

            case "space":
                keyElement.classList.add("keyboard__key--extra-wide", 'space');
                keyElement.innerHTML = createIconHTML("space");
                break;

            case "done":
                keyElement.classList.add("keyboard__key--wide", "keyboard__key--dark", 'done');
                keyElement.innerHTML = createIconHTML("check");
                break;

            case "shift":
                keyElement.innerHTML = key;
                keyElement.classList.add("keyboard__key--shift", "keyboard__key--wide", 'shift');
                if (isShift) keyElement.classList.add("keyboard__key--active");
                break;

            case 'EN':
                keyElement.innerHTML = key;
                keyElement.classList.add("keyboard__key--lang", "lang");
                break;
            case 'RU':
                keyElement.innerHTML = key;
                keyElement.classList.add("keyboard__key--lang", "lang");
                break;
            case '<':
                keyElement.innerHTML = '<';
                keyElement.classList.add("keyboard__key--arrow", "left-arrow");
                break;
            case '>':
                keyElement.innerHTML = '>';
                keyElement.classList.add("keyboard__key--arrow", "right-arrow");
                break;
            case 'mute':
                keyElement.classList.add("keyboard__key--mute", "keyboard__key--wide", "mute");
                if (isMute) keyElement.classList.add("keyboard__key--active");
                keyElement.innerHTML = createIconHTML("sound");
                break;
            default:
                keyElement.classList.add("keyboard__key--elem");
                keyElement.textContent = isCaps && isShift ? key.toLowerCase() : isCaps ? key.toUpperCase() : isShift ? key.toUpperCase() : key.toLowerCase();
                break;
        }


        fragment.appendChild(keyElement);
        if (insertLineBreak) {
            fragment.appendChild(document.createElement("br"));
        }
    });
    keysContainer.appendChild(fragment);
    main.appendChild(keysContainer);
    document.body.appendChild(main);
    if (isShift){ 
        getShiftValue(lang, isCaps, isShift);
    }
    return fragment;

}

export default renderKeyBoard;
