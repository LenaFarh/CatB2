function createCat (data) {
    const cardInstance = new Card(data, '#card-template');
    const newCardElement = cardInstance.getElement();
    cardsContainer.append(newCardElement);
  }

  function serialForm(el){
    const formData = {}
    el.forEach((input)=>{
      console.log(input.name); 
      if (input.type==='submit') return;
      if (input.type !=='checkbox') {
        formData[input.name] = input.value;
      }
      if (input.type ==='checkbox') {
        formData[input.name] = input.checked;
      }
    })
    return formData;
    }