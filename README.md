# 태고 서열표 웹

![](https://github.com/kongsanggun/Taiko-Info/blob/master/readme_img/1.png)
![](https://github.com/kongsanggun/Taiko-Info/blob/master/readme_img/2.png)

> 화면 미리보기

## 0. 목차 

+ [링크 및 실행 방법](https://github.com/kongsanggun/Taiko-Info#1-%EB%A7%81%ED%81%AC-%EB%B0%8F-%EC%8B%A4%ED%96%89-%EB%B0%A9%EB%B2%95)
+ [제작 동기](https://github.com/kongsanggun/Taiko-Info#2-%EC%A0%9C%EC%9E%91-%EB%8F%99%EA%B8%B0)
+ [사용 언어](https://github.com/kongsanggun/Taiko-Info#3-%EC%82%AC%EC%9A%A9-%EC%96%B8%EC%96%B4)
+ [제작 순서](https://github.com/kongsanggun/Taiko-Info#4-%EC%A0%9C%EC%9E%91-%EC%88%9C%EC%84%9C)
	+ [프로젝트 만들기 & 초기화](https://github.com/kongsanggun/Taiko-Info#%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EB%A7%8C%EB%93%A4%EA%B8%B0--%EC%B4%88%EA%B8%B0%ED%99%94)
	+ [사용자 화면 만들기](https://github.com/kongsanggun/Taiko-Info#%EC%82%AC%EC%9A%A9%EC%9E%90-%ED%99%94%EB%A9%B4-%EB%A7%8C%EB%93%A4%EA%B8%B0)
	+ [연동 기능](https://github.com/kongsanggun/Taiko-Info#%EC%97%B0%EB%8F%99-%EA%B8%B0%EB%8A%A5)
	+ [Heroku로 배포](https://github.com/kongsanggun/Taiko-Info#heroku%EB%A1%9C-%EB%B0%B0%ED%8F%AC)
+ [기타 후기](https://github.com/kongsanggun/Taiko-Info#5-%ED%9B%84%EA%B8%B0)
+ [참조 링크](https://github.com/kongsanggun/Taiko-Info#6-%EC%B0%B8%EA%B3%A0)

## 1. 링크 및 실행 방법

+ 배포 결과물 : https://cutesnom.herokuapp.com/

> Heroku의 응답 시간 제한으로 인하여 현재 연동 기능을 대거 축소하였다.

### 코드를 다운 받고 로컬로 실행하는 방법 

우선 터미널에서 다음과 같은 명령어를 입력하세요.
```
cd 다운 받은 경로
npm i react-scripts
npm i express
npm i nodemon
npm i puppeteer
```
웹 실행 명령어입니다.
```
npm run dev
```

## 2. 제작 동기

아케이드 리듬게임으로 서비스되고 있는 태고의 달인이라는 게임의 비공식 서열표를 이전 포토샵으로 수작업으로 수정하는 것을 좀 더 웹을 통하여 자동적으로 반영이 되는 방식으로 개발을 하였다. 또한 사용자가 일일히 각 곡의 성적을 체크하는 것이 아닌 자동적으로 곡의 기록을 표시해 주는 연동 서비스를 추가하였다.

![](https://github.com/kongsanggun/Taiko-Info/blob/master/readme_img/3.png)
![](https://github.com/kongsanggun/Taiko-Info/blob/master/readme_img/4.png)
![](https://github.com/kongsanggun/Taiko-Info/blob/master/readme_img/5.png)

> 연동 서비스 적용 예시

## 3. 사용 언어

우선 각 곡의 정보는 json형식으로 진행하였다. 곡의 데이터 형식은 다음과 같다.
``` JSON
[
    {
        "id": 79, // 곡 고유 아이디
        "title": "天国と地獄 序曲", // 곡 제목
        "sub_title_kor": "천국과 지옥 서곡", 
        "sub_title_eng": null,
        "level": 6, // 레벨
        "ranked": 2, // 동 레벨 내의 난이도
        "ranked_idx": 0,
        "genre": 66, // 장르
        "notice": 0, // 참고
        "do_jo": 0,  // 단위 과제곡 표시
        "k_score": 1004180, // 극 점수 (0일시 1000000)
        "score": 0, // 극
        "crown": 0, // 왕관
        "play_times": 0 // 플레이 횟수
    },
]
```

또한 사용자에게 보여줄 화면은 컴포먼트를 만들어서 쉼게 사용할 수 있는 React로 정하였고, 연동 서비스에 사용할 서버는 Express와 정보 수집을 도와줄 Puppeteer를 사용하였다. 
특히 Puppeteer 같은 경우 Handless 기능이 있어서 자동화된 정보 수집에 효과적이었다.

## 4. 제작 순서

### 프로젝트 만들기 & 초기화

프로젝트의 파일 형식은 서버용 파일을 상위로 하여 그 안에 사용자용 파일이 있는 형식으로 제작하였다.

```
mkdir my-app
cd my-app 
echo node_modules > .gitignore
npm init -y
npm install express nodemon concurrently
```
> 서버용 파일 만들기

```
create-react-app client --use-npm --template typescript
```
> 사용자용 React 파일 만들기

서버용 파일에서 서버로 사용할 index.js 파일을 생성하였다.

``` js
const express = require("express");
const app = express();

const port = process.env.PORT || 5000;
app.listen(port);

app.use("/api/data", function (req, res) {
  res.json({ greeting: "Hello World" });
});

console.log(`server running at http ${port}`);
```

사용자용 파일에서 프록시를 설정하였다.

```
cd 사용자용 파일
npm install http-proxy-middleware
```
> 터미널

``` js
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api/data", {
      target: "http://localhost:5000",
      changeOrigin: true,
    })
  );
};
```
> src/setupProxy.js

마지막으로 서버와 사용자가 동시에 시작될 수 있게 서버 파일의 package.json을 다음과 같이 수정하였다.

``` JSON
"scripts": {
  "start": "nodemon index.js",
  "dev": "concurrently \"npm run dev:server\" \"npm run dev:client\"",
  "dev:server": "npm start",
  "dev:client": "cd client && npm start"
}
```

### 사용자 화면 만들기

사용자에게 보여줄 웹 화면은 다음과 같다. 

``` tsx
{/*...*/}
return (
  <div className={ispopup ? "locked App" : "App"}>
    <Mamu />
    <div id="main">
      {ispopup ? <Popup /> : ""}
      <LevelMamu />
      <LevelInfo Data={Ono6 ? o6 : (Ono7 ? o7 : (Ono8 ? o8 : (Ono9 ? o9 : (Ono10 ? o10 : DataM))))} />
      <div id = "ranking">
        <Ranking_Header />
        <Test_Table Data={Ono6 ? o6 : (Ono7 ? o7 : (Ono8 ? o8 : (Ono9 ? o9 : (Ono10 ? o10 : DataM))))} />
      </div>
      <Footer />
    </div>
  </div>
);
```
> ranking.tsx

#### 맨 위 메뉴화면 만들기

ranking.tsx에 메뉴화면 컴포먼트를 만들어 다음과 같이 입력해 준다.

``` tsx 
const Mamu = () => {
  return (
    <div id="mamu">
      <div id="mamu_list">
        <div className='list_left'>
          <div className='list_button'>클리어</div>
          <div className='list_button'>전량</div>
          <div className='list_button'>연동</div>
        </div>
        <div className='list_right'>
          <div className='list_button'>다운로드</div>
        </div>
      </div>
    </div>
  )
}
``` 

메뉴화면 화면 같은 경우 맨위에서 고정되어 있어야 하기 때문에 css에서 position를 이용하여 다음과 같은 스타일을 추가해 준다.

``` css
#mamu {
    overflow: hidden;
    background-color: rgb(32, 32, 32);
    position: fixed;

    z-index: 2;
    top: 0;
    height: 40px;
    width: 100%;

    display: flex;

    justify-content: center;
    align-items: center;
    text-align: center;

    flex-direction: row;
}
``` 

#### 난이도 버튼 만들기

ranking.tsx에 난이도 버튼 컴포먼트를 만들어 다음과 같이 입력해 준다.

``` tsx 
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

css 스타일은 보기 쉽게 중앙으로 가로 방향으로 일렬로 정렬하는 방식인 flex-direction를 활용하여 다음과 같이 작성하였다.

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
우선 각각 해당 조건에 맞는 데이터 별로 나뉘어준다.

``` tsx 
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

그 다음 기록 정보가 포함된 테이블 컴포넌트를 제작한다. 또한 왕관 테이블 오른쪽에 위치하게 만들어 어느 정도 도달하였는지 알기 쉽도록 바형식의 그래프 또한 제작한다.

``` tsx 
<div className='level_info_table_div'>
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
                <td className="level_info_table_3"> {(clear.length / Data_tmp.length * 100).toFixed(1) + "%"} </td>
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
                <td className="level_info_table_3"> {(fullcombo.length / Data_tmp.length * 100).toFixed(1) + "%"}</td>
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
                <td className="level_info_table_3"> {(donerfullcombo.length / Data_tmp.length * 100).toFixed(1) + "%"} </td>
                <td>
                    <div className="Progress">
                      	<div className="DFCBar" style={{ width: `${(donerfullcombo.length / Data_tmp.length) * 100}%` }} title = { donerfullcombo.length + " / " + Data_tmp.length }></div>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</div>
```  

막대 바용 css은 아래와 같다.

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

/* 후략 */

```

극 테이블 왼쪽 부분에 있는 원형 차트 같은 경우 css 대신 svg를 이용하여 제작하였다. 12시 방향을 기준으로 시계방향으로 값이 누적되는 그래프 형식이다. 또한 일정 비율을 넘기면 중앙에 이미지가 표시된다.

웹이 실행되자마자 차트를 제작하면 오류가 발생하므로 useEffect()를 이용하여 웹의 데이터가 전부 불러온 뒤에 그래프가 표시되도록 하였다. 

``` tsx

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

서열표 표는 앞서 위에서 설명한 곡 정보를 토대로 표시하는 식으로 제작하였다.
각 곡의 정보는 RankingData.tsx 에서 다음과 같이 제작하였다.

``` tsx
return (
    <div className="songs" key={index}>
        <div className="song_tmp" title = {(item.id < 4000) ? item.title + " > Play times : " + item.play_times : ""}>
            <div className="genre">
                {(128 & item.genre) ? <div className="namco" /> : ""}
                {(64 & item.genre) ? <div className="classical" /> : ""}
                {(32 & item.genre) ? <div className="var" /> : ""}
                {(16 & item.genre) ? <div className="games" /> : ""}
                {(8 & item.genre) ? <div className="vocal" /> : ""}
                {(4 & item.genre) ? <div className="ani" /> : ""}
                {(2 & item.genre) ? <div className="kids" /> : ""}
                {(1 & item.genre) ? <div className="pop" /> : ""}
            </div> {/* 장르 */}
            <div className="song_tmp2">
                <div className="name">
                    <div className="name2">
                        <div className="Title_col"> {/* 제목 */}
                            {item.id > 10000 ? <div className="Title_tmp"> {item.title} </div> : item.id > 4000 ? <div className="Title_M"> {item.title} </div> : item.id > 2000 ? <div className="Title_Ura"> {item.title} </div> : <div className="Title"> {item.title} </div>}
                            <div className="do_jo">
                                {(item.do_jo === 1) ? <img className="do_jo_img" src="img/1dan.png" width={'100%'} /> : ""}
                                {(item.do_jo === 2) ? <img className="do_jo_img" src="img/2dan.png" width={'100%'} /> : ""}
                                {(item.do_jo === 3) ? <img className="do_jo_img" src="img/3dan.png" width={'100%'} /> : ""}
                                {(item.do_jo === 4) ? <img className="do_jo_img" src="img/4dan.png" width={'100%'} /> : ""}
                                {(item.do_jo === 5) ? <img className="do_jo_img" src="img/5dan.png" width={'100%'} /> : ""}
                                {(item.do_jo === 6) ? <img className="do_jo_img" src="img/6dan.png" width={'100%'} /> : ""}
                                {(item.do_jo === 7) ? <img className="do_jo_img" src="img/7dan.png" width={'100%'} /> : ""}
                                {(item.do_jo === 8) ? <img className="do_jo_img" src="img/8dan.png" width={'100%'} /> : ""}
                                {(item.do_jo === 9) ? <img className="do_jo_img" src="img/9dan.png" width={'100%'} /> : ""}
                                {(item.do_jo === 10) ? <img className="do_jo_img" src="img/10dan.png" width={'100%'} /> : ""}
                                {(item.do_jo === 11) ? <img className="do_jo_img" src="img/kuroto.png" width={'100%'} /> : ""}
                                {(item.do_jo === 12) ? <img className="do_jo_img" src="img/meijin.png" width={'100%'} /> : ""}
                                {(item.do_jo === 13) ? <img className="do_jo_img" src="img/chojin.png" width={'100%'} /> : ""}
                                {(item.do_jo === 14) ? <img className="do_jo_img" src="img/tatsujin.png" width={'100%'} /> : ""}
                            </div> {/* 단위 과제곡 */}
                        </div>
                        <div className="Subtitle_col"> {/* 부제목 */}
                            <div className={item.title.length >= 20 ? "Subtitle_long" : item.title.length >= 11 ? "Subtitle_mid" : "Subtitle"}> {item.sub_title_kor}</div>
                            <div className="Bottom_Right"> {item.notice & 4 ? <div className='individual' /> : ""}{item.notice & 2 ? <div className='first_play' /> : ""}{item.notice & 1 ? <div className='full_combo' /> : ""} </div> {/* 기타 항목 */}
                        </div>
                    </div>
                </div>
                <div className="my_data"> {/* 플레이어의 기록 */}
                    <div className="crown">
                        {(item.crown === 4) ? <img src="img/crown4.png" width={'100%'} /> : ""}
                        {(item.crown === 3) ? <img src="img/crown3.png" width={'100%'} /> : ""}
                        {(item.crown === 2) ? <img src="img/crown2.png" width={'100%'} /> : ""}
                        {(item.crown === 1) ? <img src="img/crown1.png" width={'100%'} /> : ""}
                    </div> {/* 왕관 */}
                    <div className={(item.k_score <= item.score) ? "score score_6" : ((item.k_score - item.score <= 50000) ? "score score_5" : ((item.k_score - item.score <= 100000) ? "score score_4" : ((item.k_score - item.score <= 200000) ? "score score_3" : ((item.k_score - item.score <= 300000) ? "score score_2" : (item.k_score - item.score <= 400000) ? "score score_1" : (item.k_score - item.score <= 500000) ? "score score_0" : "score score_none"))))}>
                                    {(item.crown !== 0) ? item.score : ""}
                    </div> {/* 점수 */}
                    <div className="score_icon">
                        {(item.k_score <= item.score) ? <img src="img/score_rank_8.png" width={'100%'} /> : ""}
                        {(item.k_score > item.score && item.k_score - item.score <= 50000) ? <img src="img/score_rank_7.png" width={'100%'} /> : ""}
                        {(item.k_score - item.score > 50000 && item.k_score - item.score <= 100000) ? <img src="img/score_rank_6.png" width={'100%'} /> : ""}
                        {(item.k_score - item.score > 100000 && item.k_score - item.score <= 200000) ? <img src="img/score_rank_5.png" width={'100%'} /> : ""}
                        {(item.k_score - item.score > 200000 && item.k_score - item.score <= 300000) ? <img src="img/score_rank_4.png" width={'100%'} /> : ""}
                        {(item.k_score - item.score > 300000 && item.k_score - item.score <= 400000) ? <img src="img/score_rank_3.png" width={'100%'} /> : ""}
                        {(item.k_score - item.score > 400000 && item.k_score - item.score <= 500000) ? <img src="img/score_rank_2.png" width={'100%'} /> : ""}
                    </div> {/* 극 */}
                </div>
            </div>
        </div>
    </div>
)
```
#### 반응형 웹

브라우저의 width 값에 따라 사용자의 화면을 변경하게 만들었다.

``` css

@media screen and (max-width : 720px) {
  .score_icon {
    width: 20%;
  }
  .score {
    width: 60%;
  }
  .crown {
    width: 20%;
  }
  .do_jo_img{
    width: 17px;
    height: 17px;
  }
  .Subtitle_long {
    visibility: hidden;
  }
  .level_info {
    height: 1180px;
  }
}

``` 

### 연동 기능

#### 팝업 기능과 입력 컴포넌트 만들기

연동 기능 화면에 사용할 팝업 컴포넌트와 그 안에 정보를 입력할 입력 컴포넌트를 다음과 같이 생성하였다.

``` tsx
const Popup = () => {
  return (
    <div id="popup">
      <div id="popup_back" onClick={() => { if (!isOnLoading) { handlePopup(); loginerror(false); setIsgood(false); } }}>
      </div>
      <div className="popup_main">
        {isOnLoading ? "" : <Popup_Top />}
        {isOnLoading ? "" : <Popup_2 />}
        {isOnLoading ? "" : <Popup_1 />}
        {isOnLoading ? "" : <SearchForm getData={getData} />}
        <SearchLoading isOnLoading={isOnLoading} />
        {isloginerror ? <div className="popup_error">로그인 에러</div> : ""}
        {isgood ? <div className="popup_good"> 기록 불러오기 성공! </div> : ""}
      </div>
    </div>
  );
}
```
> 팝업 화면

``` tsx
import React, { useState } from "react";

const SearchForm = (props: { getData: any }) => {
  const { getData } = props;
  const [Id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [isinputerror, setinputerror] = useState(false)
  return (
    <div>
      <div className="form">
        <div className="email_form">
          <div> 이메일 </div>
          <input type="text" className="form-text"
            onChange={(e: any) => {
              setId(e.target.value);
          }} />
        </div>
        <div className="password_form">
          <div> 비밀번호 </div>
          <input type="password" className="form-text"
            onChange={(e: any) => {
              setPassword(e.target.value);
          }} />
        </div>
        <button type="button" className="form-btn"
          onClick={() => {
            setinputerror(false)
            if (Id && password) {getData(Id, password);}
            else { setinputerror(true) }
        }}> search </button>
      </div>
      {isinputerror ? <div className = "popup_error"> 이메일과 비밀번호를 입력해주세요 </div> : ""}
    </div>
  );
};

export default SearchForm;

```
> 입력 화면

입력 화면 화면에서 이메일과 비밀번호를 입력한 후 버튼을 클릭하면 해당 정보가 RankingData.tsx에 있는 getData() 에게 전달되어진다. 단, 하나라도 입력되지 않는다면 화면에 isinputerror가 뜨게 만들었다. 

``` tsx

const getData = (keyword: string, password: string) => {
setIsOnLoading(true);
loginerror(false);
setIsgood(false);

fetch(`api/data?keyword=${keyword}&password=${password}`)
  .then((res) => {
    return res.json();
    })
    .then((data) => {
      if (data === null) {
        loginerror(true);
      }
      else {
        songdata.map((item1: any, idx: number) => {
          data.map((item2: any, idx: number) => {
            if (item1.id === item2.id) {
              item1.score = item2.score;
              item1.crown = item2.crown;
              item1.play_times = item2.play_times;
            }
          })
        })
        setIsgood(true);
      }
      setData(songdata);
      setIsOnLoading(false);
  })
};

``` 
서버에 요청를 보낸 결과는 곡 정보에 추가하도록 작성하였다. 

#### 연동기능 만들기

연동기능은 index.js 에서 puppeteer를 추가하여 작성하였다.

``` js

// puppeteer 모듈 불러오기
const puppeteer = require("puppeteer");

@param {string} keyword 검색 키워드
@return {Array} 검색 결과

async function openBrowser(keyword, password) {

  let AllData = [];
  
  const browser = await puppeteer.launch({headless: false});
  // 브라우저 열기
  const page = await browser.newPage();

  // 포탈로 이동
  await page.goto("https://donderhiroba.jp/login.php");

  // 브라우저 닫기
  browser.close();

  // 검색결과 반환
  return AllData;
}
``` 
index.js 에서 곡 데이터를 다음과 같은 형식으로 크롤링 할 예정이다.

``` JSON
[
  {
    "id": "아이디 번호",
    "song": "곡 제목",
    "score": "점수 정보",
    "crown": "왕관",
    "play_times" : "플레이 횟수",
  },
]
```
우선 입력된 정보를 이용하여 동더히로바에 접속을 하게 만든다.

``` js
// 포탈로 이동
await page.goto("https://donderhiroba.jp/login.php");

// 다음 버튼을 클릭
await page.evaluate(() => {
  const nextBtn = document.querySelector("#login_form > div > img");
  if (nextBtn) {
    nextBtn.click();
  }
});

// 예외 처리
try {
  // 해당 콘텐츠가 로드될 때까지 대기
  await page.waitForSelector("#mail", { timeout: 2000 });
} catch (error) {
  console.log("에러 발생: " + error);
  return null;
}

await page.type("input[id='mail']", keyword);
await page.type("input[id='pass']", password);

// 다음 버튼을 클릭
await page.evaluate(() => {
  const nextBtn = document.querySelector("#btn-idpw-login");
  if (nextBtn) {
    nextBtn.click();
  }
});

// 예외 처리
try {
  // 해당 콘텐츠가 로드될 때까지 대기
  await page.waitForSelector("#form_user1 > div", { timeout: 5000 });

  // 다음 버튼을 클릭
  await page.evaluate(() => {
    const nextBtn = document.querySelector("#form_user1 > div > a > div > div");
    if (nextBtn) {
      nextBtn.click();
    }
  });
} catch (error) {
  console.log("에러 발생: " + error);
}

try {
  // 해당 콘텐츠가 로드될 때까지 대기
  await page.waitForSelector("#content > div.button_area.clearfix > div.mydon_button_area", { timeout: 5000 });
} catch (error) {
  console.log("로그인 에러");
  return null;
}

``` 
page.waitForSelector()를 이용하여 해당 시간 내에 css가 나타나지 않을 시 로그인 실패로 간주하였다.(timeout)

#### 병렬 방식으로 크롤링하기

모든 곡 정보를 수집하기 위해서 1000개 정도의 많은 페이지를 탐색해야하므로 빠른 처리 속도를 위하여 병렬 탐색을 이용하여 정보를 수집하였다.

``` js
let test = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

await Promise.all(test.map(async (index) => {
  const pages = await browser.newPage()
  await pages.setRequestInterception(true);

  pages.on('request', (req) => {
    switch (req.resourceType()) {
      case 'stylesheet':
      case 'font':
      case 'image':
        req.abort()
        break;
      default:
        req.continue();
        break;
    }
  });

  for (var i = 1; i <= 120; i++) {
    if (index * 120 + i > 1115) { continue }
    if (errors.indexOf(index * 120 + i) != -1) { continue }

    await pages.goto("https://donderhiroba.jp/score_detail.php?song_no=" + (index * 120 + i) + "&level=4");
    try {
      await pages.waitForSelector("#menu", { timeout: 5000 });
      AllData.push(...(await crawlingData(index * 120 + i)));
    } catch (error) { }

    if (ura.indexOf(index * 120 + i) != -1) {
      await pages.goto("https://donderhiroba.jp/score_detail.php?song_no=" + (index * 120 + i) + "&level=5");
      try {
        await pages.waitForSelector("#menu", { timeout: 5000 });
        AllData.push(...(await crawlingData(index * 120 + i + 2000)));
      } catch (error) { }
    }
  }
}))
```
> 병렬 방식

페이지 별로 다음과 같이 정보를 크롤링 하였다.

``` js

async function crawlingData(tmp1) {
  const tmp2 = tmp1
  // 호출된 브라우저 영역
  const searchData = await pages.evaluate(() => {

    const song = document.querySelector('#content > div:nth-child(1) > div:nth-child(2) > ul > li > h2');
    const score = document.querySelector('#content > div.scoreDetail > div.scoreDetailTable > div.high_score > span');
    const times = document.querySelector('#content > div.scoreDetail > div.scoreDetailTable > div.stage_cnt > span');

    let crown = 0; // Not play

    if (document.querySelector('#content > div.scoreDetail > div.scoreDetailTable > div.dondaful_combo_cnt > span').textContent !== "0回") { crown = 4 } // 전량
    else if (document.querySelector('#content > div.scoreDetail > div.scoreDetailTable > div.full_combo_cnt > span').textContent !== "0回") { crown = 3 } // 풀콤
    else if (document.querySelector('#content > div.scoreDetail > div.scoreDetailTable > div.clear_cnt > span').textContent !== "0回") { crown = 2 } // 클리어
    else if (document.querySelector('#content > div.scoreDetail > div.scoreDetailTable > div.stage_cnt > span').textContent !== "0回") { crown = 1 } // 불클

    return [
      {
        song: song.textContent,
        score: score.textContent,
        crown: crown,
        play_times : times.textContent
      },
    ];
  });

  return [
    {
      id: tmp2,
      song: searchData[0].song,
      score: Number(searchData[0].score.slice(0, -1)),
      crown: searchData[0].crown,
      play_times : Number(searchData[0].play_times.slice(0, -1))
    },
  ];
}

``` 

마지막으로 좀 더 빠른 처리 속도를 위하여 일부 불러오는 시간이 긴 것들은 생략하였다.

``` js
const browser = await puppeteer.launch({
  headless: true,
  args: [
    "--no-sandbox",
    "--disable-setuid-sandbox"
  ]
});
// 브라우저 열기
const page = await browser.newPage();
await page.setRequestInterception(true);

// 페이지 옵션
page.on('request', (req) => {
  switch (req.resourceType()) {
    case 'stylesheet':
    case 'font':
    case 'image':
      req.abort()
      break;
    default:
      req.continue();
      break;
  }
});
```

### Heroku로 배포

배포는 서버과 사용자 둘 다 적용할 수 있는 Heroku로 배포하였다. 
터미널에서 다음과 같은 명령어를 입력하였다.

``` 
cd 프로젝트이름
git init
``` 
> git 생성

``` 
heroku login

heroku create 프로젝트이름
git remote -v

heroku buildpacks:clear
heroku buildpacks:add --index 1 https://github.com/jontewks/puppeteer-heroku-buildpack
heroku buildpacks:add --index 1 heroku/nodejs
``` 
> heroku 로그인 및 빌드팩 추가

Heroku에서 원활한 puppeteer 실행을 위하여 index.js에 있는 browser를 다음과 같이 수정하였다.

``` js
const browser = await puppeteer.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox"
    ]
  });
``` 

최종적으로 Heroku를 직접 배포하였다. (github에 프로젝트를 올리는 방식이랑 비슷하다.)

``` 
git add .
git commit -m '커밋 메세지'
git push heroku master

``` 

#### Heroku로 배포 하면서

Heroku를 배포 한 후에 다음과 같은 오류 메세지를 받았다.

+ H12 Error
https://devcenter.heroku.com/articles/error-codes#h12-request-timeout

에러같은 경우, HTTP request를 수행하는데 30초 이상 걸릴 시 발생한다. response 시간이 30초를 넘는다면 무조건 이 에러를 리턴하는 것을 확인하였다.

이러한 에러를 피하기 위해서는 여러 HTTP request를 보내는 것이 있지만 Heroku에 할당된 메모리(500MB)가 부족하여 실행 할 수 없었다. 결국 어쩔 수 없이 30초 이내로 HTTP request를 수행하기 위해 index.js에서 연동 기능을 대거 축소 시킬 수 밖에 없었다.

``` js
let test = [0]

  for (var i = 1; i <= 30; i++) {
    {/* ...*/}
  }
``` 

또한 에러 발생시 계속 연동 중인 화면이 나타나지 않도록 연동 초기 팝업으로 돌아오게 처리하였다.

``` tsx
const getData = (keyword: string, password: string) => {
  setIsOnLoading(true);
  loginerror(false);
  setIsgood(false);
    
  fetch(`api/data?keyword=${keyword}&password=${password}`, {
    headers: {
      'Accept': 'application/json'
    }
  })
    .then((res) => {
      return res.json();
      throw new Error(
        `This is an HTTP error: The status is ${res.status}`
      );
    })
    .then((data) => {
      if (data === null) {loginerror(true);}
      else {
        songdata.map((item1: any, idx: number) => {
          data.map((item2: any, idx: number) => {
            if (item1.id === item2.id) {
              item1.score = item2.score;
              item1.crown = item2.crown;
              item1.play_times = item2.play_times;
            }
          })
        })
        setIsgood(true);
      }
      setData(songdata);
      setIsOnLoading(false);
    }).catch((err) => {
      console.log(err.message);
      setIsOnLoading(false);
    });
};
``` 

## 5. 후기 

처음으로 단독으로 서버랑 프런트 엔드 웹 개발을 하느라 고민하거나 배운 것이 많았던 시간이었다.
추후 puppeteer 기능을 이용하여 서열표 정보를 스크린샷하여 다운로드하는 기능과 웹 자체의 로그인 기능을 추가할 계획에 있다. 
배포 같은 경우 반쪽 짜리 성공이어서 만일 여유가 된다면 개인 서버로 배포를 할 계획이 있다.

## 6. 참고

+ [[Express] Puppeteer, React, Express를 활용한 크롤러 만들기 및 Heroku에 배포하기](https://github.com/recordboy/scrap-sample)
+ [Node.js (크롤링해온 정보(json 가공) react로 값 읽기)](https://jung-story.tistory.com/101)
+ [Node.js (Node.js 를 이용한 웹 크롤링 하기 REST API )](https://jung-story.tistory.com/100?category=882480)
+ [Heroku H12 Request timeout 문제](https://github.com/Bletcher-Project/bletcher_mix/issues/6)
+ [SVG와 삼각 함수로 도넛 차트 만들어보기](https://evan-moon.github.io/2020/12/12/draw-arc-with-svg-clippath/)
