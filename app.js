const openLetter = document.querySelector('#open-letter');
const closeLetter = document.querySelector('#close-letter');
const letter = document.querySelector('#letter-content');
openLetter.addEventListener('click', () => {
  openLetter.hidden = true;
  openLetter.setAttribute('aria-expanded', 'true');
  letter.hidden = false;
  closeLetter.focus({ preventScroll: true });
});
closeLetter.addEventListener('click', () => {
  letter.hidden = true;
  openLetter.hidden = false;
  openLetter.setAttribute('aria-expanded', 'false');
  openLetter.focus({ preventScroll: true });
});

const welcome = document.querySelector('#welcome');
if (typeof welcome.showModal === 'function') welcome.showModal();
document.querySelector('#enter-gift').addEventListener('click', () => {
  welcome.close();
  document.querySelector('.hero .button').focus({ preventScroll: true });
});

const secrets = [
  { quote: 'oaaaaa', note: 'Ya llegué mi amooor ♡' },
  { quote: 'jamonsito', note: '' },
  { quote: 'te amo mucho lo sabías', note: 'Pues te lo digo otra vez, muchoteee ♡' },
];
const discovered = new Set();
const toast = document.querySelector('#surprise-toast');
let toastTimeout;
document.querySelectorAll('[data-secret]').forEach(button => {
  button.addEventListener('click', () => {
    const index = Number(button.dataset.secret);
    discovered.add(index);
    button.classList.add('found');
    button.setAttribute('aria-label', `Volver a leer: ${secrets[index].quote}`);
    button.querySelector('span').textContent = 'siii, este ya es tuyo ♡';
    const note = document.querySelector(`[data-note="${index}"]`);
    note.textContent = secrets[index].note
      ? `«${secrets[index].quote}» — ${secrets[index].note}`
      : `«${secrets[index].quote}»`;
    note.classList.add('revealed');
    document.querySelector('#treasure-progress').textContent = discovered.size === 3
      ? '3 de 3. Siii encontraste todos mi amooor ♡'
      : `${discovered.size} de 3 manguitos encontrados`;
    toast.textContent = `«${secrets[index].quote}»`;
    toast.classList.add('visible');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => toast.classList.remove('visible'), 4500);
  });
});

const blowCandles = document.querySelector('#blow-candles');
const relight = document.querySelector('#relight');
blowCandles.addEventListener('click', () => {
  document.querySelector('.cake').classList.add('blown');
  document.querySelector('#wish-message').textContent = 'Siiii, felices 20 mi jamonsito. Te amo muchoteee ♡';
  blowCandles.hidden = true;
  relight.hidden = false;
  relight.focus({ preventScroll: true });
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const celebration = document.createElement('div');
    celebration.className = 'confetti';
    celebration.setAttribute('aria-hidden', 'true');
    for (let i = 0; i < 28; i++) {
      const piece = document.createElement('span');
      piece.textContent = ['♡', '✧', '🥭'][i % 3];
      piece.style.setProperty('--x', `${Math.random() * 100}vw`);
      piece.style.setProperty('--delay', `${Math.random() * 0.6}s`);
      celebration.append(piece);
    }
    document.body.append(celebration);
    setTimeout(() => celebration.remove(), 3500);
  }
});
relight.addEventListener('click', () => {
  document.querySelector('.cake').classList.remove('blown');
  document.querySelector('#wish-message').textContent = 'Pero no me lo digas eh jajaj, es tuyo ♡';
  blowCandles.hidden = false;
  relight.hidden = true;
  blowCandles.focus({ preventScroll: true });
});

// Add supplied media here, using files stored in dist/assets/.
// Example: 'portada': { src: 'assets/kalid.webp', alt: 'Kalid sonriendo' }
const media = {
  'portada': { src: 'assets/kalid-vestido.jpg', alt: 'Kalid con vestido de rayas verdes y blancas en un jardín' },
  'ella-1': { src: 'assets/kalid-sonrisa.jpg', alt: 'Kalid sonriendo con su jersey naranja en una cancha' },
  'ella-2': { src: 'assets/kalid-concierto.jpg', alt: 'Kalid sonriendo junto a la barandilla en un concierto' },
  'nosotros-1': { src: 'assets/nosotros-beso.jpg', alt: 'Un beso en la mejilla y una sonrisa de los dos juntos' },
  'nosotros-2': { src: 'assets/nosotros-espejo.jpg', alt: 'Los dos abrazados frente a un espejo con iluminación roja' },
};
for (const [key, item] of Object.entries(media)) {
  const slot = document.querySelector(`[data-media="${key}"]`);
  if (!slot) continue;
  const element = document.createElement(item.type === 'video' ? 'video' : 'img');
  element.src = item.src;
  if (item.type === 'video') {
    element.controls = true;
    element.playsInline = true;
    element.preload = 'metadata';
    element.setAttribute('aria-label', item.alt);
    if (item.poster) element.poster = item.poster;
  } else {
    element.alt = item.alt;
    element.loading = key === 'portada' ? 'eager' : 'lazy';
    element.decoding = 'async';
    if (key === 'portada') element.fetchPriority = 'high';
  }
  slot.replaceChildren(element);
}
