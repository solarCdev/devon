function drawGlitch() {
    ctx.clearRect(0, 0, width, height);

    // 1. 기본 텍스트 그리기 (보이지 않는 기준점)
    let fontSize = width < 900 ? width * 0.18 : 150; 
    if (fontSize > 150) fontSize = 150; // 최대 크기 제한

    ctx.font = `bold ${fontSize}px Galmuri`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#39FF14";
    
    // 메인 타이틀 위치 (Hero 섹션 중앙)
    const centerX = width / 2;
    const centerY = height / 2;

    // 2. 상시 발생하는 미세한 라인 글리치
    if (Math.random() > 0.8) {
        ctx.save();
        ctx.translate(Math.random() * 10 - 5, 0);
        ctx.fillText("DEV-ON", centerX, centerY);
        ctx.restore();
    }

    // 3. 마우스 주변 RGB 분리 및 강렬한 노이즈
    if (mouse.active) {
        const dist = 200; // 마우스 영향 범위
        
        for (let i = 0; i < 20; i++) { // 노이즈 밀도
            const sliceX = centerX - 400 + Math.random() * 800;
            const sliceY = centerY - 100 + Math.random() * 200;
            const sliceW = Math.random() * 100 + 50;
            const sliceH = Math.random() * 5 + 1;

            // 마우스와의 거리 계산
            const dx = mouse.x - sliceX;
            const dy = mouse.y - sliceY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < dist) {
                // RGB 분리 효과 (Red/Green/Blue 채널을 서로 다른 좌표에 그림)
                ctx.globalCompositeOperation = "screen";
                
                // Red Shift
                ctx.fillStyle = "rgba(255, 0, 0, 0.8)";
                ctx.fillText("DEV-ON", centerX + (Math.random() * 30 - 15), centerY);
                
                // Blue Shift
                ctx.fillStyle = "rgba(0, 0, 255, 0.8)";
                ctx.fillText("DEV-ON", centerX - (Math.random() * 30 - 15), centerY);

                // 강렬한 수평 노이즈 바
                ctx.fillStyle = "#39FF14";
                ctx.fillRect(sliceX - 50, sliceY, sliceW * 2, sliceH);
            }
        }
    }

    // 4. 전체 화면을 가끔 지직거리게 만듦
    if (Math.random() > 0.98) {
        ctx.fillStyle = "rgba(57, 255, 20, 0.1)";
        ctx.fillRect(0, Math.random() * height, width, Math.random() * 20);
    }

    ctx.globalCompositeOperation = "source-over";
    requestAnimationFrame(drawGlitch);
}

drawGlitch();