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

export default formFunc
