import React, { useState, useEffect } from "react";

import SearchForm from "./components/SearchForm";
import SearchLoading from "./components/SearchLoading";

import Popup_1 from "./components/Popup";
import Popup_2 from "./components/Popup2";
import Popup_Top from "./components/PopupTop";
import Test_Table from './components/RankingData'
import Footer from "./components/Footer"

import "./App.css";
import "./ranking.css";

import songdata from "./data/SongData.json";

function App() {
  const [Data, setData] = useState<any>(songdata)

  const [isOnLoading, setIsOnLoading] = useState(false)
  const [isgood, setIsgood] = useState(false)
  const [ispopup, setIsPopup] = useState(false)
  const [isloginerror, loginerror] = useState(false)

  const [Ono6, setOno6] = useState(false)
  const [Ono7, setOno7] = useState(false)
  const [Ono8, setOno8] = useState(false)
  const [Ono9, setOno9] = useState(false)
  const [Ono10, setOno10] = useState(true)

  const o6 = Data.filter((item: any, index: number) => (item.level === 6))
  const o7 = Data.filter((item: any, index: number) => (item.level === 7))
  const o8 = Data.filter((item: any, index: number) => (item.level === 8))
  const o9 = Data.filter((item: any, index: number) => (item.level === 9))
  const o10 = Data.filter((item: any, index: number) => (item.level === 10))

  const handlePopup = () => {
    return (setIsPopup(!ispopup))
  }

  const getData = (keyword: string, password: string) => {
    setIsOnLoading(true);
    loginerror(false);
    setIsgood(false);
    //console.log("검색 키워드: " + keyword);
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
        //console.log(data);
      });
  };


  function CClick() {
    window.location.href = "/"
  }
  function PClick() {
    window.location.href = "/perfect"
  }

  const Mamu = () => {
    return (
      <div id="mamu">
        <div id="mamu_list">
          <div className='list_left'>
            <div className='list_button' onClick={() => { CClick(); }}>클리어</div>
            <div className='list_button' onClick={() => { PClick(); }}>전량</div>
            <div className='list_button' onClick={() => { handlePopup(); }}>연동</div>
          </div>
          <div className='list_right'>
            <div className='list_button' onClick={() => { alert('추구 추가할 예정입니다.'); }}>다운로드</div>
          </div>
        </div>
      </div>
    )
  }

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

  const LevelMamu = () => {
    return (
      <div id="level_mamu">

        <button className={Ono6 ? "on_button oni_6_on" : "level_button oni_6"}
          onClick={() => { setOno6(true); setOno7(false); setOno8(false); setOno9(false); setOno10(false) }}>
          <img src="img/oni_6.png" width={'100px'} height={'100px'} />
        </button> {/* 오니 6렙 */}

        <button className={Ono7 ? "on_button oni_7_on" : "level_button oni_7"}
          onClick={() => { setOno6(false); setOno7(true); setOno8(false); setOno9(false); setOno10(false) }}>
          <img src="img/oni_7.png" width={'100px'} height={'100px'} />
        </button> {/* 오니 7렙 */}

        <button className={Ono8 ? "on_button oni_8_on" : "level_button oni_8"}
          onClick={() => { setOno6(false); setOno7(false); setOno8(true); setOno9(false); setOno10(false) }}>
          <img src="img/oni_8.png" width={'100px'} height={'100px'} />
        </button> {/* 오니 8렙 */}
 
        <button className={Ono9 ? "on_button oni_9_on" : "level_button oni_9"}
          onClick={() => { setOno6(false); setOno7(false); setOno8(false); setOno9(true); setOno10(false) }}>
          <img src="img/oni_9.png" width={'100px'} height={'100px'} />
        </button> {/* 오니 9렙 */}

        <button className={Ono10 ? "on_button oni_10_on" : "level_button oni_10"}
          onClick={() => { setOno6(false); setOno7(false); setOno8(false); setOno9(false); setOno10(true) }}>
          <img src="img/oni_10.png" width={'100px'} height={'100px'} />
        </button> {/* 오니 10렙 */}
      </div>
    )
  }

  const LevelInfo = (props: { Data: [] }) => {
    const { Data } = props;

    Data.map((item: any) => { if (item.k_score === 0) { item.k_score = 1000000 } })

    const Data_tmp = Data.filter((item: any, index: number) => (item.id <= 10000))

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

    React.useEffect(() => {
      const radius = 30; // 차트의 반지름
      const diameter = 2 * Math.PI * radius; // 차트의 둘레
      
      const colors = ['#37D6EC', '#8551D1', '#EA6A8F', '#E1AA02', '#6B70A2', '#99441F', '#D3D3D3'];
      const im_href = ["img/score_rank_8.png", "img/score_rank_7.png", "img/score_rank_6.png", "img/score_rank_5.png", "img/score_rank_4.png", "img/score_rank_3.png", "img/score_rank_2.png"];
      const dataset = [scored_6.length, scored_5.length, scored_4.length, scored_3.length, scored_2.length, scored_1.length, scored_0.length];

      // 전체 데이터셋의 총 합
      const total = Data_tmp.length;

      // 데이터셋의 누적 값
      const acc = dataset.reduce((arr, v, i) => {
        const last = arr[arr.length - 1];
        return [...arr, last + v];
      }, [0]);

      // 프로퍼티 할당 노가다 시작...
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
    })

    return (
      <div className={(Ono6 ? "level_info oni_6_on" : (Ono7 ? "level_info oni_7_on" : (Ono8 ? "level_info oni_8_on" : (Ono9 ? "level_info oni_9_on" : (Ono10 ? "level_info oni_10_on" : "")))))} style={{color : "white", display : "flex", justifyContent: "center", alignItems : "center", textAlign : "center", fontSize : "calc(30px + 1vmin)"}} >
        <div > 준비중입니다. </div>
      </div>
    )
  }

  return (
    <div className={ispopup ? "locked App" : "App"}>
      <Mamu />
      <div id="main">
        {ispopup ? <Popup /> : ""}
        <LevelMamu />
        <LevelInfo Data={Ono6 ? o6 : (Ono7 ? o7 : (Ono8 ? o8 : (Ono9 ? o9 : o10 )))} />
        <Footer />
      </div>
    </div>
  );
}

export default App;