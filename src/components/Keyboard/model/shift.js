/* eslint-disable array-callback-return */
const specialsSimbolsEN = {
    '0': ')',
    '1': '!',
    '2': '@',
    '3': '#',
    '4': '$',
    '5': '%',
    '6': '^',
    '7': '&',
    '8': '*',
    '9': '(',
    '-': '_',
    '=': '+',
    '[': '{',
    ']': '}',
    ';': ':',
    '\'': '"',
    '\\': '|',
    ',': '<',
    '.': '>',
    '/': '?',
}

const specialsSimbolsRU = {
    '0': ')',
    '1': '!',
    '2': '"',
    '3': '№',
    '4': ';',
    '5': '%',
    '6': ':',
    '7': '?',
    '8': '*',
    '9': '(',
    '-': '_',
    '=': '+',
    '[': '{',
    ']': '}',
    '\\': '/',
    '.': ',',
}

const getShiftValue = (lang, isCaps, isShift) => {
    const symbolArr = lang  === 'EN' ?  specialsSimbolsEN : specialsSimbolsRU;
    const keyboard__key  = document.querySelectorAll('.keyboard__key');
    const shiftArr =  Array.from(keyboard__key).map(key => {
        if(key.innerHTML.length > 3) return;
        if(symbolArr[key.innerHTML.toString()] === '<') return key.innerHTML = "<";
        if(symbolArr[key.innerHTML.toString()] === '>') return key.innerHTML = ">";

        if(symbolArr[key.innerHTML.toString()] !== undefined) return key.innerHTML = symbolArr[key.innerHTML.toString()];
        if(key.classList.contains('lang')) return key.innerText.toString().toUpperCase();
       return key.innerText =  isCaps && isShift ? key.innerText.toString().toLowerCase() : key.innerText.toString().toUpperCase();

    })
    return shiftArr;
}

export default getShiftValue;