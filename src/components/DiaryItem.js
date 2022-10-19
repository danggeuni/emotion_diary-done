// 다이어리 아이템
import React from "react";
import { useNavigate } from "react-router-dom";

import MyButton from "./MyButton";

const DiaryItem = ({ emotion, content, date, id }) => {
  //navi
  const navigate = useNavigate();

  const env = process.env;
  env.PUBLIC_URL = env.PUBLIC_URL || "";
  //date 시각화
  const strDate = new Date(parseInt(date)).toLocaleDateString();

  //diary 페이지 이동
  const goDetail = () => navigate(`/diary/${id}`);

  //edit 페이지 이동
  const goEdit = () => navigate(`/edit/${id}`);

  return (
    <div className="DiaryItem">
      <div
        className={[
          "emotion_img_wrapper",
          `emotion_img_wrapper_${emotion}`,
        ].join(" ")}
        onClick={goDetail}
      >
        <img
          src={process.env.PUBLIC_URL + `assets/emotion${emotion}.png`}
          alt="emotion_image"
        />
      </div>

      <div onClick={goDetail} className="info_wrapper">
        <div className="diary_date">{strDate}</div>
        <div className="diary_content_preview">{content}</div>
      </div>

      <div className="btn_wrapper">
        <MyButton text={"수정하기"} onClick={goEdit} />
      </div>
    </div>
  );
};

export default React.memo(DiaryItem);
