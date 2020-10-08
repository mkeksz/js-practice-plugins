let fruits = [
  {
    id: 1,
    title: 'Яблоки',
    price: 20,
    img: '//s1.1zoom.ru/big7/593/Apples_Closeup_Red_Three_490685.jpg',
  },
  {
    id: 2,
    title: 'Апельсины',
    price: 30,
    img: '//i.artfile.ru/1920x1200_597563_%5Bwww.ArtFile.ru%5D.jpg',
  },
  {
    id: 3,
    title: 'Манго',
    price: 40,
    img: '//static.tildacdn.com/tild6365-3562-4733-b961-643337313038/Mango2.jpeg',
  },
]

const toHTML = (fruit) => `
  <div class="col">
    <div class="card">
      <img
        style="height: 300px; object-fit: contain"
        class="card-img-top"
        src="${fruit.img}"
        alt="${fruit.title}"
      />
      <div class="card-body">
        <h5 class="card-title">${fruit.title}</h5>
        <a href="#" class="btn btn-primary" data-btn="price" data-id="${fruit.id}">Посмотреть цену</a>
        <a href="#" class="btn btn-danger" data-btn="remove" data-id="${fruit.id}">Удалить</a>
      </div>
    </div>
  </div>
`

function render() {
  document.querySelector('#fruits').innerHTML = fruits.map(toHTML).join('')
}

render()

const priceModal = $.modal({
  title: 'Цена на товар',
  closable: true,
  width: '400px',
  footerButtons: [
    {
      text: 'Закрыть',
      type: 'primary',
      handler() {
        priceModal.close()
      },
    },
  ],
})

document.addEventListener('click', (event) => {
  event.preventDefault()
  const btnType = event.target.dataset.btn
  const id = +event.target.dataset.id
  const fruit = fruits.find((f) => f.id === id)

  if (btnType === 'price') {
    priceModal.setContent(`
      <p>Цена на ${fruit.title}: <strong>$${fruit.price}</strong></p>
    `)
    priceModal.open()
  } else if (btnType === 'remove') {
    $.confirm({
      title: 'Вы уверены?',
      content: `<p>Вы удаляете фрукт <strong>${fruit.title}</strong></p>`,
    })
      .then(() => {
        fruits = fruits.filter((f) => f.id !== id)
        render()
      })
      .catch(() => console.log('Cancel'))
  }
})
