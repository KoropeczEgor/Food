import { closeModal, openModal } from "./modal";
import { postData } from "../services/services";

function forms(formSelector, modalTimerId) {
  //ОТПАВЛЕНИЯ ДАННЫХ FORMS

  const forms = document.querySelectorAll(formSelector);
  const message = {
    loading: "Загрузка...",
    success: "Спасибо! Скоро мы с вами свяжемся",
    failure: "Что-то пошло не так...",
  };

  forms.forEach((item) => {
    baindPostData(item);
  });

  function baindPostData(form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      let statusMessage = document.createElement("img");
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
          display: block;
          margin: 0 auto;
      `;
      form.insertAdjacentElement("afterend", statusMessage);

      const formData = new FormData(form);

      const json = JSON.stringify(Object.fromEntries(formData.entries()));
      // const object = {};
      // formData.forEach(function (value, key) {
      //   object[key] = value;
      // });

      // fetch("server.php", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(object),
      // });
      postData("http://localhost:3000/requests", json)
        .then((data) => {
          console.log(data);
          showThanksModal(message.success);
          statusMessage.remove();
        })
        .catch(() => {
          showThanksModal(message.failure);
        })
        .finally(() => {
          form.reset();
        });
    });
  }

  function showThanksModal(message) {
    const prevModalDialog = document.querySelector(".modal__dialog");

    prevModalDialog.classList.add("hide");
    openModal(".modal", modalTimerId);

    const thanksModal = document.createElement("div");
    thanksModal.classList.add("modal__dialog");
    thanksModal.innerHTML = `
      <div class="modal__content">
          <div class="modal__close" data-close>×</div>
          <div class="modal__title">${message}</div>
      </div>
  `;
    document.querySelector(".modal").append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add("show");
      prevModalDialog.classList.remove("hide");
      closeModal(".modal");
    }, 4000);
  }
  //     let statusMessage = document.createElement("div");
  //     statusMessage.classList.add("status");
  //     statusMessage.textContent = message.loading;
  //     form.appendChild(statusMessage);

  //     const request = new XMLHttpRequest();
  //     request.open("POST", "server.php");
  //     request.setRequestHeader(
  //       "Content-type",
  //       "application/json; charset=utf-8"
  //     );
  //     const formData = new FormData(form);

  //     const object = {};
  //     formData.forEach(function (value, key) {
  //       object[key] = value;
  //     });
  //     const json = JSON.stringify(object);

  //     request.send(json);

  //     request.addEventListener("load", () => {
  //       if (request.status === 200) {
  //         console.log(request.response);
  //         showThanksModal(message.success);
  //         statusMessage.remove();
  //         form.reset();
  //       } else {
  //         showThanksModal(message.failure);
  //       }
  //     });
  //   });
  // }

  fetch("http://localhost:3000/menu")
    .then((data) => data.json())
    .then((res) => console.log(res));
}

//I способ
// module.exports = forms;

export default forms;
