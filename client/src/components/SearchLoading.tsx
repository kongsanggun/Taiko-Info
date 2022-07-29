import React from "react";

const SearchLoading = (props: { isOnLoading: boolean }) => {
  const { isOnLoading } = props;
  return (
    <div className={isOnLoading ? "loading on" : "loading"}>
      <div> (이미지 파일) </div>
      <div className = "loading_sub"> loading.. </div>
      <div className = "loading_title"> 데이터를 가져오고 있습니다... </div>
      <div className = "loading_sub"> 도중에 브라우저를 닫는 행위는 삼가해주세요  </div>
    </div>
  );
};

export default SearchLoading;