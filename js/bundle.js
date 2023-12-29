/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./assets/js/modules/carousel.js":
/*!***************************************!*\
  !*** ./assets/js/modules/carousel.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const carouselFunc = () => {
  // Задание 4

  const getResouse = async (url) => {
    const response = await fetch(url)
    return response.json() // возвращаем промис
  }

  function cardContent(mass) {
    // Создаем функцию, которая в соответствии с каждым обьектом из входного массива создет внутри carousel__wrapper div'ы
    // с классом carousel__item
    const carousel = document.querySelector(".carousel__wrapper")

    for (let i = 0; i < mass.length; i++) {
      const carouselItem = document.createElement("div")
      carouselItem.classList.add("carousel__item")
      carouselItem.innerHTML = `
      <img src=${mass[i].cardImg.src} alt=${mass[i].cardImg.alt} />
      <div class="carousel__content">
        <h4>${mass[i].header}</h4>
        <p>
        ${mass[i].descr}
        </p>
        <div class="item__last-row">
          <img src=${mass[i].authorImg.src} alt=${mass[i].authorImg.alt} />
          <div class="text-button-pay">
            <a href="#">Pay <i class="fa fa-angle-double-right"></i></a>
          </div>
        </div>
      </div>
      `
      carousel.append(carouselItem)
    }
  }

  getResouse("http://localhost:3000/cards").then((response) => {
    cardContent(response)
  })
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (carouselFunc);


/***/ }),

/***/ "./assets/js/modules/features.js":
/*!***************************************!*\
  !*** ./assets/js/modules/features.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const featuresFunc = () => {
  // Задание 1
  /*В первом задании проверка соответствия скрытого контента нужному features-элементу реализована через
    проверку значения соответствующего дата-атрибута. В последующих заданиях я обычно буду проверять
    соответствие через порядковый номер
  */

  const features = document.querySelectorAll(".features-content"),
    content = document.querySelectorAll(".content-hide")

  // Создаем две функции, одна из которых показывает скрытый контент, а другая снова скрывает его

  function showContent(id) {
    content.forEach((item) => {
      const data = item.getAttribute("data-content")
      if (id === data) {
        item.style.display = "block"
      }
    })
  }

  function hideContent(id) {
    content.forEach((item) => {
      const data = item.getAttribute("data-content")
      if (id === data) {
        item.style.display = "none"
      }
    })
  }

  features.forEach((item) => {
    // Создаем два обработчика событий на наведение курсора мыши на элемент , и на покидание курсора мыши элемента
    item.addEventListener("mouseover", (event) => {
      const itemId = item.getAttribute("data-content")
      showContent(itemId)
    })
    item.addEventListener("mouseout", (event) => {
      const itemId = item.getAttribute("data-content")
      hideContent(itemId)
    })
  })
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (featuresFunc);


/***/ }),

/***/ "./assets/js/modules/form.js":
/*!***********************************!*\
  !*** ./assets/js/modules/form.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const formFunc = () => {
  const form = document.querySelector("#contact")
  const button = document.querySelector("#button")

  form.addEventListener("submit", (event) => {
    event.preventDefault()
    const objData = {}
    const formData = new FormData(form)
    formData.forEach((value, key) => {
      objData[key] = value
    })
    postRequest("http://localhost:3000/requests", objData)
      .then((obj) => {
        event.preventDefault()
        form.reset()
        const text = document.createElement("div")
        text.innerHTML = "<span>Форма успешно отправлена</span>"
        button.append(text)
      })
      .catch((error) => console.error("Ошибка"))
  })

  async function postRequest(url, data) {
    const response = await fetch(url, {
      method: "POST", // GET, POST, PUT, PATCH, DELETE
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    })
    return response.json()
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (formFunc);


/***/ }),

/***/ "./assets/js/modules/tabs.js":
/*!***********************************!*\
  !*** ./assets/js/modules/tabs.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const tabsFunc = () => {
  // Задание 2

  const tabs = document.querySelectorAll("[data-tabs]"),
    tabsContent = document.querySelectorAll("#tabs-content")

  function hideTabs() {
    // Создаем функцию, которая скрывает все блоки с информацией
    tabsContent.forEach((item) => {
      item.style.display = "none"
    })
  }

  function showTabs(i) {
    // Создаем функцию, которая показывает выбранный блок информации
    tabsContent[i].style.display = "block"
  }

  hideTabs()
  showTabs(0)
  // Скрываем все блоки, кроме первого

  tabs.forEach((item, index) => {
    // Создаем функцию, которая при нажатии на соответствующий таб выдает нужный блок информации
    item.addEventListener("click", (e) => {
      hideTabs()
      showTabs(index)
      // Нужно также показать, какой из табов сейчас активирован. Делаем это через добавления класса ui-tabs-active нужному табу
      // Соответственно для этого нужно убрать класс активации у всех табов и добавить активированному
      tabs.forEach((el) => {
        el.parentElement.classList.remove("ui-tabs-active")
      })
      item.parentElement.classList.add("ui-tabs-active")
    })
  })
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabsFunc);


/***/ }),

