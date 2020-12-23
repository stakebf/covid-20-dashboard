import en from '../assets/sound/en.mp3';
import backpace from '../assets/sound/backpace.mp3';
import enter from '../assets/sound/enter.mp3';
import ru from '../assets/sound/ru.mp3';
import shift from '../assets/sound/shift.mp3';
import special from '../assets/sound/special.mp3';

const makeSound = (type) => {
    const audios = {
        en: en,
        backpace: backpace,
        enter: enter,
        ru: ru,
        shift: shift,
        special: special
    }
    const audio = new Audio(audios[type]);
    audio.play();
}

export default makeSound;
