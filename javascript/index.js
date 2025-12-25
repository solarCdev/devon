const canvas = document.getElementById('hero-glitch-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let mouse = { x: 0, y: 0, active: false };

// 초기화
function init() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', init);
init();

window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.active = true;
});

const dot = document.getElementById('cursor-dot');
        
window.addEventListener('mousemove', (e) => {
    dot.style.left = e.clientX + 'px';
    dot.style.top = e.clientY + 'px';
});

const iframe = document.querySelector('iframe');
iframe.addEventListener('mouseenter', () => {
    dot.style.display = 'none';
});
iframe.addEventListener('mouseleave', () => {
    dot.style.display = 'block';
});