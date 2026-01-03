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

cursor.style.zIndex = "11000"; 

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

window.addEventListener('click', (e) => {
    const x = e.clientX;
    const y = e.clientY;

    // 1. 파동(Ripple) 생성
    const ripple = document.createElement('div');
    ripple.className = 'click-ripple';
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    document.body.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);

    // 2. 파편(Shard) 생성 (약 10~15개)
    for (let i = 0; i < 12; i++) {
        const shard = document.createElement('div');
        shard.className = 'click-shard';
        const size = Math.random() * 6 + 2;
        shard.style.setProperty('--size', `${size}px`);
        shard.style.left = `${x}px`;
        shard.style.top = `${y}px`;

        const angle = Math.random() * Math.PI * 2;
        const dist = Math.random() * 100 + 30;
        shard.style.setProperty('--tx', `${Math.cos(angle) * dist}px`);
        shard.style.setProperty('--ty', `${Math.sin(angle) * dist}px`);
        shard.style.setProperty('--tr', `${Math.random() * 360}deg`);

        document.body.appendChild(shard);
        setTimeout(() => shard.remove(), 500);
    }

    // 4. 짧은 화면 흔들림(Shake) 효과
    // document.body.style.transform = `translate(${Math.random()*4-2}px, ${Math.random()*4-2}px)`;
    setTimeout(() => document.body.style.transform = 'none', 50);
});

const DECODE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";

function decodeEffect(element) {
    // 중복 실행 방지
    if (element.dataset.loaded === "true") return;
    element.dataset.loaded = "true";
    element.classList.add('active');

    const originalText = element.innerText;
    
    // 각 글자의 상태를 객체 배열로 생성
    const letterStatus = originalText.split("").map(char => ({
        char: char,
        isDone: char === " " || char === "\n", // 공백/줄바꿈은 즉시 완료
        // 10~40 프레임 사이에서 랜덤하게 종료 시점 결정
        framesToLive: Math.floor(Math.random() * 10) + 10 
    }));

    const interval = setInterval(() => {
        let allDone = true;

        element.innerText = letterStatus
            .map(status => {
                if (status.framesToLive <= 0) {
                    return status.char; // 시간이 다 된 글자는 원본 반환
                } else {
                    allDone = false;
                    status.framesToLive--; // 프레임 차감
                    // 아직 지직거리는 중이면 랜덤 문자 반환
                    return DECODE_CHARS[Math.floor(Math.random() * DECODE_CHARS.length)];
                }
            })
            .join("");

        if (allDone) {
            clearInterval(interval);
            element.innerText = originalText; // 최종 텍스트로 확정
        }
    }, 40); // 0.04초마다 업데이트 (지직거리는 속도)
}

// 스크롤 감시자 설정
const decodeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            decodeEffect(entry.target);
            decodeObserver.unobserve(entry.target); // 한 번 실행 후 감시 해제
        }
    });
}, { threshold: 0.1 });

// 초기 실행 함수
function initDecodeLoader() {
    // 효과를 적용할 태그들을 선택 (p, h1, h2, li 등)
    const targets = document.querySelectorAll('h1, h2, h3, h4, .nav-logo');
    targets.forEach(target => {
        if (target.innerText.trim().length > 0) {
            target.classList.add('decode-load');
            decodeObserver.observe(target);
        }
    });
}

// 문서 로드 시 바로 실행
document.addEventListener('DOMContentLoaded', initDecodeLoader);

function updateScrollIndicator() {
    const scrollPixels = document.getElementById('scroll-pixels');
    const scrollPercent = document.getElementById('scroll-percent');

    if (!scrollPixels || !scrollPercent) return;

    // 1. 현재 스크롤된 양
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // 2. 전체 문서의 높이 - 현재 보이는 창의 높이
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

    // 스크롤할 내용이 없는 경우(단일 페이지 등)
    if (scrollHeight <= 0) {
        scrollPixels.innerHTML = "[&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]";
        scrollPercent.innerText = "00%";
        return;
    }

    // 3. 진행도 계산
    const scrolled = Math.min(100, Math.max(0, Math.round((scrollTop / scrollHeight) * 100)));

    // 4. [ |||||| ] 바 업데이트
    const totalBars = 10;
    const filledBars = Math.floor(scrolled / 10);
    const barDisplay = `[${'|'.repeat(filledBars)}${'&nbsp;'.repeat(totalBars - filledBars)}]`;
    
    scrollPixels.innerHTML = barDisplay;
    scrollPercent.innerText = scrolled.toString().padStart(2, '0') + "%";
}

// 이벤트 리스너 통합
window.addEventListener('scroll', updateScrollIndicator);
window.addEventListener('resize', updateScrollIndicator);
window.addEventListener('load', updateScrollIndicator);

// 만약 동적으로 컨텐츠가 추가된다면 수동으로 호출 가능
// updateScrollIndicator();