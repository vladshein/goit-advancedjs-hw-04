import iziToast from "izitoast";
import { refs } from "./refs";

function readQuery(event) {
  event.preventDefault();
  refs.notFoundText.innerHTML = "";

  const form = event.currentTarget;
  const userQuery = form.elements.user_query.value.trim();
  console.dir(userQuery);

  if (userQuery === "") {
    iziToast.show({
      title: "",
      message: `Введіть будь-ласка запит!`,
    });
    return;
  }

  return userQuery;
}

export { readQuery };
