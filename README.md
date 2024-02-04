init,renderBlocks함수(~19:51) 부분 설명:

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
