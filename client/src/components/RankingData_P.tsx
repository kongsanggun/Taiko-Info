import React from "react";

const rank_name = ["졸업+", "졸업", "최상", "상", "중상", "중", "중하", "하", "최하", "보류"];

function song(start: number, end: number, table: any, len: number) {
    const tmp = table.filter((item: any, index: number) => ((index <= end && index >= start)))

    if (tmp.length !== len) {
        const remain = len - tmp.length
        for (var i = 0; i < remain; i++) {
            tmp.push(null);
        }
    }

    const col = tmp.map((item: any, index: number) => {
        if (item !== null) {
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
        } else { return (<div className="songs_null" key={index} />) }
    })

    return col
}

function songs_list(table: any, col_num: number) {

    const tmp = table.filter((item: any, index: number) => (index % col_num === 0))
    const col = tmp.map((item: any, index: number) => (<div className={col_num === 3 ? "songs_col_M" : "songs_col"} key={index}> {song(index * col_num, index * col_num + col_num - 1, table, col_num)} </div>))

    return col
}

const Test_Table = (props: { Data: [] }) => {

    const { Data } = props;

    const rank_className = ["ranked rank_0", "ranked rank_1", "ranked rank_2", "ranked rank_3", "ranked rank_4", "ranked rank_5", "ranked rank_6", "ranked rank_7", "ranked rank_8", "ranked rank_9"]
    const rank_className_M = ["ranked_M rank_0", "ranked_M rank_1", "ranked_M rank_2", "ranked_M rank_3", "ranked_M rank_4", "ranked_M rank_5", "ranked_M rank_6", "ranked_M rank_7", "ranked_M rank_8", "ranked_M rank_9"]

    const rank_table = (num: number, col_num: number, mode: number) => {
        const rank = Data.filter((item: any, index: number) => (item.ranked === num))

        if (rank.length !== 0) {
            if (mode === 1) {
                return (<div id="song_ranked">
                    <div className={rank_className[num]}> {rank_name[num]}</div>
                    <div className="songs">
                        {songs_list(rank, col_num)} {/* 곡 테이블 줄 정보 */}
                    </div>
                </div>)
            }
            return (
                <div id="song_ranked">
                    <div className="songs_M">
                        <div className={rank_className_M[num]}> {rank_name[num]} </div>
                        {songs_list(rank, col_num)} {/* 곡 테이블 줄 정보 */}
                    </div>
                </div>
            )
        }
        return null;
    }

    return (
        <div style={{ paddingTop: '20px', paddingBottom: "25px", zIndex: "2" }}>
            <div className="col_5">
                {rank_table(0, 5, 1)}
                {rank_table(1, 5, 1)}
                {rank_table(2, 5, 1)}
                {rank_table(3, 5, 1)}
                {rank_table(4, 5, 1)}
                {rank_table(5, 5, 1)}
                {rank_table(6, 5, 1)}
                {rank_table(7, 5, 1)}
                {rank_table(8, 5, 1)}
                {rank_table(9, 5, 1)}
            </div>
            <div className="col_4">
                {rank_table(0, 4, 0)}
                {rank_table(1, 4, 0)}
                {rank_table(2, 4, 0)}
                {rank_table(3, 4, 0)}
                {rank_table(4, 4, 0)}
                {rank_table(5, 4, 0)}
                {rank_table(6, 4, 0)}
                {rank_table(7, 4, 0)}
                {rank_table(8, 4, 0)}
                {rank_table(9, 4, 0)}
            </div>
            <div className="col_3">
                {rank_table(0, 3, 0)}
                {rank_table(1, 3, 0)}
                {rank_table(2, 3, 0)}
                {rank_table(3, 3, 0)}
                {rank_table(4, 3, 0)}
                {rank_table(5, 3, 0)}
                {rank_table(6, 3, 0)}
                {rank_table(7, 3, 0)}
                {rank_table(8, 3, 0)}
                {rank_table(9, 3, 0)}
            </div>
        </div>
    );
};

export default Test_Table;