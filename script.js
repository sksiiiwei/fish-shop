const fish = [
  { name: 'Лосось',   emoji: '🐟', price: 1200, img: 'images/salmon.svg' },
  { name: 'Форель',   emoji: '🐠', price: 900,  img: 'images/trout.svg' },
  { name: 'Карп',     emoji: '🐡', price: 350,  img: 'images/carp.svg' },
  { name: 'Креветки', emoji: '🦐', price: 1500, img: 'images/shrimp.svg' },
  { name: 'Осьминог', emoji: '🐙', price: 1800, img: 'images/octopus.svg' },
  { name: 'Краб',     emoji: '🦀', price: 2100, img: 'images/crab.svg' },
];
const cart = [];

const catalog = document.getElementById('catalog');
fish.forEach((f, i) => {
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `<img class="photo" src="${f.img}" alt="${f.name}"><h3>${f.name}</h3><p>${f.price} ₽/кг</p><button>В корзину</button>`;
  card.querySelector('.photo').onerror = function () {
    const e = document.createElement('div');
    e.className = 'emoji';
    e.textContent = f.emoji;
    this.replaceWith(e);
  };
  card.querySelector('button').onclick = () => { cart.push(i); render(); };
  catalog.appendChild(card);
});

function render() {
  const list = document.getElementById('cart-list');
  list.innerHTML = '';
  let total = 0;
  cart.forEach(i => {
    const li = document.createElement('li');
    li.textContent = `${fish[i].name} — ${fish[i].price} ₽`;
    list.appendChild(li);
    total += fish[i].price;
  });
  document.getElementById('total').textContent = total;
}
document.getElementById('clear').onclick = () => { cart.length = 0; render(); };
