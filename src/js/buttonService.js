export default class LoadMoreButton {
  static HIDDEN_CLASS = "is-hidden";

  constructor(buttonEl) {
    this.button = buttonEl;
    this.prevText = "";
  }

  disable() {
    this.button.disabled = true;
    this.prevText = this.button.textContent;
    this.button.textContent = "Loading...";
  }

  enable() {
    this.button.disabled = false;
    this.button.textContent = this.prevText || this.button.textContent;
  }

  hide() {
    this.button.classList.add(LoadMoreButton.HIDDEN_CLASS);
  }

  show() {
    this.button.classList.remove(LoadMoreButton.HIDDEN_CLASS);
  }
}

export { LoadMoreButton };
