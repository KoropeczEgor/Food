"use strict";

import tabs from "./modules/tabs";
import modal from "./modules/modal";
import slider from "./modules/slider";
import timers from "./modules/timers";
import forms from "./modules/forms";
import cards from "./modules/cards";
import calc from "./modules/calc";
import { openModal } from "./modules/modal";

document.addEventListener("DOMContentLoaded", () => {
  //I способ
  // const tabs = require("./modules/tabs");
  // const modal = require("./modules/modal");
  // const slider = require("./modules/slider");
  // const timers = require("./modules/timers");
  // const forms = require("./modules/forms");
  // const cards = require("./modules/cards");
  // const calc = require("./modules/calc");

  //2 способ

  const modalTimerId = setTimeout(
    () => openModal(".modal", modalTimerId),
    2000000
  );

  tabs(
    ".tabheader__item",
    ".tabcontent",
    ".tabheader__items",
    "tabheader__item_active"
  );
  modal("[data-modal]", ".modal", modalTimerId);
  slider({
    container: ".offer__slider",
    slide: ".offer__slide",
    nextArrow: ".offer__slider-next",
    prevArrow: ".offer__slider-prev",
    totalCounter: "#total",
    currentCounter: "#current",
    wrapper: ".offer__slider-wrapper",
    field: ".offer__slider-inner",
  });
  timers(".timer", "2023-09-23");
  forms("form", modalTimerId);
  cards();
  calc();
});
