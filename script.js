const fish = [
  { name: 'Лосось',   emoji: '🐟', price: 1200, img: 'images/salmon.svg' },
  { name: 'Форель',   emoji: '🐠', price: 900,  img: 'images/trout.svg' },
  { name: 'Карп',     emoji: '🐡', price: 350,  img: 'images/carp.svg' },
  { name: 'Креветки', emoji: '🦐', price: 1500, img: 'images/shrimp.svg' },
  { name: 'Осьминог', emoji: '🐙', price: 1800, img: 'images/octopus.svg' },
  { name: 'Краб',     emoji: '🦀', price: 2100, img: 'images/crab.svg' },
];
const fmt = n => n.toLocaleString('ru-RU');

// корзина: { индекс_товара: количество }, хранится в localStorage
let cart = {};
try { cart = JSON.parse(localStorage.getItem('cart')) || {}; } catch (e) { cart = {}; }
const save = () => { try { localStorage.setItem('cart', JSON.stringify(cart)); } catch (e) {} };

const catalog = document.getElementById('catalog');
fish.forEach((f, i) => {
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `<img class="photo" src="${f.img}" alt="${f.name}"><h3>${f.name}</h3><p>${fmt(f.price)} ₽/кг</p><button>В корзину</button>`;
  card.querySelector('.photo').onerror = function () {
    const e = document.createElement('div');
    e.className = 'emoji';
    e.textContent = f.emoji;
    this.replaceWith(e);
  };
  card.querySelector('button').onclick = () => { cart[i] = (cart[i] || 0) + 1; render(); };
  catalog.appendChild(card);
});

function render() {
  const list = document.getElementById('cart-list');
  list.innerHTML = '';
  let total = 0;
  Object.keys(cart).forEach(key => {
    const f = fish[key];
    if (!f) { delete cart[key]; return; }
    const qty = cart[key];
    const sum = f.price * qty;
    total += sum;
    const li = document.createElement('li');
    li.innerHTML = `<span>${f.name} × ${qty} — ${fmt(sum)} ₽</span> <button class="minus" title="Убрать одну">−</button>`;
    li.querySelector('.minus').onclick = () => {
      cart[key] -= 1;
      if (cart[key] <= 0) delete cart[key];
      render();
    };
    list.appendChild(li);
  });
  document.getElementById('total').textContent = fmt(total);
  save();
}
document.getElementById('clear').onclick = () => { cart = {}; render(); };
render();
