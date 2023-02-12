import { api } from './api.js';
import { Popup } from './popup.js';
import { PopupImage } from './popup-image.js';
import { serialForm } from './utils.js';
import { CatsInfo } from './cats-info.js';
import { Card } from './card.js';

const cardsContainer = document.querySelector('.cards');
const btnOpenPopupForm = document.querySelector('#add');
const formAddCat = document.querySelector('#popup-form-cat');

const popupAddCat = new Popup('popup-add-cats');
popupAddCat.setEventListener();

const popupCatInfo = new Popup('popup-cat-info');
popupCatInfo.setEventListener();

const popupImage = new PopupImage('popup-image');
popupImage.setEventListener();


const catsInfoInstance = new CatsInfo(
  '#cats-info-template',
  handleEditCatInfo,
  handleLike,
  handleCatDelete
)

const catsInfoElement = catsInfoInstance.getElement()

function createCat(data) {
  const cardInstance = new Card(
    data,
    "#card-template",
    handleCatTitle,
    handleCatImage,
    handleLike);
  const newCardElement = cardInstance.getElement();
  cardsContainer.append(newCardElement);
}

function handFormAddCat(e) {
  e.preventDefault();
  const ElemFormCat = [...formAddCat.elements];
  const dataFromForm = serialForm(ElemFormCat);
  api.addNewCat(dataFromForm);
  createCat(dataFromForm);
  popupAddCat.close();
}

function updateLocalStorage(data, action) {
  const oldstorag = JSON.parse(localStorage.getItem('cats'))

  switch (action.type) {
    case 'ADD_CAT':
      oldstorag.push(data);
      localStorage.setItem('cats', JSON.stringify(oldstorag))
      return;
    case 'ALL_CATS':
      localStorage.setItem('cats', JSON.stringify(data));
      setDataRefresh(MAX_LIVE_STORAGE, 'catsRefresh');
      return;
    case 'DELETE_CAT':
      const newStorag = oldstorag.filter(cat => cat.id !== data.id)
      localStorage.setItem('cats', JSON.stringify(newStorag))
      return;
    case 'EDIT_CAT':
      const updateStorag = oldstorag.map(cat => cat.id === data.id ? data : cat)
      localStorage.setItem('cats', JSON.stringify(updateStorag))

      return
    default:
      break
  }
}

function handleCatTitle(cardInstance) {
  catsInfoInstance.setData(cardInstance)
  popupCatInfo.setContent(catsInfoElement)
  popupCatInfo.open()
}

function handleCatImage(dataCard) {
  popupImage.open(dataCard)
}

function handleLike(data, cardInstance) {
  const { id, favorite } = data;
  api.updateCatById(id, { favorite })
    .then(() => {
      if (cardInstance) {
      cardInstance.setData(data);
      cardInstance.updateView();
      }
      
      updateLocalStorage(data, { type: 'EDIT_CAT' });
    })
}

function handleCatDelete(cardInstance) {
  console.log(cardInstance)
  api.deleteCatsId(cardInstance.getId())
    .then(() => {
      cardInstance.deleteView()
      updateLocalStorag(cardInstance.getData(), { type: 'DELETE_CAT' })
      popupCatInfo.close()
    })
}

function handleEditCatInfo(cardInstance, data) {
  const { age, description, name, id } = data;
  api.updateCatById(id, { age, description, name })
    .then(() => {
      cardInstance.setData(data);
      cardInstance.updateView();
      updateLocalStorage(data, { type: 'EDIT_CAT' })
      popupCatInfo.close();
    })
}

btnOpenPopupForm.addEventListener('click', () => popupAddCat.open());
formAddCat.addEventListener('submit', handFormAddCat);

api.getAllCats().then((data) =>
  data.forEach((cat) => {
    createCat(cat);
  }));

