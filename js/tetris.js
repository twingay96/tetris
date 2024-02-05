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
        [[2,1],[0,1],[1,0],[1,1]],
        [[1,2],[0,1],[1,0],[1,1]],
        [[1,2],[0,1],[2,1],[1,1]],
        [[2,1],[1,2],[1,0],[1,1]],
    ]
}

const movingItem = {
    // type과 좌표정보 저장변수
    type: "tree",
    direction: 0, // 화살표 방향 위를 눌렀을때 회전시키는용도
    top: 0,
    left: 0,
    // top와 left를 통해서 블럭의 위치를 조정, 방향키를 입력시 변화하게끔
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

function renderBlocks(moveType=""){
    // BLOCKS의 모양대로 렌더링해주는 역할
    //  tempMovingItem 내부의 속성들을 바로 바로 사용할 수 있는 변수로 선언
    const { type, direction, top, left } = tempMovingItem;
    const movingBlocks = document.querySelectorAll(".moving");
    movingBlocks.forEach(moving=>{
        moving.classList.remove(type, "moving");
    })


    BLOCKS[type][direction].some(block => {
        const x = block[0] + left;
        const y = block[1] + top;

        const target = playground.childNodes[y] ? playground.childNodes[y].childNodes[0].childNodes[x] : null;
        // checkEmpty가 단순히 여백여부만을 체크 하는 것이 아니라 seized 클래스를 가진 것이 있는지도 체크하도록 수정
        const isAvailable = checkEmpty(target);
        if(isAvailable){
            target.classList.add(type, "moving");
        } else {
            tempMovingItem = { ...movingItem };
            setTimeout( ()=> {
                renderBlocks();
                if(moveType === "top"){
                    seizeBlock(); 
                }
            },0)
            return true;
        }
    })
    movingItem.left = left;
    movingItem.top = top;
    movingItem.direction = direction;
}

// seizeBlock 밑의 요소가 seized라는 클래스를 가지고 있으면 다시 한번 더 중지시키는 기능추가
function seizeBlock(){
    const movingBlocks = document.querySelectorAll(".moving");
    movingBlocks.forEach(moving=>{
        moving.classList.remove("moving");
        // moving 클래스를 제거하면 키입력에따라서 더이상 움직이지 않을 것
        moving.classList.add("seized");
    })
    // 블럭이 seized 되면 새로운 block 생성시키는 함수
    generateNewBlock();
}

 // 블럭이 seized 되면 새로운 block 생성시키는 함수
function generateNewBlock(){
    movingItem.top = 0;
    movingItem.left = 3;
    movingItem.direction =0;
    tempMovingItem = {...movingItem};
    renderBlocks();
}

//checkEmpty가 단순히 여백여부만을 체크 하는 것이 아니라 seized 클래스를 가진 것이 있는지도 체크하도록 수정
function checkEmpty(target){
    if(!target || target.classList.contains("seized")){
        return false;
    }
    return true;
}

function changeDirection(){
    const direction = tempMovingItem.direction;
    direction === 3? tempMovingItem.direction = 0 : tempMovingItem.direction +=1;
    renderBlocks();
}

// event handling
document.addEventListener("keydown", e=> { 
    switch(e.keyCode){
        case 39:
            moveBlock("left", 1);
            break;
        case 37:
            moveBlock("left", -1);
            break;
        case 40:
            moveBlock("top", 1);
            break;
        case 38:
            changeDirection();
            break;
        default:
            break;
    }
})

function moveBlock(moveType, amount ){
    // tempMovingItem 내부의 top, left 등을 변경시켜줌
    tempMovingItem[moveType] += amount;
    renderBlocks(moveType)
}