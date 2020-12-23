import Keyboard from './view/keyboard';
import listen from './controller/listeners';
import './media.css';
import './style.css';

class KeyboardView {
  render(setSearchTerm, searchTerm) {
    Keyboard.init();
    listen(setSearchTerm, searchTerm);
  }
}

export default new KeyboardView();
