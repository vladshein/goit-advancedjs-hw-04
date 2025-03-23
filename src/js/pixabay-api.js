// Описаний в документації
import iziToast from "izitoast";

const BASE_URL = "https://pixabay.com/api/";
const API_KEY = "49371297-53cf19ada26e8c05638a83539";

function getPhotos(query) {
  const params = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: "photo",
    orientation: "horizontal",
    safesearch: true,
  });
  return fetch(`${BASE_URL}?${params}`).then(res => {
    if (!res.ok) {
      throw new Error(res.status);
    }

    return res.json();
  });
}

export { getPhotos };
