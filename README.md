# 태고 서열표 웹 만들기

## 0. 목차 

+ 링크 및 실행 방법
+ 제작 동기
+ 사용 언어
+ 제작 순서
	+ 프로젝트 초기화
	+ Front End
	+ 연동 기능
	+ Heroku로 배포
+ 기타 후기

## 1. 링크 및 실행 방법

+ 배포 결과물 : https://cutesnom.herokuapp.com/

> Heroku의 응답 시간 제한으로 인하여 현재 연동 기능을 대거 축소하였다.


#### 코드를 다운 받고 로컬로 실행하는 방법 

우선 다음과 같은 패키지를 다운 받는다.
```
npm i express
npm i nodemon
npm i puppeteer
```
실행 명령어는 다음과 같다.
```
npm run dev
```

## 2. 제작 동기

태고의 달인 비공식 서열표를 이전 포토샵으로 작업하는 것과 다르게 좀 더 쉽게 정보를 수정하거나 바로 반영이 되는 웹의 방식으로 개발을 하였다. 또한 사용자가 일일히 성적을 체크하는 것이 아닌 동더히로바를 통하여 자동적으로 곡의 기록을 표시해 주는 연동 서비스를 추가하였다.

## 3. 사용 언어

사용자에게 보여줄 Front End는 Typescirpt로 이루어진 React로 정하였고, 연동 기능에 사용할 서버는 Express와 정보 수집을 도와줄 Puppeteer를 사용하였다. 

## 4. 제작 순서

### 프로젝트 초기화

### Front End

사용자에게 보여줄 웹 화면은 크게 난이도 버튼하고 각 난이도 별의 정보 그리고 서열표 표로 나뉠 수 있다. 

``` typescript
{/*...*/}
return (
	<div id="main">
        <LevelMamu />
        <LevelInfo Data={Ono6 ? o6 : (Ono7 ? o7 : (Ono8 ? o8 : (Ono9 ? o9 : (Ono10 ? o10 : DataM))))} />
        <div id = "ranking">
          <Ranking_Header />
          <Test_Table Data={Ono6 ? o6 : (Ono7 ? o7 : (Ono8 ? o8 : (Ono9 ? o9 : (Ono10 ? o10 : DataM))))} />
        </div>
	</div>
)

```

#### 난이도 버튼 만들기

사용자에 보여줄 파일인 ranking.tsx에 다음과 같이 입력해 준다.

``` typescript
import React, { useState, useEffect } from "react";

const [Onh8, setOnh8] = useState(false)
const [Ono6, setOno6] = useState(false)
const [Ono7, setOno7] = useState(false)
const [Ono8, setOno8] = useState(false)
const [Ono9, setOno9] = useState(false)
const [Ono10, setOno10] = useState(true)

const LevelMamu = () => {
    return (
      <div id="level_mamu">
        <button className={Onh8 ? "on_button hard_8_on" : "level_button hard_8"}
          onClick={() => { setOnh8(true); setOno6(false); setOno7(false); setOno8(false); setOno9(false); setOno10(false) }}>
          <img src="img/hard_8.png" width={'100px'} height={'100px'} />
        </button> 

        <button className={Ono6 ? "on_button oni_6_on" : "level_button oni_6"}
          onClick={() => { setOnh8(false); setOno6(true); setOno7(false); setOno8(false); setOno9(false); setOno10(false) }}>
          <img src="img/oni_6.png" width={'100px'} height={'100px'} />
        </button> {/*후략*/}
      </div>
    )
  }

```

css 스타일은 보기 쉽게 중앙으로 가로 방향으로 일렬로 정렬하는 방식으로 작성하였다.

``` css

#level_mamu {
    margin: 0px;
    border: 0px;

    background-color: rgb(48, 48, 48);

    width: 100vw;
    height: 120px;

    display: flex;

    justify-content: center;
    align-items: center;
    text-align: center;

    flex-direction: row;

    overflow-x: auto;
    overflow-y: hidden;
}


```
또한 현재 어느 난이도에 있는지 표시하거나 간단한 애니메이션도 추가하였다.

