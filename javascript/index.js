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

// 모바일 터치 시작
window.addEventListener('touchstart', (e) => {
    if (typeof mouse !== 'undefined') {
        mouse.active = true;
        const touch = e.touches[0];
        mouse.x = touch.clientX;
        mouse.y = touch.clientY;
    }
}, { passive: true });

// 모바일 터치 이동
window.addEventListener('touchmove', (e) => {
    if (typeof mouse !== 'undefined') {
        const touch = e.touches[0];
        mouse.x = touch.clientX;
        mouse.y = touch.clientY;
    }
}, { passive: false });

// 터치 종료
window.addEventListener('touchend', () => {
    if (typeof mouse !== 'undefined') {
        mouse.active = false;
    }
});

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

const cursor = document.getElementById('cursor-dot');

// [1] 기본 마우스 이동 로직 (기존 코드 유지)
window.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// [2] 커서 확대 이벤트 적용 대상 선정
// 링크(a), 버튼, 모든 캔버스, 그리고 설명 텍스트들
const hoverTargets = document.querySelectorAll('a, button, canvas, h2, h3, .menu-trigger');

hoverTargets.forEach(target => {
    target.addEventListener('mouseenter', () => {
        cursor.classList.add('active');
    });
    target.addEventListener('mouseleave', () => {
        cursor.classList.remove('active');
    });
});