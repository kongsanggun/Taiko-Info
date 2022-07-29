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