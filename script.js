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
    document.querySelectorAll('.tabs [role="tab"]').forEach((tab) => {
      tab.classList.remove('active');
      tab.setAttribute('aria-selected', 'false');
    });
    document.querySelectorAll('.service-card').forEach((panel) => panel.classList.add('hidden'));
    button.classList.add('active');
    button.setAttribute('aria-selected', 'true');
    document.getElementById(button.dataset.tab).classList.remove('hidden');
  });
});
