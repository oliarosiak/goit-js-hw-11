function smoothFirstScroll() {
    const { height: cardHeight } = document.querySelector('.gallery').firstElementChild.getBoundingClientRect();

    window.scrollBy({
    top: cardHeight * 0.3,
    behavior: 'smooth',
    });
}

function smoothLoadMoreScroll() {
    const { height: cardHeight } = document.querySelector('.gallery').firstElementChild.getBoundingClientRect();

    window.scrollBy({
    top: cardHeight * 1.8,
    behavior: 'smooth',
    });
}

export { smoothFirstScroll, smoothLoadMoreScroll };