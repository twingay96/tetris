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

이런식으로 기존의 블럭위치가 지워지지 않고 채워지는 현상이 생김 :

![image](https://github.com/twingay96/tetris/assets/64403357/9b5df70b-3799-4bd3-acdf-ad1419c45099)

이것을 해결하기위해서 renderblocks함수 내부에 moving이라는 클래스를 추가해서 

![image](https://github.com/twingay96/tetris/assets/64403357/e2210ac9-5329-4563-96d8-ca1b5740edbd)

renderBlocks를 할 때 moving클래스를 가지고 있는 모든 element를 불러오고 :

![image](https://github.com/twingay96/tetris/assets/64403357/28febd88-a3f3-44d0-ab98-1e4bf13845f4)

moving클래스를 가진 요소들은 moving와 type클래스를 제거하도록 하기 :

![image](https://github.com/twingay96/tetris/assets/64403357/9eecff64-686f-46d2-9c3e-cdec108960dd)

이렇게 함으로써 tree class가 없어지므로 css에 의해서 해당 셀(matrix)는 비워지게됨.

블럭이 정해진 공간 이상으로 벗어날 경우 : 

![image](https://github.com/twingay96/tetris/assets/64403357/339c1ef8-7fc7-4e77-a635-e236ffed3026)

playground.childNodes[y]가 없거나 playground.childNodes[y].childNodes[0].childNodes[x]가 없는경우 임 
이경우를 다루기위해서 3항 연산자를 사용함 

![image](https://github.com/twingay96/tetris/assets/64403357/1edb6afa-31f4-4a55-b20a-4a03925dc3a5)

그런데 이렇게만 해서는 playground.childNodes[y].childNodes[0].childNodes[x] 값이 없는 경우는 처리하지 못하기 때문에 새로운 함수로 이것을 판별하는 로직을 추가
현재 하는 로직은 블럭이 정해진 공간 밖으로 벗어나지 않도록 하는 역할도 있지만, 블럭이 맨 하단으로 떨어졌을때, 또 다른 블럭이 생성이 되고 또 블럭이 떨어질때 밑에 쌓인 블럭이 있는지 없는지를 체크 하는 것도 필요하기 때문에 함수를 추가해야함

![image](https://github.com/twingay96/tetris/assets/64403357/c41c08ac-83bb-448c-8aaa-f6fb4205bae8)

이런 재귀함수를 사용할 때 조심해야하는 것이 call stack maximum 을 초과하는 에러가 발생 할 수 도 있는 것을 주의해야함, 그것을 방지하기 위해서 renderBlocks 를 event loop안에 넣지 말고, 
외부로 빼놨다가( task que 에 넣어놨다가  )event loop가 실행 된 후에 실행될 수 있도록 setTimeout() 으로 밖에 빼놓기

setTimeout()을 하게 되면 , event 루프에 예약된 event들이 전부 실행이 된 후에 stack에 다시 집어넣기 때문에 0초를 주더라도 event stack이 넘처버리는 것을 방지 할 수 있음

일단 timeout 적용하지 않고 실행해보면 : 

![image](https://github.com/twingay96/tetris/assets/64403357/37391cba-6565-4115-ba44-23fb5a7cea24)

넘치면 BLOCK을 다시 render했는데 이렇게 되면 안되고 바로직전의 옆으로 블럭이 이동해야함 , renderBlocks()가 성공할때마다 movingItem을 업데이트 해줘야함 

![image](https://github.com/twingay96/tetris/assets/64403357/568846e7-797f-4160-97ea-d499c81857ce)

이렇게 변경하고 다시 실행해보면: 

![image](https://github.com/twingay96/tetris/assets/64403357/3e1e061f-a6c3-4857-86d5-3c72af2299d0)
![image](https://github.com/twingay96/tetris/assets/64403357/c5a1dd67-58dc-4179-804f-ecc7dfbe17b4)

Maximum call stack size exceeded 에러가 발생하는 것을 확인 할 수 있음
블럭이 정해진 공간 밖을 나가게 되었을때 renderBlcoks()가 재귀로 계속 호출되면서 forEach가 계속 반복되기 때문에 이런 현상이 나타나기 때문임
이것을 해결하기 위해서 setTimeout을 하는것 
이제 아래로 이동하는 경우에대해서도 처리해주기





