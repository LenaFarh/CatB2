export class Popup {
    constructor(className) {
      this._className = className;
      this.popup = document.querySelector(`.${className}`);
      this._handEsc = this._handEsc.bind(this);
    }
  
    _handEsc(e) {
    if (e.key==='Escape') {
    this.close();
    }
    }

    setContent(contentNode) {
      const containerContent= this.popup.querySelector(".popup__content");
      containerContent.innerHTML= '';
      containerContent.append(contentNode)
    }

    open() {
      this.popup.classList.add('popup_active');
      document.addEventListener('keyup', this._handEsc)
    }
  
    close() {
      this.popup.classList.remove('popup_active');
      document.removeEventListener('keyup', this._handEsc)
    }
  
  setEventListener() {
    this.popup.addEventListener('click', (e)=>{
      if (e.target.classList.contains(this._className) || e.target.closest('.popup__close')) {
        this.close()
      }
    })
  }
}
