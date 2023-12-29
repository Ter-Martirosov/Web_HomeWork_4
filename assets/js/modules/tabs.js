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

export default tabsFunc
