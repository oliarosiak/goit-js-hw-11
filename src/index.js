import './css/styles.css';
import Notiflix from 'notiflix';
import { fetchPictures } from './api/fetchPictures';
import { picturesMarkup } from './partials/picturesMarkup';


/**
 * Notiflix.Notify.success('Sol lucet omnibus');
 * Notiflix.Notify.failure('Qui timide rogat docet negare');
 * Notiflix.Notify.warning('Memento te hominem esse');
 * Notiflix.Notify.info('Cogito ergo sum');
*/

const formRef = document.querySelector('form#search-form');
const inputRef = document.querySelector('input[name="searchQuery"]');
const picturesWrapper = document.querySelector('div.gallery');
let loadMoreBtn = document.querySelector('button.load-more');
loadMoreBtn.disabled = true;

formRef.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
    event.preventDefault();
    const searchQuery = inputRef.value.trim(); 

    Notiflix.Notify.info('Запит відбувся');
    clearPictureList();
    loadMoreBtn.disabled = false;
    Notiflix.Notify.info('Поле очистилося');
    
    
    fetchPictures(searchQuery, pageNumber)
        .then(pictures => {
            Notiflix.Notify.success(`We found ${pictures.hits.length} pictures`);
            picturesWrapper.innerHTML = picturesMarkup(pictures);
        })
        .catch(onError);    
   
}

function onError() {
    Notiflix.Notify.failure('Sorry, please try again.');
}

function clearPictureList() {
    picturesWrapper.innerHTML = '';
    loadMoreBtn.disabled = true;
}


