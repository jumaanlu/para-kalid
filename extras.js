/* New birthday notes inspired by their language; these are not historical chat quotes. */
(() => {
  const $ = selector => document.querySelector(selector);
  const notes = [
    "Tus ojos bonitooos, mi niña. Me encanta mirarte de cerquita.",
    "Tu hermosa y gran sonrisa.",
    "Que me gusta verte aunque sea un ratito.",
    "Cómo te veeees siempre que salimos.",
    "Hablar contigo y saber que nos tenemos. Eso me hace muy feliz, en vdd.",
    "Tus besos. Y poder darte yo muchos más, mi jamonsito ♡",
    "Cómo me haces sentir en paz cuando estamos juntos.",
    "Todos los planes que me propones",
    "Tus grandes y diferentes voces que tienes. jajajajj",
    "Que seas una niña tan alegre y bonita",
    "Tus grandes cambios de humor que me encanta aguantar jajajja",
    "La emoción con la que hablas de todo",
    "Cómo me dices que me amas. Yo también te amo muchoteee, mi niña.",
    "Que todo lo que te gusta que haces con mucha dedicación",
    "Tus grandes planes a futuro",
    "Tus croooocs jajaj",
    "Que todas las personas que te conocen ven los buena y linda que eres",
    "Que seas muy buena socializando jajajaj",
    "Tus grandeees piernaaas",
    "Me gusta mucho que seas tuu y que podamos estar juntos siendo nosotros"
];
  const read = new Set();
  let selectedNote = -1;
  const noteGrid = $('#notes-grid');
  notes.forEach((text, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'note-tile';
    button.textContent = String(index + 1).padStart(2, '0');
    button.setAttribute('aria-label', `Descubrir cosa ${index + 1} que me gusta de ti`);
    button.setAttribute('aria-pressed', 'false');
    button.addEventListener('click', () => {
      selectedNote = index;
      read.add(index);
      noteGrid.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
      button.classList.add('read');
      $('#note-number').textContent = `ME GUSTA DE TI · ${String(index + 1).padStart(2, '0')} / 20`;
      $('#note-text').textContent = text;
      $('#notes-progress').textContent = `${read.size} de 20 cosas descubiertas${read.size === 20 ? '. Y todavía me quedo corto, mi niña ♡' : ''}`;
      $('#note-download').hidden = false;
    });
    noteGrid.append(button);
  });
  $('#note-download').addEventListener('click', () => {
    if (selectedNote < 0) return;
    const blob = new Blob([`Para mi jamonsito · Tus 20\n\n${notes[selectedNote]}\n\nDe Juan para Kalid ♡`], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `para-kalid-me-gusta-de-ti-${selectedNote + 1}.txt`;
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  });
  const questions = [
    { q: 'A ver mi niña, cómo te llego a dar los buenos días?', options: ['Muy buenos días, estimada.', 'oaaaaa', 'Qué tal, ciudadana.'], answer: 1, reply: 'Oaaaaa mi amooor, pues cóoomo más jajaj ♡' },
    { q: 'Como son mis hotcakes favoritos', options: ['En forma de Snoopy', 'Cuadrados y bien serios', 'Sin forma, nomás échalos'], answer: 0, reply: 'De Snoopyyy. Los besos van por mi cuenta ♡' },
    { q: 'Tu mes y tu estación favoritos, mi amooor?', options: ['Enero y el invierno', 'Julio y el verano', 'Octubre y el otoño'], answer: 2, reply: 'Octubre y otoño, sí me acuerdo de tus cositas mi niña.' },
    { q: '¿Cuál fue nuestra primera salida?', options: ['seltari', 'la santa', 'Salvando niños de un incendio'], answer: 1, reply: 'los dos bien serios y tiesos esa vez' },
    { q: 'Y cuánto te amo yo?', options: ['Poquito', 'Solo los martes', 'Muchoteeeee'], answer: 2, reply: 'Muchoteeeee mi jamonsito. Esta estaba regalada jajaj ♡' },
  ];
  let questionIndex = 0;
  let score = 0;
  let answered = false;
  function renderQuiz() {
    answered = false;
    $('#quiz-next').hidden = true;
    $('#quiz-reset').hidden = true;
    $('#quiz-feedback').textContent = '';
    $('#quiz-body').hidden = false;
    $('#quiz-count').textContent = `Pregunta ${questionIndex + 1} de ${questions.length}`;
    const item = questions[questionIndex];
    $('#quiz-question').textContent = item.q;
    $('#quiz-options').replaceChildren();
    item.options.forEach((option, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = option;
      button.addEventListener('click', () => {
        if (answered) return;
        answered = true;
        if (index === item.answer) score++;
        $('#quiz-options').querySelectorAll('button').forEach((b, i) => {
          b.disabled = true;
          if (i === item.answer) b.classList.add('correct');
          else if (i === index) b.classList.add('incorrect');
        });
        $('#quiz-feedback').textContent = `${index === item.answer ? 'Siiii. ' : 'Nop jajaj. '}${item.reply}`;
        $('#quiz-next').hidden = false;
        $('#quiz-next').textContent = questionIndex === questions.length - 1 ? 'A ver cómo me fue ↗' : 'Siguiente, mi amooor ↗';
        $('#quiz-next').focus({ preventScroll: true });
      });
      $('#quiz-options').append(button);
    });
  }
  $('#quiz-next').addEventListener('click', () => {
    if (!answered) return;
    questionIndex++;
    if (questionIndex < questions.length) {
      renderQuiz();
      $('#quiz-question').tabIndex = -1;
      $('#quiz-question').focus({ preventScroll: true });
    } else {
      $('#quiz-body').hidden = true;
      $('#quiz-next').hidden = true;
      $('#quiz-count').textContent = `${score} de ${questions.length} respuestas correctas`;
      $('#quiz-feedback').textContent = score === questions.length
        ? 'Sí te sabes lo nuestro mi amooor ♡ Premio: muchos besos. Me los cobras cuando me veas.'
        : 'Jajaj te amo igual mi niña. Las que faltaron te las cuento cuando estemos junticos ♡';
      $('#quiz-reset').hidden = false;
      $('#quiz-reset').focus({ preventScroll: true });
    }
  });
  $('#quiz-reset').addEventListener('click', () => {
    questionIndex = 0;
    score = 0;
    renderQuiz();
    $('#quiz-options button').focus({ preventScroll: true });
  });
  renderQuiz();

  function shuffle(array) {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }
  const memories = [
    { src: 'assets/kalid-sonrisa.jpg', label: 'Kalid con su jersey naranja' },
    { src: 'assets/kalid-concierto.jpg', label: 'Kalid en el concierto' },
    { src: 'assets/nosotros-beso.jpg', label: 'Nuestro beso en la mejilla' },
    { src: 'assets/nosotros-espejo.jpg', label: 'Nuestro abrazo en el espejo' },
  ];
  let firstCard = null, busy = false, pairs = 0, moves = 0, memoryTimer;
  function memoryStatus() {
    $('#memory-status').textContent = pairs === 4
      ? `4 de 4 parejas en ${moves} intentos. Nos encontraste todas las veces ♡`
      : `${pairs} de 4 parejas · ${moves} intentos`;
  }
  function resetMemory() {
    clearTimeout(memoryTimer);
    firstCard = null;
    busy = false;
    pairs = 0;
    moves = 0;
    $('#memory-board').replaceChildren();
    shuffle([...memories, ...memories]).forEach((item, position) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'memory-card';
      button.dataset.pair = item.src;
      button.setAttribute('aria-label', `Foto oculta ${position + 1}`);
      const face = document.createElement('span');
      face.className = 'memory-back';
      face.textContent = '♡';
      face.setAttribute('aria-hidden', 'true');
      const image = document.createElement('img');
      image.src = item.src;
      image.alt = '';
      image.loading = 'lazy';
      button.append(face, image);
      button.addEventListener('click', () => {
        if (busy || button.classList.contains('flipped') || button.classList.contains('matched')) return;
        button.classList.add('flipped');
        button.setAttribute('aria-label', item.label);
        if (!firstCard) { firstCard = button; return; }
        moves++;
        const previous = firstCard;
        firstCard = null;
        if (previous.dataset.pair === button.dataset.pair) {
          pairs++;
          [previous, button].forEach(b => {
            b.classList.add('matched');
            b.setAttribute('aria-disabled', 'true');
            b.setAttribute('aria-label', `${item.label}, pareja encontrada`);
          });
          memoryStatus();
        } else {
          busy = true;
          $('#memory-status').textContent = `Todavía no son pareja. Intenta con otras, mi niña. ${moves} intentos.`;
          memoryTimer = setTimeout(() => {
            [previous, button].forEach(b => {
              b.classList.remove('flipped');
              b.setAttribute('aria-label', `Foto oculta ${[...$('#memory-board').children].indexOf(b) + 1}`);
            });
            busy = false;
            memoryStatus();
          }, 1300);
        }
      });
      $('#memory-board').append(button);
    });
    memoryStatus();
  }
  $('#memory-reset').addEventListener('click', resetMemory);
  resetMemory();

  const plans = [
    { icon: '🥞', title: 'Los hot cakes de Snoopy.', text: 'Un desayuno junticos. Tú me ayudas con la forma, yo pongo la mesa y luego vemos si sí se parece jajaj.' },
    { icon: '🍂', title: 'Un ratito de otoño.', text: 'Salir a caminar, comprarnos algo rico y platicar sin andar corriendo. Tu estación favorita contigo.' },
    { icon: '🍳', title: 'Hoy cocinamos los dos.', text: 'Escogemos un antojito mexicano, conseguimos las cosas y lo hacemos juntos. A ver qué tal nos queda.' },
    { icon: '🎧', title: 'Una playlist de los dos.', text: 'Una canción tú, una yo. Nos contamos por qué la elegimos y la dejamos guardada para otro día.' },
    { icon: '📷', title: 'Ahora sí, muchas fotos.', text: 'Una salida para tomarnos fotos y un videíto juntos. De esos que luego vemos y nos da mucha risa y amor.' },
    { icon: '🥭', title: 'Mi mango y mi jamonsito.', text: 'Conseguir un manguito y sentarnos a platicar. Sin plan enorme, nomás tú y yo otro ratito.' },
  ];
  let planOrder = shuffle(plans), planIndex = 0, lastPlan;
  $('#draw-plan').addEventListener('click', () => {
    if (planIndex === planOrder.length) {
      planOrder = shuffle(plans);
      if (planOrder[0] === lastPlan) [planOrder[0], planOrder[1]] = [planOrder[1], planOrder[0]];
      planIndex = 0;
    }
    const plan = planOrder[planIndex++];
    lastPlan = plan;
    const icon = document.createElement('span');
    icon.className = 'plan-icon';
    icon.setAttribute('aria-hidden', 'true');
    icon.textContent = plan.icon;
    const title = document.createElement('h3');
    title.textContent = plan.title;
    const text = document.createElement('p');
    text.textContent = plan.text;
    $('#plan-content').replaceChildren(icon, title, text);
    $('#plans-count').textContent = `${planIndex} de 6 ideas en esta vuelta. ${planIndex === 6 ? 'Ya salieron todas, puedes volver a sacar ♡' : 'Saca otra si se te antoja.'}`;
    $('#draw-plan').firstChild.textContent = 'A ver otro plan ';
  });

  // An accessible, keyboard-operated album using the five supplied photographs.
  const viewer = $('#photo-viewer');
  const photos = [...document.querySelectorAll('.photo-slot img')];
  let photoIndex = 0, photoTrigger;
  function showPhoto(index) {
    photoIndex = (index + photos.length) % photos.length;
    const source = photos[photoIndex];
    $('#photo-full').src = source.src;
    $('#photo-full').alt = source.alt;
    $('#photo-caption').textContent = source.closest('figure').querySelector('figcaption').textContent;
    $('#photo-counter').textContent = `${photoIndex + 1} / ${photos.length} · tú y nosotros ♡`;
  }
  photos.forEach((image, index) => {
    const trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.className = 'photo-open';
    trigger.setAttribute('aria-label', `Ver foto completa: ${image.alt}`);
    trigger.setAttribute('aria-haspopup', 'dialog');
    image.replaceWith(trigger);
    trigger.append(image);
    const hint = document.createElement('span');
    hint.className = 'photo-hint';
    hint.textContent = 'Ver completita ↗';
    trigger.append(hint);
    trigger.addEventListener('click', () => {
      photoTrigger = trigger;
      showPhoto(index);
      viewer.showModal();
    });
  });
  $('#photo-close').addEventListener('click', () => viewer.close());
  viewer.addEventListener('close', () => photoTrigger?.focus({ preventScroll: true }));
  $('#photo-prev').addEventListener('click', () => showPhoto(photoIndex - 1));
  $('#photo-next').addEventListener('click', () => showPhoto(photoIndex + 1));
  viewer.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); showPhoto(photoIndex - 1); }
    if (event.key === 'ArrowRight') { event.preventDefault(); showPhoto(photoIndex + 1); }
  });
})();
