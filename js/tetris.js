// DOM
const playground = document.querySelector(".playground > ul");

// Setting
const GAME_ROWS =20;
const GAME_COLS = 10;

init()

//functions
function init(){
    // 처음 script가 호출이 될때 실행되는 함수
    for(let i = 0; i < GAME_ROWS; i++) {
        prependNewLine()
    }

}

function prependNewLine(){
    const li = document.createElement("li");
    const ul = document.createElement("ul");
    for(let j=0; j < GAME_COLS; j++){
        const matrix = document.createElement("li");
        ul.prepend(matrix);
    }
    li.prepend(ul);
    playground.prepend(li);
}