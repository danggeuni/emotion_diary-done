import { useContext, useEffect, useState } from "react";

import { stateContext } from "./../App";

import DiaryList from "../components/DiaryList";
import MyHeader from "./../components/MyHeader";
import MyButton from "./../components/MyButton";

const Home = () => {
  // data 사용 useContext
  const diaryList = useContext(stateContext);

  // date 수정 state
  const [currentDate, setCurrentDate] = useState(new Date());

  // data 수정 state
  const [data, setData] = useState([]);

  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `감정 일기장`;
  }, []);

  // 렌더링 조건 (날짜 변경, 데이터 변경)
  useEffect(() => {
    if (diaryList.length > 0) {
      const firstDay = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
      ).getTime();

      const lastDay = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0,
        23,
        59,
        59
      ).getTime();

      setData(
        diaryList.filter(
          (item) => firstDay <= item.date && lastDay >= item.date
        )
      );
    }
  }, [diaryList, currentDate]);

  // date 구현 변수
  const headTextDate = `${currentDate.getFullYear()}년 ${
    currentDate.getMonth() + 1
  }월`;

  // 월 증가 함수
  const increaseMonth = () => {
    setCurrentDate(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        currentDate.getDate()
      )
    );
  };

  // 월 감소 함수
  const decreaseMonth = () => {
    setCurrentDate(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 1,
        currentDate.getDate()
      )
    );
  };

  return (
    <div className="Home">
      <MyHeader
        left_btn={<MyButton text={"<"} onClick={decreaseMonth} />}
        head_text={headTextDate}
        right_btn={<MyButton text={">"} onClick={increaseMonth} />}
      />

      <DiaryList diaryList={data} />
    </div>
  );
};

export default Home;