``` css

.level_button {
    border: none;
    outline: none;

    transition-duration: 0.3s;
    cursor: pointer;
    opacity: 0.35;
}

.on_button {
    border: none;
    outline: none;
}

.level_button:hover {
    opacity: 0.75;
}


```

#### 난이도 정보 만들기

난이도 정보는 왕관이랑 극을 기준으로 나뉜 기록 테이블로 구성되어있다.

우선 해당 조건에 맞는 데이터 별로 나뉘어준다.

``` typescript
const donerfullcombo = Data_tmp.filter((item: any, index: number) => (item.crown > 3))
    const fullcombo = Data_tmp.filter((item: any, index: number) => (item.crown > 2))
    const clear = Data_tmp.filter((item: any, index: number) => (item.crown > 1))

    const scored_6 = Data_tmp.filter((item: any, index: number) => (item.k_score <= item.score))
    const scored_5 = Data_tmp.filter((item: any, index: number) => (item.k_score - item.score <= 50000 && item.k_score > item.score))
    const scored_4 = Data_tmp.filter((item: any, index: number) => (item.k_score - item.score <= 100000 && item.k_score - item.score > 50000))
    const scored_3 = Data_tmp.filter((item: any, index: number) => (item.k_score - item.score <= 200000 && item.k_score - item.score > 100000))
    const scored_2 = Data_tmp.filter((item: any, index: number) => (item.k_score - item.score <= 300000 && item.k_score - item.score > 200000))
    const scored_1 = Data_tmp.filter((item: any, index: number) => (item.k_score - item.score <= 400000 && item.k_score - item.score > 300000))
    const scored_0 = Data_tmp.filter((item: any, index: number) => (item.k_score - item.score <= 500000 && item.k_score - item.score > 400000))

```

그 다음 기록 정보가 포함된 테이블 컴포넌트를 제작한다. 어느 정도 도달하였는지 알기 쉽도록 왕관 테이블 오른쪽에 위치한 바형식의 그래프 또한 제작한다.

``` typescript
<div className='level_info_table_div' style = {Onh8 ? {visibility: "hidden"} : {visibility: "visible"}}>
            <table className="level_info_table">
              <tbody>
                <tr>
                  <th className="level_info_table_0"> 왕관 </th>
                  <th className="level_info_table_1"> 달성 </th>
                  <th className="level_info_table_2"> 미달성 </th>
                  <th className="level_info_table_3">  </th>
                  <th> 진행도 </th>
                </tr>
                <tr>
                  <td className="level_info_table_0"> <img src="img/crown2.png" height={'30px'} /> </td>
                  <td className="level_info_table_1"> {clear.length} </td>
                  <td className="level_info_table_2"> {Data_tmp.length - clear.length} </td>
                  <th className="level_info_table_3"> {(clear.length / Data_tmp.length * 100).toFixed(1) + "%"} </th>
                  <td>
                    <div className="Progress">
                      <div className="CBar" style={{ width: `${(clear.length / Data_tmp.length) * 100}%` }} title = { clear.length + " / " + Data_tmp.length }></div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="level_info_table_0"> <img src="img/crown3.png" height={'30px'} /> </td>
                  <td className="level_info_table_1"> {fullcombo.length} </td>
                  <td className="level_info_table_2"> {Data_tmp.length - fullcombo.length} </td>
                  <th className="level_info_table_3"> {(fullcombo.length / Data_tmp.length * 100).toFixed(1) + "%"}</th>
                  <td>
                    <div className="Progress">
                      <div className="FCBar" style={{ width: `${(fullcombo.length / Data_tmp.length) * 100}%` }} title = { fullcombo.length + " / " + Data_tmp.length }></div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="level_info_table_0"> <img src="img/crown4.png" height={'30px'} /> </td>
                  <td className="level_info_table_1"> {donerfullcombo.length} </td>
                  <td className="level_info_table_2"> {Data_tmp.length - donerfullcombo.length} </td>
                  <th className="level_info_table_3"> {(donerfullcombo.length / Data_tmp.length * 100).toFixed(1) + "%"} </th>
                  <td>
                    <div className="Progress">
                      <div className="DFCBar" style={{ width: `${(donerfullcombo.length / Data_tmp.length) * 100}%` }} title = { donerfullcombo.length + " / " + Data_tmp.length }></div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
```  