/***/ "./assets/js/modules/time.js":
/*!***********************************!*\
  !*** ./assets/js/modules/time.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const timeFunc = () => {
  // Задание 3

  const deadline = "2023-12-31", // В переменную deadline запишем дату до которой ведется счет
    counter = document.querySelector(".counter"),
    days = counter.querySelector(".days .value"),
    hours = counter.querySelector(".hours .value"),
    minutes = counter.querySelector(".minutes .value"),
    seconds = counter.querySelector(".seconds .value")
  // находим все необходимые для счетчика элементы в HTML-документе

  function getTime(time) {
    // Создаем функцию, которая считает разницу между текущем временем и временем дедлайна в миллисекундах, секундах,
    // минутах, часах и днях соответсвенно
    const t = Date.parse(time) - Date.parse(new Date()),
      days = Math.floor(t / (1000 * 60 * 60 * 24)),
      hours = Math.floor((t / (1000 * 60 * 60)) % 24),
      minutes = Math.floor((t / 1000 / 60) % 60),
      seconds = Math.floor((t / 1000) % 60)

    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    }
  }

  function getZero(num) {
    // Создаем вспомогательную функцию (для красоты счетчика), которая будет добавлять ноль перед числом, если оно меньше 10
    if (num >= 0 && num < 10) {
      return "0" + num
    } else {
      return num
    }
  }

  function setTime(time) {
    // Функция setTime создает интервал в 1с, которая обновляет счетчик
    const timeInterval = setInterval(updateTime, 1000)

    function updateTime() {
      // Функция updateTime заполняет элементы HTML документа значениями полученными из функции getTime
      const t = getTime(time)

      days.innerHTML = getZero(t.days)
      hours.innerHTML = getZero(t.hours)
      minutes.innerHTML = getZero(t.minutes)
      seconds.innerHTML = getZero(t.seconds)

      if (t.total <= 0) {
        // и в том случае, если разница во времени получення в миллисекундах будет меньше или равна нулю
        clearInterval(timeInterval) // мы прекращаем действие интервала
      }
    }
  }

  setTime(deadline)
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timeFunc);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*******************************!*\
  !*** ./assets/js/homework.js ***!
  \*******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_features__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/features */ "./assets/js/modules/features.js");
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/tabs */ "./assets/js/modules/tabs.js");
/* harmony import */ var _modules_time__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/time */ "./assets/js/modules/time.js");
/* harmony import */ var _modules_carousel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/carousel */ "./assets/js/modules/carousel.js");
/* harmony import */ var _modules_form__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/form */ "./assets/js/modules/form.js");
/*
Задания

В вёрстку можно вносить любые изменения (добавлять классы, дата-артрибуты, id и так далее) без изменения внешнего вида. Нельзя изменять другие JS файлы, подключаемые к HTML

    1.  На первом экране вы видите 3 блока с class="features-content". Они внутри себя содержат <div class="content-hide" ></div>, который
        содержит необходимую информацию. При наведении курсора на div с class="features-content" сделайте так, чтобы <div class="content-hide" ></div>
        показывался, а когда уводили курор, то блок с class="features-content" становился предыдущих размеров.

        P.S. Нормально, если при наведении на див с class="features-content" он становится оранжевым - это можно не фиксить

    2.  На втором экране вы видите табы:
        а) Best Education
        б) Top Managemen
        в) Quality Meeting
        При нажатии на каждый из этих табов (квадратик или название) сайтик должен показывать соответствующий блок информации
        с нужной фотографией, описанием и заголовком.

        P.S. Сейчас показаны все блоки с описанием

    3. На третьем экране есть отсчёт обратного времени. Сделайте так, чтобы обратный отсчёт был в режиме реального времени (посекундно).
    В качестве дедлайна (крайней даты) возьмите 31.12.2023

    P.S. Подсказка - в 22_js уроке в проекте Food разбирается, как работать со счётчиком

    4.  На 4-ом экране есть 5 карточек, заполненные информацией. Сделайте так, чтобы верстка подтягивалась и вставлялась в HTML документа
        из JS, а именно из массива coursesMass. Это значит, в самом HTML не должно быть верстки (вам нужно будет удалить),
        и она должна вставляться только через JS

*/







document.addEventListener("DOMContentLoaded", () => {
  (0,_modules_features__WEBPACK_IMPORTED_MODULE_0__["default"])()
  ;(0,_modules_tabs__WEBPACK_IMPORTED_MODULE_1__["default"])()
  ;(0,_modules_time__WEBPACK_IMPORTED_MODULE_2__["default"])()
  ;(0,_modules_carousel__WEBPACK_IMPORTED_MODULE_3__["default"])()
  ;(0,_modules_form__WEBPACK_IMPORTED_MODULE_4__["default"])()
})

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map