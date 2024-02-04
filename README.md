    init,renderBlocks함수(~19:51) 부분 설명 :

![image](https://github.com/twingay96/tetris/assets/64403357/392fd7b5-b6b3-4195-b30b-328f774c5791)
![image](https://github.com/twingay96/tetris/assets/64403357/400f3f6c-e6b3-4ef7-8f77-ac718290d9e5)

이렇게 선언을 하면 의미가 없음 그 이유는

![image](https://github.com/twingay96/tetris/assets/64403357/1b8c68c3-4eb8-400a-8694-3fa818b5f86f)

movingItem의 속성 값이 변할 시에 , tempMovingItem값도 함께 따라서변해버리기 때문 임:

![image](https://github.com/twingay96/tetris/assets/64403357/8dab3b4d-41a6-4b44-9d0c-17d5a9e71c20)

tempMovingItem값은 계속해서 바뀌는데 바꾼 값이 칸밖을 나가지는 등의 상황이라면 바꾼값을 다시 원복 시켜야하기 때문에 스프레드 오퍼레이터를 통해서 변수를 저장시켜야함:

![image](https://github.com/twingay96/tetris/assets/64403357/6331f515-65c8-4d65-b311-dcef6bd3f811)
![image](https://github.com/twingay96/tetris/assets/64403357/57888291-6d5c-4c06-a648-c41b40c0be48)

스프레드 오퍼레이터를 통해서 변수를 담으면 movingItem내부의 값만 tempMovingItem에 저장되기 때문에 movingItem값이 변경되더라도 tempMovingItem값은 변하지 않음

    키 입력에따라 블럭이동 구현 (~30:51) :

![image](https://github.com/twingay96/tetris/assets/64403357/505016ce-f6f4-43ec-8041-1eed203e0949)

이벤트 리스너로 키보드 입력을 해보면 브라우저의 console에 

![image](https://github.com/twingay96/tetris/assets/64403357/c66fbb74-a18c-4e15-a762-8487ead65da6)

와 같이 출력되는 것을 확인 할 수 있으며, 펼쳐서 내부를 자세히 살피면 

![image](https://github.com/twingay96/tetris/assets/64403357/65eddfca-df33-46bb-85cf-d8f8ef08d890)

키 입력마다 고유의 KeyCode를 가지고 있음을 알 수 있음 keyCode를 통해서 어떤 입력이 되었는지 식별이 가능함.
좌 우 하 방향키 입력에 따라 블럭을 이동시키도록 구현:

![image](https://github.com/twingay96/tetris/assets/64403357/50e3d9e1-cbb6-4f20-a55e-a256d5181532)



