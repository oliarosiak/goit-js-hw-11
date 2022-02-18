import './css/styles.css';
import Notiflix from 'notiflix';
import { refs } from './partials/refs';
import { fetchPictures } from './api/fetchPictures';
import { picturesMarkup } from './partials/picturesMarkup';
import { smoothFirstScroll, smoothLoadMoreScroll } from './partials/smooth';

refs.loadMoreBtn.disabled = true;

let searchQuery = '';
let pageNumber = 1;

refs.formRef.addEventListener('submit', onFormSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMoreBtn);

function onFormSubmit(event) {
    event.preventDefault();    
    searchQuery = refs.inputRef.value.trim();     

    clearPictureList();

    if (searchQuery === '') {
        return;
    };    
            
    fetchPictures(searchQuery, pageNumber)
        .then(pictures => {

            if (pictures.hits.length === 0) {
                Notiflix.Notify.warning('Sorry, there are no images matching your search query. Please try again.'); 
                return;
            }
            
            Notiflix.Notify.success(`We found ${pictures.totalHits} pictures`);

            if(pictures.hits.length < 40) {                
                refs.loadMoreBtn.disabled = true;  
            } else {       
                setTimeout(() => {
                    refs.loadMoreBtn.disabled = false;
                }, 1000);
            }
        
            picturesMarkup(pictures);  
            smoothFirstScroll();
        })
        .catch(onError);       
}

function onLoadMoreBtn() {
    pageNumber += 1;

    fetchPictures(searchQuery, pageNumber)
        .then(pictures => {         
            
            if (pictures.hits.length < 40) {
                Notiflix.Notify.failure('We\'re sorry, but you\'ve reached the end of search results.');
                refs.loadMoreBtn.disabled = true;
            }

            picturesMarkup(pictures);
            smoothLoadMoreScroll();
        })
        .catch(onError);
}

function clearPictureList() {
    refs.picturesWrapper.innerHTML = '';  
    refs.loadMoreBtn.disabled = true;
    pageNumber = 1;
}

function onError() {
    Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
}

