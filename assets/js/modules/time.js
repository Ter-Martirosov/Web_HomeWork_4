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

export default timeFunc
