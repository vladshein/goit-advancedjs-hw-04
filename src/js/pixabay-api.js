// Описаний в документації
import axios from "axios";

const BASE_URL = "https://pixabay.com/api/";
const API_KEY = "49486452-3d44cfba97bed6ab675a762ac";

async function getPhotos({ page, perPage, query }) {
  const params = new URLSearchParams({
    key: API_KEY,
    q: query,
    page: page,
    per_page: perPage,
    image_type: "photo",
    orientation: "horizontal",
    safesearch: true,
  });

  return (await axios.get(`${BASE_URL}?${params}`)).data;
}

export { getPhotos };
