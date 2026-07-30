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
