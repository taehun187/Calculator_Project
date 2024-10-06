let input = "";
let isHexMode = false; // 기본은 10진수 모드

function addChar(character) {
    if (!isHexMode && ['A', 'B', 'C', 'D', 'E', 'F'].includes(character)) {
        return; // 10진수 모드에서 A~F 입력안되도록 
    }
    input += character;
    document.querySelector('#display').value = input;
}

function calculate() {
    try {
        if (isHexMode) {
            // 16진수 문자를 10진수로 변환하여 eval로 계산
            let decimalValue = eval(input.replace(/([A-Fa-f0-9]+)/g, 
                match => parseInt(match, 16)));
            // 계산된 10진수 결과를 다시 16진수로 변환하여 대문자로 출력
            input = decimalValue.toString(16).toUpperCase();
        } else {
            input = eval(input); // 10진수 계산
        }
        document.querySelector('#display').value = input;
    } catch (error) {
        document.querySelector('#display').value = "ERROR";
    }
}

// 화면 초기화 
function clearScreen() {
    input = "";
    document.querySelector('#display').value = "";
}

// 마지막 입력값 지우기
function backspace() {
    input = input.slice(0, -1);
    document.querySelector('#display').value = input;
}

// HEX 모드로 전환
function setHexMode() {
    isHexMode = true;
    clearScreen();
    setActiveButton("hex");
}

// DEX 모드로 전환
function setDecMode() {
    isHexMode = false;
    clearScreen();
    setActiveButton("dec");
}

// HEX 또는 DEC 눌렀을 때 빨간색으로 활성화 
function setActiveButton(mode) {
    const hexButton = document.querySelector("button:nth-child(2)");
    const decButton = document.querySelector("button:nth-child(3)");

    if (mode === "hex") {
        hexButton.classList.add("active-mode");
        decButton.classList.remove("active-mode");
    } else if (mode === "dec") {
        decButton.classList.add("active-mode");
        hexButton.classList.remove("active-mode");
    }
}
