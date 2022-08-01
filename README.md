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
return(
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
        </button> {/* 하드 8렙 */}

        <button className={Ono6 ? "on_button oni_6_on" : "level_button oni_6"}
          onClick={() => { setOnh8(false); setOno6(true); setOno7(false); setOno8(false); setOno9(false); setOno10(false) }}>
          <img src="img/oni_6.png" width={'100px'} height={'100px'} />
        </button> {/* 오니 6렙 */}

		{/*...*/}

      </div>
    )
  }

```

#### 난이도 정보 만들기

난이도 정보는 크게 왕관

#### 서열표 표 만들기 



### 연동 기능

### Heroku로 배포

## 5. 기타 



## 6. 참고

https://github.com/recordboy/scrap-sample
https://jung-story.tistory.com/101
https://jung-story.tistory.com/100?category=882480
