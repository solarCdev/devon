// [1] 스크롤 등장 감지
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
    });
}, { threshold: 0.2 });
document.querySelectorAll('.scroll-reveal').forEach(el => revealObserver.observe(el));

// [2] 고성능 입자 시스템
const sCanvas = document.getElementById('about-scatter-canvas');
const sCtx = sCanvas.getContext('2d');
const sImg = new Image();
sImg.src = './image/com.svg'; 

let particles = [];
const particleGap = 3; // 밀도를 높이기 위해 3으로 설정

class Particle {
    constructor(x, y, color) {
        this.originX = x; this.originY = y;
        this.x = Math.random() * 600; this.y = Math.random() * 600; // 초기 산란 상태
        this.color = color;
        this.size = 3; // 입자 크기
        this.vx = 0; this.vy = 0;
        this.friction = 0.9; this.ease = 0.12;
    }
    draw() {
        sCtx.fillStyle = this.color;
        sCtx.fillRect(this.x, this.y, this.size, this.size);
    }
    update(mX, mY) {
        let dx = mX - this.x;
        let dy = mY - this.y;
        let distance = dx * dx + dy * dy;
        let force = -8000 / distance; // 밀어내는 힘

        if (distance < 12000) {
            let angle = Math.atan2(dy, dx);
            this.vx += force * Math.cos(angle);
            this.vy += force * Math.sin(angle);
        }

        this.vx += (this.originX - this.x) * this.ease;
        this.vy += (this.originY - this.y) * this.ease;
        this.vx *= this.friction; this.vy *= this.friction;
        this.x += this.vx; this.y += this.vy;
    }
}

sImg.onload = () => {
    sCanvas.width = 600; sCanvas.height = 600;
    
    // 오프스크린 캔버스에서 픽셀 추출 (배경 노이즈 방지)
    const offCanvas = document.createElement('canvas');
    const offCtx = offCanvas.getContext('2d');
    offCanvas.width = 600; offCanvas.height = 600;
    offCtx.drawImage(sImg, 50, 50, 500, 500);
    const pixels = offCtx.getImageData(0, 0, 600, 600).data;

    for (let y = 0; y < 600; y += particleGap) {
        for (let x = 0; x < 600; x += particleGap) {
            const index = (y * 600 + x) * 4;
            if (pixels[index + 3] > 100) { // 투명도 100 이상인 픽셀만 입자화
                const color = `rgb(${pixels[index]}, ${pixels[index+1]}, ${pixels[index+2]})`;
                particles.push(new Particle(x, y, color));
            }
        }
    }
    animateParticles();
};

function animateParticles() {
    sCtx.clearRect(0, 0, sCanvas.width, sCanvas.height);
    const rect = sCanvas.getBoundingClientRect();
    const mX = (mouse.x - rect.left) * (600 / rect.width);
    const mY = (mouse.y - rect.top) * (600 / rect.height);

    particles.forEach(p => {
        p.update(mX, mY);
        p.draw();
    });
    requestAnimationFrame(animateParticles);
}