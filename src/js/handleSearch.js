import iziToast from "izitoast";

import { getPhotos } from "./pixabay-api.js";
import { updateGallery } from "./render-functions.js";
import {
  ACTIVE_CLASS,
  loadMoreButton,
  queryParams,
  refs,
  simpleLight,
} from "./refs.js";
import { readQuery } from "./readForm.js";
import { handleLoadMore } from "./handleLoadMore.js";

function handleSearch(event) {
  // read users query
  queryParams.query = readQuery(event);
  if (!queryParams.query) return;
  queryParams.page = 1;

  // add loader start
  refs.loader.classList.add(ACTIVE_CLASS);

  // get photos from pixabay server and process them
  getPhotos(queryParams)
    .then(photos => {
      // remove loader
      refs.loader.classList.remove(ACTIVE_CLASS);

      console.dir(photos);
      // check received total amount of photos and return if empty
      if (photos.total === 0) {
        refs.gallery.innerHTML = "";
        loadMoreButton.hide();
        iziToast.show({
          title: "",
          message:
            "Sorry, there are no images matching your search query. Please try again!",
        });

        return;
      }

      // store maxpage value
      queryParams.maxPage = Math.ceil(photos.total / queryParams.perPage);
      // update gallery with received photos
      refs.gallery.innerHTML = updateGallery(photos.hits);
      console.log("Max page is: ", queryParams.maxPage);
      console.log("Page is: ", queryParams.page);

      simpleLight.refresh();

      const image = document.querySelector(".gallery-image");
      const rect = image.getBoundingClientRect();

      window.scrollBy({
        //   top: rect.top * 2, // Vertical distance to scroll
        behavior: "smooth", // Smooth scrolling effect
      });

      if (queryParams.page >= queryParams.maxPage) {
        loadMoreButton.hide();
        loadMoreButton.button.removeEventListener("submit", handleSearch);
        return;
      }

      loadMoreButton.show();
      loadMoreButton.button.addEventListener("click", handleLoadMore);
    })
    .catch(err => {
      refs.loader.classList.remove(ACTIVE_CLASS);
      console.log(err);
    })
    .finally(() => {
      refs.form.reset();
    });
}

export { handleSearch };
