const menuButton = document.querySelector('.menu');
const nav = document.querySelector('.nav-inner > nav');

menuButton.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.textContent = isOpen ? '×' : '☰';
});

nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.textContent = '☰';
}));

document.querySelectorAll('.tabs [role="tab"]').forEach((button) => {
  button.addEventListener('click', () => {
    const tabList = button.closest('.tabs');
    document.querySelectorAll('.tabs [role="tab"]').forEach((tab) => {
      tab.classList.remove('active');
      tab.setAttribute('aria-selected', 'false');
    });
    document.querySelectorAll('.service-card').forEach((panel) => panel.classList.add('hidden'));
    button.classList.add('active');
    button.setAttribute('aria-selected', 'true');
    tabList.classList.toggle('is-beesmart', button.dataset.tab === 'beesmart');
    document.getElementById(button.dataset.tab).classList.remove('hidden');
  });
});

document.querySelectorAll('.gallery-row').forEach((row) => {
  const set = document.createElement('div');
  set.className = 'gallery-set';

  while (row.firstChild) {
    set.appendChild(row.firstChild);
  }

  const duplicate = set.cloneNode(true);
  duplicate.setAttribute('aria-hidden', 'true');
  duplicate.querySelectorAll('img').forEach((image) => image.setAttribute('alt', ''));
  row.append(set, duplicate);
});

const spotlightVideo = document.querySelector('.screen video');
const videoToggle = document.querySelector('.video-toggle');

if (spotlightVideo && videoToggle) {
  const syncVideoButton = () => {
    const isPlaying = !spotlightVideo.paused;
    videoToggle.classList.toggle('is-playing', isPlaying);
    videoToggle.setAttribute('aria-label', isPlaying ? '영상 일시정지' : '영상 재생');
    videoToggle.setAttribute('aria-pressed', String(!isPlaying));
  };

  videoToggle.addEventListener('click', () => {
    if (spotlightVideo.paused) {
      spotlightVideo.play();
    } else {
      spotlightVideo.pause();
    }
  });

  spotlightVideo.addEventListener('play', syncVideoButton);
  spotlightVideo.addEventListener('pause', syncVideoButton);
  syncVideoButton();
}

const floatingTop = document.querySelector('.floating-top');

if (floatingTop) {
  floatingTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
