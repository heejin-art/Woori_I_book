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
const floatingBar = document.querySelector('.floating-bar');
const heroSection = document.querySelector('.hero');

if (floatingTop) {
  floatingTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

if (floatingBar && heroSection) {
  const updateFloatingBar = () => {
    const heroBottom = heroSection.getBoundingClientRect().bottom;
    floatingBar.classList.toggle('is-visible', heroBottom <= window.innerHeight * 0.2);
  };

  window.addEventListener('scroll', updateFloatingBar, { passive: true });
  window.addEventListener('resize', updateFloatingBar);
  updateFloatingBar();
}

const ownabeeQuick = document.querySelector('.ownabee-quick');
const storeModal = document.querySelector('.store-modal');

if (ownabeeQuick && storeModal) {
  const closeStoreModal = () => {
    storeModal.hidden = true;
    document.body.style.overflow = '';
    ownabeeQuick.focus();
  };

  ownabeeQuick.addEventListener('click', (event) => {
    event.preventDefault();

    const userAgent = navigator.userAgent || '';
    const isAndroid = /Android/i.test(userAgent);
    const isIOS = /iPhone|iPad|iPod/i.test(userAgent)
      || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

    if (isAndroid) {
      window.location.href = ownabeeQuick.dataset.androidUrl;
      return;
    }

    if (isIOS) {
      window.location.href = ownabeeQuick.dataset.iosUrl;
      return;
    }

    storeModal.hidden = false;
    document.body.style.overflow = 'hidden';
    storeModal.querySelector('.store-modal-close').focus();
  });

  storeModal.querySelector('.store-modal-close').addEventListener('click', closeStoreModal);
  storeModal.querySelector('.store-modal-backdrop').addEventListener('click', closeStoreModal);
  storeModal.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeStoreModal));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !storeModal.hidden) closeStoreModal();
  });
}
