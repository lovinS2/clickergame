let count = 0;
let highScore = 0;
let isDoubleClickActive = false;
let isAutoClickActive = false;
let isGameEnded = false; 
const stages = ["노베이스", "입문", "초심자", "하수", "초보", "중수", "고수", "마스터"];
const images = ["gaon.png", "py.webp", "./main/js.png", "c.png", "ja.png", "luby.png", "umm.png", "php.png"];
const stories = [
    "가온이가 코딩을 배우기 시작했어!",
    "가온이가 변수와 자료형을 배웠어!",
    "가온이가 반복문을 이해했어!",
    "가온이가 함수로 문제를 해결했어!",
    "가온이가 첫 번째 프로젝트에 도전했어!",
    "가온이가 객체 지향 코드를 작성했어!",
    "가온이가 API를 활용하기 시작했어!",
    "가온이가 코딩 챌린지를 마스터했어!"
];

let currentStage = 0;
let clicksForNextStage = 1; // 1단계는 100 클릭

function add() {
    if (isGameEnded) return; // 게임 종료시 클릭막기

    count += isDoubleClickActive ? 2 : 1; // 클릭당 증가
    document.getElementById("clickCount").innerText = `클릭수: ${count}`;
    if (count > highScore) {
        highScore = count; // 최고 기록 업뎃
        document.getElementById("highScore").innerText = highScore;
    }

    // 단계 업뎃
    if (count >= clicksForNextStage) {
        currentStage++;
        if (currentStage >= stages.length) {
            showFinalStage(); // 마스터 단계 도달 시
            return;
        }

        clicksForNextStage *= 2; // 다음 단계 클릭 수 2배
        document.getElementById("stage").innerText = `단계: ${stages[currentStage]}`;
        document.getElementById("gaonImage").src = images[currentStage];
        document.getElementById("story").innerText = stories[currentStage];

        // 초보 단계에서 선택지
        if (stages[currentStage] === "초보") {
            showChoices();
            return;
        }
    }

    // 진행도 업데이트
    let progress = Math.min((count / clicksForNextStage) * 100, 100);
    document.getElementById("progressBar").style.width = `${progress}%`;

    //아이템버튼
    if (count >= 10 && !isDoubleClickActive) {
        document.getElementById("doubleClickButton").style.display = "inline";
    }
    if (count >= 50 && !isAutoClickActive) {
        document.getElementById("autoClickButton").style.display = "inline";
    }

}


function showChoices() {
    document.getElementById("choiceSection").style.display = "block";
    document.getElementById("clickButton").style.display = "none"; // 클릭 버튼 비활성화
    document.getElementById("story").innerText = "가온이가 첫 번째 프로젝트에 도전했어! 근데 오류가... 100개?!";
}

function chooseSuccess() {
    // "예"를 선택하면 다음 단계로 이동
    document.getElementById("choiceSection").style.display = "none";
    document.getElementById("clickButton").style.display = "block"; // 클릭 버튼 활성화
    document.getElementById("story").innerText = "가온이가 버그를 고쳤어!";
}

function chooseFail() {
    // "아니요"를 선택하면 실패 엔딩
    document.getElementById("clickButton").style.display = "block";
    document.getElementById("choiceSection").style.display = "none";
    

    // 버튼 이미지 변경
    document.getElementById("gaonImage").src = "poop.webp"; // 실패 이미지
    document.getElementById("story").innerText = "가온이가 프로젝트 도전을 포기했어...";
    document.getElementById("resetButton").style.display = "block";
    isGameEnded = true; // 게임 종료 상태로 설정
}

function buyDoubleClick() {
    if (count < 10) return;
    count -= 10;
    document.getElementById("clickCount").innerText = `클릭수: ${count}`;
    isDoubleClickActive = true;
    document.getElementById("doubleClickButton").disabled = true; // 구매 후 비활성화
}

function buyAutoClick() {
    if (count < 50) return;
    count -= 50;
    document.getElementById("clickCount").innerText = `클릭수: ${count}`;
    isAutoClickActive = true;
    document.getElementById("autoClickButton").disabled = true; // 구매 후 비활성화
    setInterval(() => {
        if (count < clicksForNextStage && isAutoClickActive) add();
    }, 1000);
}

function showFinalStage() {
    // 마스터 단계 도달 시 처리
    document.getElementById("stage").innerText = "단계: 마스터";
    document.getElementById("story").innerText = "가온이가 코딩의 마스터가 됐어! 이제 가온이는 대기업에서 캐스팅해갈거야!";

    // 버튼 이미지 변경
    document.getElementById("gaonImage").src = "./main/happy.png"; // 성공 이미지
    document.getElementById("resetButton").style.display = "block"; // 초기화 버튼 표시
    isGameEnded = true; // 게임 종료 상태로 설정
}

function resetGame() {
    count = 0;
    currentStage = 0;
    clicksForNextStage = 100;
    isDoubleClickActive = false;
    isAutoClickActive = false;
    isGameEnded = false; // 게임 종료 상태 초기화
    document.getElementById("clickCount").innerText = "클릭수: 0";
    document.getElementById("stage").innerText = "단계: 노베이스";
    document.getElementById("gaonImage").src = images[0]; // 처음 이미지로
    document.getElementById("story").innerText = "";
    document.getElementById("end").innerText = "";
    document.getElementById("fail").innerText = "";
    document.getElementById("fail").style.display = "none";
    document.getElementById("clickButton").style.display = "block";
    document.getElementById("resetButton").style.display = "none";
    document.getElementById("progressBar").style.width = "0%";
    //아이텝버튼초기화
    document.getElementById("doubleClickButton").style.display = "none";
    document.getElementById("autoClickButton").style.display = "none";
    document.getElementById("doubleClickButton").disabled = false;
    document.getElementById("autoClickButton").disabled = false;
}
