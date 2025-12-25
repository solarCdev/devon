// 변수 중복 선언 방지를 위해 체크
if (typeof submitted === 'undefined') {
    var submitted = false;
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.custom-devon-form');
    const successMsg = document.getElementById('success-message');
    const iframe = document.getElementById('hidden_iframe');
    const submitBtn = document.querySelector('.form-submit-btn');

    if (!form || !iframe) return;

    // A. 폼 제출 시점
    form.addEventListener('submit', () => {
        submitted = true;
        submitBtn.disabled = true;
        submitBtn.innerText = "EXECUTING_UPLOAD...";
        // 버튼에 즉각적인 시각 피드백
        submitBtn.style.background = "var(--point-color)";
    });

    // B. 데이터 전송 완료 시점 (Iframe 로드 감지)
    iframe.addEventListener('load', () => {
        if (submitted) {
            // 1. 폼에 페이드아웃 클래스 추가
            form.classList.add('fade-out');
            
            // 2. 애니메이션 끝난 후 처리
            setTimeout(() => {
                form.style.display = 'none'; // 공간 제거
                successMsg.classList.add('show'); // 메시지 등장
                
                // 브라우저 최상단으로 스크롤 (성공 메시지가 안 보일 수 있으므로)
                window.scrollTo({ top: document.getElementById('recruit').offsetTop, behavior: 'smooth' });
                
                console.log("%c[SYSTEM] ACCESS_GRANTED", "color: #39FF14; font-weight: bold;");
            }, 500);
            decodeTitleEffect("WELCOME_TO_DEVON👾");
        }
    });
});

/**
 * 브라우저 타이틀을 점진적으로 완성시키는 디코딩 효과
 * @param {string} finalTitle - 최종적으로 보여줄 제목
 */
function decodeTitleEffect(finalTitle) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
    let iteration = 0;
    
    // 0.05초마다 타이틀 업데이트
    const interval = setInterval(() => {
        document.title = finalTitle
            .split("")
            .map((char, index) => {
                // 이미 완성된 글자이거나 공백/특수문자는 그대로 유지
                if (index < iteration) {
                    return finalTitle[index];
                }
                // 아직 완성되지 않은 부분은 랜덤 문자 출력
                return characters[Math.floor(Math.random() * characters.length)];
            })
            .join("");

        // 모든 글자가 완성되면 멈춤
        if (iteration >= finalTitle.length) {
            clearInterval(interval);
        }

        // 완성 속도 조절 (숫자가 낮을수록 빠르게 완성)
        iteration += 1 / 3; 
    }, 50);
}