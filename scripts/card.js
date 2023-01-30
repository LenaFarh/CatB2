
    class Card {
        constructor(dataCat, selectorTemplate) {
          this._data = dataCat;
          this._selectorTemplate = selectorTemplate;
        }
      
        _getTemplate() {  
          return document.querySelector(this._selectorTemplate).content.querySelector('.card');
        }

        getElement() {
          this.element = this._getTemplate().cloneNode(true);
          const cardTitle = this.element.querySelector('.card__name');
          const cardImage = this.element.querySelector('.card__image');
          const cardLike = this.element.querySelector('.card__like');
         // const cardDelete = this.element.querySelector('.card__delete');
          //cardDelete.classList.add(`${this._data.id}`);
      
          if (!this._data.favorite) {
            cardLike.remove();
          }
      
          cardTitle.textContent = this._data.name ?? 'Barsik';
          cardImage.src = this._data.image || 'https://http.cat/404';
          return this.element;
        }
        
      }

      