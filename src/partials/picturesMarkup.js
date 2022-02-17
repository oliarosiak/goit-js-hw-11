export function picturesMarkup(obj) {
    const array = obj.hits;

    if (array.length === 0) {
        Notiflix.Notify.warning('Sorry, there are no images matching your search query. Please try again.');      
    }

    const cardsLayout = array.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
        return `
        <div class="photo-card">
            <img src="${webformatURL}" alt="${tags}" loading="lazy" />
            <div class="info">
                <p class="info-item">
                <b>Likes</b>
                ${likes}
                </p>
                <p class="info-item">
                <b>Views</b>
                ${views}
                </p>
                <p class="info-item">
                <b>Comments</b>
                ${comments}
                </p>
                <p class="info-item">
                <b>Downloads</b>
                ${downloads}
                </p>
            </div>
        </div>`
    }).join('');

    return cardsLayout;
}