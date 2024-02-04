// DOM
const playground = document.querySelector(".playground > ul");

// Setting
const GAME_ROWS =20;
const GAME_COLS = 10;

let score = 0;
let duration = 500;
let downInterval ;
let tempMovingItem; // 무빙을 실제로실행하기 전에 잠깐 담아두는 변수

const BLOCKS= {
    tree: [
        // 4개의 배열은 특정 블럭을 회전시켰을때 나올 수 있는 4개의 모양 ( direction )
        [[0,0],[0,1],[1,0],[1,1]],
        [],
        [],
        [],
    ]
}

const movingItem = {
    // type과 좌표정보 저장변수
    type: "tree",
    direction: 0, // 화살표 방향 위를 눌렀을때 회전시키는용도
    top: 0,
    left: 0,
};

init()

//functions
function init(){
    // 처음 script가 호출이 될때 실행되는 함수
    tempMovingItem = {...movingItem};
    // 스프레드 오퍼레이터를 통해서 변수를 담으면 movingItem내부의 값만 tempMovingItem에 저장됨

    for(let i = 0; i < GAME_ROWS; i++) {
        prependNewLine()
    }
    renderBlocks();
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

function renderBlocks(){
    // BLOCKS의 모양대로 렌더링해주는 역할
    //  tempMovingItem 내부의 속성들을 바로 바로 사용할 수 있는 변수로 선언
    const { type, direction, top, left } = tempMovingItem;
    console.log(BLOCKS[type][direction])
    BLOCKS[type][direction].forEach(block => {
        const x = block[0];
        const y = block[1];
        console.log({playground})
        const target = playground.childNodes[y].childNodes[0].childNodes[x];
        console.log(target)
        target.classList.add(type)
    
    })

    
}