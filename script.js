const fish = [
  { name: 'Лосось',   emoji: '🐟', price: 1200 },
  { name: 'Форель',   emoji: '🐠', price: 900 },
  { name: 'Карп',     emoji: '🐡', price: 350 },
  { name: 'Креветки', emoji: '🦐', price: 1500 },
  { name: 'Осьминог', emoji: '🐙', price: 1800 },
  { name: 'Краб',     emoji: '🦀', price: 2100 },
];
const cart = [];

const catalog = document.getElementById('catalog');
fish.forEach((f, i) => {
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `<div class="emoji">${f.emoji}</div><h3>${f.name}</h3><p>${f.price} ₽/кг</p><button>В корзину</button>`;
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
