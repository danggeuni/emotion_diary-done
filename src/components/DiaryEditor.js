// 다이어리 에디터
import { useState, useRef, useContext, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { dispatchContext } from "./../App.js";

import EmotionItem from "./EmotionItem";
import MyButton from "./MyButton";
import MyHeader from "./MyHeader";

// util
import { getDate } from "./../util/date";
import { emotionList } from "./../util/emotion";

const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || "";

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const DiaryEditor = ({ isEdit, originData }) => {
  // textarea DOM 조작
  const contentRef = useRef();
  // content state
  const [content, setContent] = useState("");
  // 감정 선택 state
  const [emotion, setEmotion] = useState(3);
  // 날짜 state
  const [date, setDate] = useState(getDate(new Date()));

  const { onCreate, onEdit, onRemove } = useContext(dispatchContext);

  const navigate = useNavigate();

  // 감정 state 변경 함수
  const handleClickEmotion = useCallback((emotion) => {
    setEmotion(emotion);
  }, []);

  const handleSubmit = () => {
    if (content.length < 1) {
      contentRef.current.focus();
      return;
    }

    if (
      window.confirm(
        isEdit ? "일기를 수정하시겠습니까?" : "새로운 일기를 작성하시겠습니까?"
      )
    ) {
      if (!isEdit) {
        onCreate(date, emotion, content);
      } else {
        onEdit(originData.id, date, emotion, content);
      }
    }

    navigate("/", { replace: true });
  };

  const handleRmove = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      onRemove(originData.id);
      navigate("/", { replace: true });
    }
  };

  useEffect(() => {
    if (isEdit) {
      setDate(
        getDate(
          new Date(parseInt(originData.date)),
          setEmotion(originData.emotion),
          setContent(originData.content)
        )
      );
    }
  }, [isEdit, originData]);

  return (
    <div className="DiaryEditor">
      <MyHeader
        left_btn={<MyButton text={"< 뒤로가기"} onClick={() => navigate(-1)} />}
        head_text={isEdit ? "일기 수정하기" : "새로운 일기 쓰기"}
        right_btn={
          isEdit && (
            <MyButton
              text={"삭제하기"}
              type={"negative"}
              onClick={handleRmove}
            />
          )
        }
      />
      <section>
        <h4>오늘은 언제인가요?</h4>
        <div className="input_box">
          <input
            className="input_date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            type={"date"}
          />
        </div>
      </section>
      <section>
        <h4>오늘의 감정</h4>
        <div className="input_box emotion_list_wrapper">
          {emotionList.map((item) => (
            <EmotionItem
              key={item.emotion_id}
              {...item}
              onClick={handleClickEmotion}
              isSelected={item.emotion_id === emotion}
            />
          ))}
        </div>
      </section>
      <section>
        <h4>오늘의 일기</h4>
        <div className="input_box text_wrapper">
          <textarea
            ref={contentRef}
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder={"오늘은 어땠나요?"}
          />
        </div>
      </section>
      <section>
        <div className="control_box">
          <MyButton text={"취소하기"} onClick={() => navigate(-1)} />{" "}
          <MyButton
            text={"작성완료"}
            type={"positive"}
            onClick={handleSubmit}
          />
        </div>
      </section>
    </div>
  );
};

export default DiaryEditor;
