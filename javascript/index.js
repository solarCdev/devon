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

// 모든 내부 링크(anchor)에 대해 부드러운 스크롤 적용
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); // 기본 순간이동 차단

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth', // 부드럽게 이동
                block: 'start'      // 섹션의 시작 지점에 맞춤
            });
        }
    });
});