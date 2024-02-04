const playground = document.querySelector(".playground > ul");
console.log(playground)
for(let i = 0; i < 20; i++) {
    // ul태그 내부에 넣을 20줄의 li tag를 생성 
    const li = document.createElement("li");
    // 20줄의 li tag안에 각각 넣을 20개의 ul tag를 생성, 이건 display: flex;로 자식요소 li를 가로로배치
    const ul = document.createElement("ul");
    // 10개의 li을 생성하기 위한 반복문
    for(let j=0; j<10; j++){
        const matrix = document.createElement("li");
        // ul태그에 10개의 li태그를 prepend를 통해서 넣기
        ul.prepend(matrix);
    }
    // (10개의 li태그가 들어있는 ul태그)를 20줄의 li태그에 각각 집어넣기
    li.prepend(ul);
    // 이렇게 생성된 li태그를 playground의 ul태그에 집어넣기
    playground.prepend(li);
    // 한사이클이 가로로 10개의 쉘을 가진 li요소가 playground > ul 요소에 붙여짐 이걸 20번 반복
}