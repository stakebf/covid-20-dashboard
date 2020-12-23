import getShiftValue from '../model/shift';
import toggleCapsLock from '../model/toggleCaps';
import renderKeyBoard from '../view/renderKeyboardKeys';
import makeSound from '../model/audio';

const state = {
    isShift: false,
    lang: 'EN',
    isCaps: false,
    currentCursor: 0,
    content: '',
    isMute: false,
    isHide: true
}

const setFocus = () => {
    const keyboardInput = document.querySelector('#outlined-basic');
    keyboardInput.selectionStart = state.currentCursor;
    keyboardInput.selectionEnd = state.currentCursor;
    keyboardInput.focus();
}

const listen = (setSearchTerm, searchTerm) => {
    let shift,
        keyElements,
        keyboardInput,
        hide;

    const init = () => {
        shift = document.querySelector('.keyboard__key--shift');
        keyElements = document.querySelectorAll(".keyboard__key");
        keyboardInput = document.querySelector('#outlined-basic');
        hide = document.querySelector('.hide_btn');
    }
    init()

    const initkeys = () => {

        keyElements.forEach(key => {
            key.addEventListener("click", (e) => {
                const keyboardInput = document.querySelector('#outlined-basic');
                if (key.classList.contains('caps')) {
                    if (!state.isMute) makeSound('special');
                    clickCaps(key)
                    if (state.isShift) getShiftValue(state.lang, state.isCaps, state.isShift);
                    return;
                } else if (key.classList.contains('backspace')) {
                    if (!state.isMute) makeSound('backpace');
                    if (keyboardInput.value.length === 0) return;
                    const currentArr = keyboardInput.value.split('');
                    currentArr.splice(state.currentCursor - 1, 1);
                    state.content = currentArr.join('');
                    keyboardInput.value = state.content;
                    setSearchTerm(keyboardInput.value);
                    state.currentCursor -= 1;
                    setFocus();
                    return;
                } else if (key.classList.contains('enter')) {
                    if (!state.isMute) makeSound('enter');
                    clickEnter();
                } else if (key.classList.contains('space')) {
                    if (!state.isMute) makeSound(state.lang.toLowerCase());
                    state.content += " ";
                    keyboardInput.value += " ";
                    state.currentCursor += 1;
                    setSearchTerm(keyboardInput.value);
                    setFocus();
                } else if (key.classList.contains('left-arrow')) {
                    if (!state.isMute) makeSound(state.lang.toLowerCase());
                    if (state.currentCursor !== 0) {
                        state.currentCursor -= 1;
                    }
                    setFocus();
                } else if (key.classList.contains('right-arrow')) {
                    if (!state.isMute) makeSound(state.lang.toLowerCase());
                    if (state.currentCursor <= keyboardInput.value.length - 1) {
                        state.currentCursor += 1;
                    }
                    setFocus();
                } else if (key.classList.contains('shift')) {
                    key.classList.toggle("keyboard__key--active");
                    if (!state.isMute) makeSound('shift');
                    if (!state.isShift && state.isCaps) {
                        state.isShift = true;
                        renderKeyBoard(state.lang, state.isCaps, state.isMute, state.isShift);
                        init();
                        initkeys();
                        setFocus();
                        getShiftValue(state.lang, state.isCaps, state.isShift);
                        return;
                    } else if (state.isShift) {
                        state.isShift = false;
                        renderKeyBoard(state.lang, state.isCaps, state.isMute, state.isShift);
                        init();
                        initkeys();
                        setFocus();
                        return;
                    } else {
                        state.isShift = true;
                        getShiftValue(state.lang, state.isCaps, state.isShift);
                        setFocus();
                        return;
                    }

                } else if (key.classList.contains('lang')) {
                    if (!state.isMute) makeSound(state.lang.toLowerCase());
                    if (state.lang === 'EN') {
                        state.lang = 'RU';
                        setFocus();
                    } else {
                        state.lang = 'EN';
                        setFocus();
                    }
                    renderKeyBoard(state.lang, state.isCaps, state.isMute, state.isShift);
                    init();
                    initkeys();
                } else if (key.classList.contains('done')) {
                    if (!state.isMute) makeSound(state.lang.toLowerCase());
                    state.content = "";
                    document.querySelector(".keyboard").classList.add("keyboard--hidden");
                } else if (key.classList.contains('mute')) {
                    if (!state.isMute) makeSound(state.lang.toLowerCase());
                    key.classList.toggle("keyboard__key--active");
                    state.isMute = !state.isMute;
                }
                if (key.classList.contains('keyboard__key--elem')) {
                    const pressed = document.querySelector('.key__pressed');
                    if (pressed) pressed.classList.remove('key__pressed');
                    if (!state.isMute) makeSound(state.lang.toLowerCase());
                    const currentArr = keyboardInput.value.split('');
                    const value = key.innerHTML === "&gt;" ? ">" : key.innerHTML === "&lt;" ? "<" : key.innerText;
                    currentArr.splice(state.currentCursor, 0, value);
                    state.content = currentArr.join('');
                    document.querySelector('#outlined-basic').value = state.content;
                    setSearchTerm(keyboardInput.value);
                    state.currentCursor += 1;
                    setFocus();
                }
            });
        });

        hide.addEventListener('click', () => {
            if (!state.isMute) makeSound(state.lang.toLowerCase());
            state.content = "";
            state.isHide = true;
            document.querySelector(".keyboard").classList.toggle("keyboard--hidden");
        })

    }
    initkeys();

    keyboardInput.addEventListener('click', () => {
        state.currentCursor = keyboardInput.value.length;
        if (state.isHide) {
            state.isHide = false;
            document.querySelector('.keyboard').classList.remove("keyboard--hidden");
        }
        setFocus();
    });

    keyboardInput.addEventListener('keydown', (e) => {
        const pressed = document.querySelector('.key__pressed');
        if (pressed) pressed.classList.remove('key__pressed');
        const item = setColor(e.key, e.code)
        if (item !== undefined) item.classList.add('key__pressed');
        if (item !== undefined && (item.classList.contains('backspace') || item.classList.contains('keyboard__key--arrow') || item.classList.contains('enter'))) {
            e.preventDefault();
            setFocus();
        }
        if (item !== undefined && item.classList.contains('keyboard__key--elem')) {
            e.preventDefault();
            const currentArr = keyboardInput.value.split('');
            currentArr.splice(state.currentCursor, 0, e.key);
            state.content = currentArr.join('');
            document.querySelector('#outlined-basic').value = state.content;
            setSearchTerm(keyboardInput.value);
            setFocus();
        }
        setFocus();
    })


    const clickEnter = () => {
        const keyboardInput = document.querySelector('#outlined-basic');
        const currentArr = keyboardInput.value.split('');
        currentArr.splice(state.currentCursor, 0, "\n");
        state.content += currentArr.join('');
        keyboardInput.value = currentArr.join('');
        setSearchTerm(keyboardInput.value);
        state.currentCursor += 1;
        setFocus();
    }

    const clickBackSpace = () => {
        const keyboardInput = document.querySelector('#outlined-basic');
        const currentArr = keyboardInput.value.split('');
        currentArr.splice(state.currentCursor - 1, 1);
        state.content = currentArr.join('');
        keyboardInput.value = state.content;
        setSearchTerm(keyboardInput.value);
        state.currentCursor -= 1;
        setFocus();
        return;
    }

    const clickCaps = (el) => {
        state.isCaps = !state.isCaps;
        toggleCapsLock(state.isCaps)
        el.classList.toggle("keyboard__key--active");
        setFocus();
    }

    
    const setColor = (elem, elCode) => {
        return Array.from(keyElements).find((el, idx) => {
            if (elem === 'Backspace') {
                if (el.classList.contains('backspace')) {
                    if (keyboardInput.value.length === 0) return;
                    clickBackSpace()
                }
                return el.classList.contains('backspace');
            } else if (elem === 'CapsLock') {
                if (el.classList.contains('caps')) {
                    clickCaps(el);
                    if (state.isShift) getShiftValue(state.lang, state.isCaps, state.isShift);
                }
                return el.classList.contains('caps');
            } else if (elem === " ") {
                if (el.classList.contains('space')) {
                    state.content += " ";
                    keyboardInput.value += " ";
                    state.currentCursor += 1;
                    setFocus();
                }
                return el.classList.contains('space');
            } else if (elem === "Enter") {
                if (el.classList.contains('enter')) clickEnter();
                return el.classList.contains('enter');
            } else if (elem === "Shift") {
                if (el.classList.contains('shift')) {
                    el.classList.toggle("keyboard__key--active");
                    if (!state.isShift && state.isCaps) {
                        state.isShift = true;
                        renderKeyBoard(state.lang, state.isCaps, state.isMute, state.isShift);
                        init()
                        initkeys()
                        setFocus();
                        getShiftValue(state.lang, state.isCaps, state.isShift);
                        return;
                    } else if (state.isShift) {
                        state.isShift = false;
                        renderKeyBoard(state.lang, state.isCaps, state.isMute, state.isShift);
                        init()
                        initkeys()
                        setFocus();
                        return;
                    } else {
                        state.isShift = true;
                        getShiftValue(state.lang, state.isCaps, state.isShift);
                        setFocus();
                        return;
                    }
                }
                return el.classList.contains('shift');
            } else if (elem === 'ArrowLeft') {
                if (el.classList.contains('left-arrow')) {
                    if (state.currentCursor !== 0) {
                        state.currentCursor -= 1;
                    }
                    setFocus();
                }
                return el.classList.contains('left-arrow');
            } else if (elem === 'ArrowRight') {
                if (el.classList.contains('right-arrow')) {
                    if (state.currentCursor <= keyboardInput.value.length - 1) {
                        state.currentCursor += 1;
                    }
                    setFocus();
                }
                return el.classList.contains('right-arrow');
            } else {

                if (el.innerHTML.toLowerCase() === elem.toLowerCase() || (`key${el.innerHTML.toLowerCase()}` === elCode.toLowerCase() || `key${elem.toLowerCase()}` === elCode.toLowerCase())) {
                    if (state.currentCursor + 1 === keyboardInput.value.length + 1) {
                        state.currentCursor += 1;
                        setFocus()
                    }
                }
                return el.innerHTML.toLowerCase() === elem.toLowerCase();
            }
        })
    }
}

export default listen;
