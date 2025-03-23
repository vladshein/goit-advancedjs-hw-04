import { handleSearch } from "./handleSearch";
import { getPhotos } from "./pixabay-api";
import { loadMoreButton, queryParams, refs, simpleLight } from "./refs";
import { updateGallery } from "./render-functions";
import iziToast from "izitoast";

async function handleLoadMore(event) {
  queryParams.page += 1;
  loadMoreButton.disable();
  console.log("Page is: ", queryParams.page);

  // check if current page is maxpage
  if (queryParams.page >= queryParams.maxPage) {
    iziToast.show({
      title: "",
      message: "We're sorry, but you've reached the end of search results.",
    });
    loadMoreButton.hide();
    loadMoreButton.button.removeEventListener("submit", handleSearch);
    return;
  }

  // if there is still more photos, try to get them
  try {
    const photos = await getPhotos(queryParams);

    if (photos.total === 0) {
      loadMoreButton.hide();
      loadMoreButton.button.removeEventListener("click", handleLoadMore);
      return;
    }

    // update gallery
    const postsMarkup = updateGallery(photos.hits);

    refs.gallery.insertAdjacentHTML("beforeend", postsMarkup);

    // add Simplebox delay and alt
    simpleLight.refresh();

    // smooth scrolling
    const image = document.querySelector(".gallery-image");
    const rect = image.getBoundingClientRect();

    window.scrollBy({
      top: rect.height * 2, // Vertical distance to scroll
      behavior: "smooth", // Smooth scrolling effect
    });

    // enable button
    loadMoreButton.enable();
    if (queryParams.page >= queryParams.maxPage) {
      iziToast.show({
        title: "",
        message: "We're sorry, but you've reached the end of search results.",
      });
      loadMoreButton.hide();
      loadMoreButton.button.removeEventListener("submit", handleSearch);
    }
  } catch (err) {
    console.log(err);
    loadMoreButton.hide();
  }
}

export { handleLoadMore };
