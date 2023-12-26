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
})

// Задание 4

const getResouse = async (url) => {
  const response = await fetch(url)
  return response.json() // возвращаем промис
}

function cardContent(mass) {
  // Создаем функцию, которая заполняет div'ы с классом carousel__item из HTML-документа соответсвующей информацией,
  // полученной из массива coursesMass
  const carousel = document.querySelector(".carousel__wrapper")

  for (item of mass) {
    const carouselItem = document.createElement("div")
    carouselItem.classList.add("carousel__item")
    carouselItem.innerHTML = `
    <img src=${item.cardImg.src} alt=${item.cardImg.alt} />
    <div class="carousel__content">
      <h4>${item.header}</h4>
      <p>
      ${item.descr}
      </p>
      <div class="item__last-row">
        <img src=${item.authorImg.src} alt=${item.authorImg.alt} />
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
