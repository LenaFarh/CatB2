const cardsContainer = document.querySelector('.cards');
const btnOpenPopupForm = document.querySelector('#add');
const formAddCat = document.querySelector('#popup-form-cat');
const popupAddCat = new Popup('popup-add-cats');
popupAddCat.setEventListener();


function handFormAddCat(e) {
e.preventDefault();
const ElemFormCat = [...formAddCat.elements];
const dataFromForm = serialForm(ElemFormCat);
api.addNewCat(dataFromForm);
createCat(dataFromForm); 
popupAddCat.close();
}

//cats.forEach((cat) =>createCat(cat));

btnOpenPopupForm.addEventListener('click', () => popupAddCat.open());
formAddCat.addEventListener('submit', handFormAddCat);

api.getAllCats().then((data) => 
data.forEach((cat) =>{
createCat(cat);
//const btnDelete = document.addEventListener('click', () => 
//deleteCat(cat));
}));

