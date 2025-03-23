import iziToast from "izitoast";

// create a template
function processImage({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  const liTemplate = `
  <div class="gallery-item">
    <li>
      <a class="gallery-link" href="${largeImageURL}">
        <img
          class="gallery-image"
          src="${webformatURL}"
          alt="${tags}"
        />
      </a>
    </li>
    <ul class="gallery-ul">
      <li class="gallery-li">
        <p>Likes</p>
        <p>${likes}</p>
      </li>
      <li class="gallery-li">
        <p>Views</p>
        <p>${views}</p>
      </li>
      <li class="gallery-li">
        <p>Comments</p>
        <p>${comments}</p>
      </li>
      <li class="gallery-li">
        <p>Downloads</p>
        <p>${downloads}</p>
      </li>
    </ul>
  </div>`;
  return liTemplate;
}

function updateGallery(photos) {
  return photos.map(processImage).join("");
}

export { updateGallery };
