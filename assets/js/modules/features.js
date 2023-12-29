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

export default featuresFunc