막대 바용 css 

``` css

.Progress {
    margin-left: 5%;
    width: 90%;
    background-color: rgba(24, 24, 24, 0.9);
    border-radius: 4px;

    overflow: hidden;

    display: flex;

    justify-content: flex-start;
    align-items: center;
    text-align: center;

    flex-direction: row;
}

.CBar {
    width: 0%;
    height: 25px;
    background: linear-gradient(to right, rgb(135, 170, 170), rgb(197, 227, 227));
    border-radius: 4px;
}

.FCBar {
    width: 0%;
    height: 25px;
    background: linear-gradient(to right, rgb(195,158,29), rgb(254,235,95));
    border-radius: 4px;
}

.DFCBar {
    width: 0%;
    height: 25px;
    background: linear-gradient(to right, rgb(81,111,158), rgb(107,243,144), rgb(253,232,34), rgb(252,135,109), rgb(208,105,207));
    border-radius: 4px;
}

```

극 테이블 왼쪽 부분에 있는 원형 차트 같은 경우 css 대신 svg를 이용하여 제작하였다. 12시 방향을 기준으로 시계방향으로 값이 누적되는 그래프 형식이다. 또한 일정 비율을 넘기면 중앙에 이미지가 표시된다.

``` typescript

React.useEffect(() => {
      const radius = 30; 
      const diameter = 2 * Math.PI * radius;
      
      const colors = ['#37D6EC', '#8551D1', '#EA6A8F', '#E1AA02', '#6B70A2', '#99441F', '#D3D3D3'];
      const im_href = ["img/score_rank_8.png", "img/score_rank_7.png", "img/score_rank_6.png", "img/score_rank_5.png", "img/score_rank_4.png", "img/score_rank_3.png", "img/score_rank_2.png"];
      const dataset = [scored_6.length, scored_5.length, scored_4.length, scored_3.length, scored_2.length, scored_1.length, scored_0.length];
      const total = Data_tmp.length;

      const acc = dataset.reduce((arr, v, i) => {
        const last = arr[arr.length - 1];
        return [...arr, last + v];
      }, [0]);

      const svg = document.getElementById('svg');
      dataset.forEach((data, i) => {
        const ratio = data / total;
        const fillSpace = diameter * ratio;
        const emptySpace = diameter - fillSpace;
        const offset = ((acc[i] / total) - 0.25) * diameter ;

        if(data !== 0) {
          const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
          const title = document.createElementNS('http://www.w3.org/2000/svg', 'title');
          const im = document.createElementNS('http://www.w3.org/2000/svg', 'image');
          let xs, ys, avg;

          if (i === 6) {
            avg = (acc[i] + acc[i] + dataset[i]) / 2 / total;
          }
          else {
            avg = (acc[i] + acc[i + 1]) / 2 / total;
          }

          xs = 42.5 + 30 * Math.sin( (avg) * 2 * Math.PI );
          ys = 42.5 - 30 * Math.cos( (avg) * 2 * Math.PI );

          circle.setAttribute('cx', '50');
          circle.setAttribute('cy', '50');
          circle.setAttribute('r', String(radius));
          circle.setAttribute('fill', 'transparent');
          circle.setAttribute('stroke', colors[i]);
          circle.setAttribute('stroke-width', '30');
          circle.setAttribute('stroke-dasharray', `${fillSpace} ${emptySpace}`);
          circle.setAttribute('stroke-dashoffset', String(-offset));
  
          title.textContent = dataset[i] + " / " + total;

          im.setAttribute('href', im_href[i]);
          im.setAttribute('x',  String(xs));
          im.setAttribute('y',  String(ys));
          im.setAttribute('height', '15');
          im.setAttribute('width', '15');

          circle.appendChild(title);
          svg.appendChild(circle);
          if((dataset[i] / total) >= 0.045) {svg.appendChild(im)};
        }
      
      });

```

#### 서열표 표 만들기 



### 연동 기능

### Heroku로 배포

## 5. 기타 



## 6. 참고

https://github.com/recordboy/scrap-sample
https://jung-story.tistory.com/101
https://jung-story.tistory.com/100?category=882480
