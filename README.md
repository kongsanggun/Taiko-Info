# 태고 서열표 웹 만들기

## 0. 목차 

+ 링크 및 실행 방법(https://github.com/kongsanggun/Taiko-Info#1-%EB%A7%81%ED%81%AC-%EB%B0%8F-%EC%8B%A4%ED%96%89-%EB%B0%A9%EB%B2%95)
+ 제작 동기(https://github.com/kongsanggun/Taiko-Info#2-%EC%A0%9C%EC%9E%91-%EB%8F%99%EA%B8%B0)
+ 사용 언어(https://github.com/kongsanggun/Taiko-Info#3-%EC%82%AC%EC%9A%A9-%EC%96%B8%EC%96%B4)
+ 제작 순서(https://github.com/kongsanggun/Taiko-Info#4-%EC%A0%9C%EC%9E%91-%EC%88%9C%EC%84%9C)
	+ 프로젝트 초기화(https://github.com/kongsanggun/Taiko-Info#%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EC%B4%88%EA%B8%B0%ED%99%94)
	+ Front End(https://github.com/kongsanggun/Taiko-Info#front-end)
	+ 연동 기능(https://github.com/kongsanggun/Taiko-Info#%EC%97%B0%EB%8F%99-%EA%B8%B0%EB%8A%A5)
	+ Heroku로 배포(https://github.com/kongsanggun/Taiko-Info#heroku%EB%A1%9C-%EB%B0%B0%ED%8F%AC)
+ 기타 후기(https://github.com/kongsanggun/Taiko-Info#5-%EA%B8%B0%ED%83%80)
+ 참조 링크(https://github.com/kongsanggun/Taiko-Info#6-%EC%B0%B8%EA%B3%A0)

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

크게 서버용 파일을 상위로 하여 그 안에 사용자용 파일이 있는 형식으로 제작하였다.

```
mkdir my-app
cd my-app 
echo node_modules > .gitignore
npm init -y
npm install express nodemon concurrently

create-react-app client --use-npm --template typescript
```

``` js
"scripts": {
  "start": "nodemon index.js",
  "dev": "concurrently \"npm run dev:server\" \"npm run dev:client\"",
  "dev:server": "npm start",
  "dev:client": "cd client && npm start"
}
```

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

서열표 표는 곡 정보를 토대로 표시하는 식으로 제작하였다.

``` typescript
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

### 연동 기능

연동기능은 puppeteer를 이용하였다. 우선 연동시킬 계정 이메일과 비밀번호를 서버로 보내기 위하여 다음과 같이 작성해준다.

``` typescript

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
          <input
            type="text"
            className="form-text"
            onChange={(e: any) => {
              setId(e.target.value);
            }}
          />
        </div>
        <div className="password_form">
          <div> 비밀번호 </div>
          <input
            type="password"
            className="form-text"
            onChange={(e: any) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <button
          type="button"
          className="form-btn"
          onClick={() => {
            setinputerror(false)
            if (Id && password) {
              getData(Id, password);
            }
            else { setinputerror(true) }
          }}
        >
          search
        </button>
      </div>
      {isinputerror ? <div className = "popup_error"> 이메일과 비밀번호를 입력해주세요 </div> : ""}
    </div>
  );
};

export default SearchForm;

``` 

``` typescript

const getData = (keyword: string, password: string) => {
setIsOnLoading(true);
loginerror(false);
setIsgood(false);
//console.log("검색 키워드: " + keyword);
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
        //console.log(data);
    }).catch((err) => {
        console.log(err.message);
        setIsOnLoading(false);
    });
    ;
};

``` 

연동기능은 puppeteer를 이용하여 아래 내용을 추가해 주었다.

``` js

// puppeteer 모듈 불러오기
const puppeteer = require("puppeteer");

/**
 * 브라우저 오픈 함수
 * @param {string} keyword 검색 키워드
 * @return {Array} 검색 결과
 */
async function openBrowser(keyword, password) {

  let AllData = [];
  let ura = [9, 15, 45, 49, 60, 73, 80, 92, 95, 100, 109, 118, 135, 139, 140, 149, 150, 153, 154, 156, 160, 163, 164, 178, 181, 184, 187, 200, 202, 203, 218, 221, 222, 231, 253, 254, 256, 264, 266, 270, 271, 272, 273, 274, 275, 276, 277, 278, 283, 284, 309, 310, 324, 348, 357, 361, 366, 368, 371, 399, 400, 402, 403, 405, 414, 417, 422, 425, 433, 447, 448, 451, 470, 478, 480, 481, 482, 487, 493, 504, 506, 507, 511, 519, 520, 537, 539, 551, 553, 579, 580, 606, 626, 645, 646, 648, 652, 664, 671, 676, 681, 683, 689, 700, 711, 716, 717, 721, 730, 735, 736, 741, 771, 775, 776, 793, 795, 804, 811, 816, 819, 824, 831, 834, 842, 845, 856, 866, 868, 876, 882, 884, 898, 911, 920, 926, 936, 938, 951, 954, 956, 958, 959, 960, 972, 981, 993, 997, 1009, 1020, 1027, 1035, 1043, 1046, 1058, 1067, 1072, 1080, 1082, 1084, 1096, 1097, 1111, 1112, 1113];
  let errors = [4, 23, 24, 29, 30, 46, 50, 54, 57, 75, 76, 77, 78, 102, 104, 119, 129, 130, 143, 145, 147, 158, 162, 165, 170, 172, 174, 175, 176, 185, 188, 189, 192, 195, 198, 199, 201, 206, 216, 217, 229, 232, 234, 235, 240, 244, 249, 258, 262, 263, 289, 292, 295, 320, 326, 327, 328, 329, 330, 334, 339, 369, 370, 373, 376, 379, 382, 409, 424, 439, 457, 473, 475, 476, 485, 486, 490, 494, 508, 509, 521, 522, 528, 529, 531, 532, 533, 542, 562, 563, 564, 581, 582, 583, 584, 589, 590, 597, 598, 599, 600, 601, 602, 603, 619, 620, 622, 633, 634, 636, 638, 643, 655, 656, 657, 658, 661, 662, 667, 669, 670, 674, 690, 691, 692, 708, 710, 712, 718, 729, 731, 743, 752, 768, 769, 772, 782, 783, 787, 788, 789, 791, 802, 806, 807, 810, 812, 825, 827, 829, 830, 832, 836, 837, 838, 847, 848, 853, 863, 899, 900, 901, 902, 903, 904, 912, 1001, 1025, 1107];
  
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

  await page.close();

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
      } catch (error) {
        //console.log((index * 120 + i) + " : 으악 에러 발생: " + error);
        //errors.push(i);
      }

      if (ura.indexOf(index * 120 + i) != -1) {
        await pages.goto("https://donderhiroba.jp/score_detail.php?song_no=" + (index * 120 + i) + "&level=5");
        try {
          await pages.waitForSelector("#menu", { timeout: 5000 });
          AllData.push(...(await crawlingData(index * 120 + i + 2000)));
        } catch (error) {
          //console.log((index * 120 + i) + " : 으악 에러 발생: " + error);
          //errors.push(i);
        }
      }
    }

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

    console.log(index+": end")
    await pages.close()
  }));

  /**
  * 크롤링 함수
  * @return {Array} 검색 결과
  */

  // 브라우저 닫기
  browser.close();

  // 검색결과 반환
  return AllData;
}
``` 
1000개 정도의 많은 페이지를 탐색해야하므로 중간에 병렬 탐색을 이용하여 정보를 수집한다.

### Heroku로 배포

이젠 Heroku로 배포하자 터미널에서 다음과 같은 명령어를 입력하였다.

``` 
git init

heroku login

heroku create 프로젝트이름
git remote -v

heroku buildpacks:clear
heroku buildpacks:add --index 1 https://github.com/jontewks/puppeteer-heroku-buildpack
heroku buildpacks:add --index 1 heroku/nodejs

git add .
git commit -m '커밋 메세지'
git push heroku master

``` 
## 5. 기타 

처음으로 단독으로 서버랑 프런트 엔드 웹 개발을 하느라 고민하거나 배운 것이 많았던 시간이었다.

## 6. 참고

https://github.com/recordboy/scrap-sample
https://jung-story.tistory.com/101
https://jung-story.tistory.com/100?category=882480
