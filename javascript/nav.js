const trigger = document.getElementById('menu-trigger');
const overlay = document.getElementById('mobile-overlay');
const mobileLinks = document.querySelectorAll('.mobile-link');

trigger.addEventListener('click', () => {
    trigger.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = overlay.classList.contains('active') ? 'hidden' : 'auto';
});

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        trigger.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});