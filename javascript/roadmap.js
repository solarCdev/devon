let currentTargetX = 0;
let animatedX = 0;

window.addEventListener('scroll', () => {
    const wrapper = document.getElementById('roadmap-sticky-wrapper');
    const track = document.querySelector('.horizontal-track');
    if (!wrapper || !track) return;

    const offsetTop = wrapper.offsetTop;
    const viewportHeight = window.innerHeight;
    const height = wrapper.offsetHeight - viewportHeight;
    
    let scrolled = window.scrollY - offsetTop;
    
    // 섹션 범위 내에 있을 때만 작동
    if (scrolled >= 0 && scrolled <= height) {
        let progress = scrolled / height;
        
        const trackWidth = track.scrollWidth;
        const windowWidth = window.innerWidth;
        const maxMove = trackWidth - windowWidth + (windowWidth * 0.2);

        // 즉시 transform을 바꾸는 게 아니라 목표값(currentTargetX)만 설정
        currentTargetX = -progress * maxMove;
    }
});

// 부드러운 애니메이션 루프 (틱 현상 및 스킵 방지)
function animate() {
    // animatedX가 currentTargetX를 부드럽게 따라가도록 함 (0.1 = 감속도)
    animatedX += (currentTargetX - animatedX) * 0.1;
    
    const track = document.querySelector('.horizontal-track');
    if (track) {
        track.style.transform = `translateX(${animatedX}px)`;
    }
    requestAnimationFrame(animate);
}
animate();