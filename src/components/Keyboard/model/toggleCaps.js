const toggleCapsLock = (isCaps) => {
const allKey = document.querySelectorAll('.keyboard__key--elem');
allKey.forEach(key => {
    key.textContent = isCaps ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
})
}

export default toggleCapsLock;