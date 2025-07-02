import "./js/services";

import "./style.css";

import Swiper from "swiper";
import {
  Navigation,
  Pagination,
  Scrollbar,
  Keyboard,
  Mousewheel,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function initResponsiveSwiper(selector, breakpointsConfig) {
  const container = document.querySelector(selector);
  const slidesCount = container.querySelectorAll(".swiper-slide").length;

  const screenWidth = window.innerWidth;
  let slidesPerView = 1;

  if (screenWidth >= 1440 && breakpointsConfig[1440]) {
    slidesPerView = breakpointsConfig[1440].slidesPerView;
  } else if (screenWidth >= 834 && breakpointsConfig[834]) {
    slidesPerView = breakpointsConfig[834].slidesPerView;
  } else if (breakpointsConfig[375]) {
    slidesPerView = breakpointsConfig[375].slidesPerView;
  }

  if (slidesCount <= slidesPerView) {
    container.classList.add("hide-swiper-nav");
  }

  return new Swiper(selector, {
    modules: [Pagination, Navigation],
    loop: true,
    breakpoints: breakpointsConfig,
    pagination: {
      el: `${selector} .swiper-pagination`,
      clickable: true,
    },
    navigation: {
      nextEl: `${selector} .swiper-button-next`,
      prevEl: `${selector} .swiper-button-prev`,
    },
  });
}
initResponsiveSwiper(".swiper-one", {
  375: { slidesPerView: 1, spaceBetween: 16 },
  834: { slidesPerView: 2, spaceBetween: 24 },
  1440: { slidesPerView: 3, spaceBetween: 32 },
});

initResponsiveSwiper(".swiper-two", {
  375: { slidesPerView: 1, spaceBetween: 16 },
  834: { slidesPerView: 2, spaceBetween: 1 },
  1440: { slidesPerView: 3, spaceBetween: 1 },
});

initResponsiveSwiper(".swiper-three", {
  375: { slidesPerView: 1, spaceBetween: 16 },
  834: { slidesPerView: 4, spaceBetween: 20 },
  1440: { slidesPerView: 4, spaceBetween: 24 },
});

initResponsiveSwiper(".swiper-four", {
  375: { slidesPerView: 2, spaceBetween: 1 },
  834: { slidesPerView: 3, spaceBetween: 2 },
  1440: { slidesPerView: 6, spaceBetween: 1 },
});

initResponsiveSwiper(".swiper-five", {
  375: { slidesPerView: 1, spaceBetween: 16 },
  834: { slidesPerView: 2, spaceBetween: 2 },
  1440: { slidesPerView: 3, spaceBetween: 10 },
});
initResponsiveSwiper(".swiper-six", {
  375: { slidesPerView: 1, spaceBetween: 16 },
  834: { slidesPerView: 1, spaceBetween: 20 },
  1440: { slidesPerView: 1, spaceBetween: 24 },
});

document.querySelectorAll(".faq-question").forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.parentElement;
    item.classList.toggle("active");
  });
});

const openButtons = document.querySelectorAll(".open-modal");
const closeButtons = document.querySelectorAll(".close-modal");
const modals = document.querySelectorAll(".modal");

// Відкрити потрібну модалку
openButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const modalId = btn.dataset.modal;
    document.getElementById(modalId).classList.remove("hidden");
    document.body.classList.add("noscroll");
  });
});

// Закрити всі модалки
closeButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.closest(".modal").classList.add("hidden");
    document.body.classList.remove("noscroll");
  });
});

modals.forEach((modal) => {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.add("hidden");
    }
  });
});

const menuModal = document.getElementById("modal-menu");
const menuLinks = menuModal.querySelectorAll(".menu-link-modal");

menuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    menuModal.classList.add("hidden");
  });
});

const adviceBtns = document.querySelectorAll(".adviceBtn");
const advicePopup = document.getElementById("advicePopup");
const adviceClose = document.getElementById("adviceClose");

adviceBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    advicePopup.style.display = "flex";
    document.body.classList.add("noscroll");
  });
});

adviceClose.addEventListener("click", () => {
  advicePopup.style.display = "none";
  document.body.classList.remove("noscroll");
});

const forms = document.querySelectorAll(".contact-form");
const status = document.getElementById("form-status");

forms.forEach((form) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = new FormData(form);

    fetch(
      "https://script.google.com/macros/s/AKfycbyg96NKhzvGYMXwMrWFT3scDg3J35u7AeisJr1YhXqRSWJXG27VX40Xeh2cLrjXpnHJtQ/exec",
      {
        method: "POST",
        body: data,
      }
    )
      .then(() => {
        document
          .querySelectorAll(".modal")
          .forEach((m) => m.classList.add("hidden"));

        const statusModal = document.getElementById("form-status");
        statusModal.style.display = "flex";
        document.body.classList.add("noscroll");
        form.reset();
      })
      .catch((error) => {
        console.error("Помилка:", error);
        alert("Сталася помилка, спробуйте ще раз.");
      });
  });
});

document.querySelector(".close-status").addEventListener("click", () => {
  const statusModal = document.getElementById("form-status");
  statusModal.style.display = "none";
  document.body.classList.remove("noscroll");
});

const formStatus = document.getElementById("form-status");
const closeStatusBtn = document.querySelector(".close-status");

closeStatusBtn.addEventListener("click", () => {
  formStatus.style.display = "none";
});
