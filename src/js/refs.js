import LoadMoreButton from "./buttonService";
import SimpleLightbox from "simplelightbox";

const refs = {
  form: document.querySelector(".js-form"),
  gallery: document.querySelector(".js-gallery"),
  notFoundText: document.querySelector(".js-not-found-text"),
  loader: document.querySelector(".js-loader"),
  loadMoreBtn: document.querySelector(".js-load-more"),
};

const ACTIVE_CLASS = "active";

const queryParams = {
  page: 1,
  perPage: 15,
  query: "",
  maxPage: 1,
};

const loadMoreButton = new LoadMoreButton(refs.loadMoreBtn);
const simpleLight = new SimpleLightbox(".gallery a", {
  captionsData: "alt",
  captionDelay: 250,
});

export { refs, ACTIVE_CLASS, queryParams, loadMoreButton, simpleLight };
