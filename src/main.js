import iziToast from "izitoast";
import { getPhotos } from "./js/pixabay-api.js";
import { updateGallery } from "./js/render-functions.js";
import SimpleLightbox from "simplelightbox";

const refs = {
  form: document.querySelector(".js-form"),
  gallery: document.querySelector(".js-gallery"),
  notFoundText: document.querySelector(".js-not-found-text"),
  loader: document.querySelector(".js-loader"),
};

const ACTIVE_CLASS = "active";

function handleSearch(event) {
  event.preventDefault();
  refs.notFoundText.innerHTML = "";

  const form = event.currentTarget;
  const userQuery = form.elements.user_query.value.trim();
  console.dir(userQuery);

  if (userQuery === "") {
    // change to use iziToast
    iziToast.show({
      title: "",
      message: `Введіть будь-ласка запит!`,
    });
    return;
  }

  refs.loader.classList.add(ACTIVE_CLASS);

  getPhotos(userQuery)
    .then(photos => {
      refs.loader.classList.remove(ACTIVE_CLASS);
      console.dir(photos);
      if (photos.total === 0) {
        refs.gallery.innerHTML = "";

        iziToast.show({
          title: "",
          message:
            "Sorry, there are no images matching your search query. Please try again!",
        });
        return;
      }
      refs.gallery.innerHTML = updateGallery(photos.hits);

      new SimpleLightbox(".gallery a", {
        captionsData: "alt",
        captionDelay: 250,
      });
    })
    .catch(err => {
      refs.loader.classList.remove(ACTIVE_CLASS);
      console.log(err);
    })
    .finally(() => {
      form.reset();
    });
}

refs.form.addEventListener("submit", handleSearch);
