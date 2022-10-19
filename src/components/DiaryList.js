// 다이어리 리스트
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import MyButton from "./MyButton";
import DiaryItem from "./DiaryItem";

// 날짜별 정렬 데이터
const select1 = [
  { value: "latest", name: "최신순" },
  { value: "oldest", name: "오래된 순" },
];

// 감정별 정렬 데이터
const select2 = [
  { value: "all", name: "전체" },
  { value: "good", name: "좋은 감정 일기" },
  { value: "bad", name: "나쁜 감정 일기" },
];

const Selector = React.memo(({ dataList, setState, state }) => {
  return (
    <select
      className="Selector"
      value={state}
      onChange={(evnet) => setState(evnet.target.value)}
    >
      {dataList.map((item, index) => (
        <option key={index} value={item.value}>
          {item.name}
        </option>
      ))}
    </select>
  );
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const DiaryList = ({ diaryList }) => {
  const navigate = useNavigate();

  const [dateState, setDateState] = useState("latest");
  const [emotionState, setEmotionState] = useState("all");

  // diaryList 화면 출력 함수
  const paintList = () => {
    // 데이터 깊은 복사
    const copyList = JSON.parse(JSON.stringify(diaryList));

    // 감정 점수 필터
    const emotionFilter =
      emotionState === "all"
        ? copyList
        : copyList.filter((item) => {
            if (emotionState === "good") {
              return parseInt(item.emotion) <= 3;
            } else {
              return parseInt(item.emotion) >= 4;
            }
          });

    // 날짜순 필터
    const dataFilter = emotionFilter.sort((a, b) => {
      if (dateState === "latest") {
        return parseInt(b.date) - parseInt(a.date);
      } else {
        return parseInt(a.date) - parseInt(b.date);
      }
    });

    return dataFilter;
  };

  return (
    <div className="DiaryList">
      <div className="menu_wrapper">
        <div className="left_col">
          <Selector
            dataList={select1}
            setState={setDateState}
            state={dateState}
          />
          <Selector
            dataList={select2}
            setState={setEmotionState}
            state={emotionState}
          />
        </div>
        <div className="right_col">
          <MyButton
            type={"positive"}
            text={"새 일기 쓰기"}
            onClick={() => navigate("/new")}
          />
        </div>
      </div>

      {paintList().map((item) => (
        <DiaryItem key={item.id} {...item} />
      ))}
    </div>
  );
};

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
