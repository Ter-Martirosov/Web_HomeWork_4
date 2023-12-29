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

export default carouselFunc
