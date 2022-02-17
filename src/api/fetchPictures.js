import axios from "axios";

export async function fetchPictures(query) {
    const BASE_URL = 'https://pixabay.com/api';
    const MY_KEY = '25738423-b3273d9a56f64cc8a00238b49';
    const defaultSettings = 'image_type=photo&orientation=horizontal&safesearch=true&per_page=40';

    try {
        const response = await axios.get(`${BASE_URL}/?key=${MY_KEY}&q=${query}&${defaultSettings}`);    
        return response.data;
    } catch (error) {
        console.log(error);
    }
}