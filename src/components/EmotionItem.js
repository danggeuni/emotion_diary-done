import React from "react";

// 이모션 아이템
const EmotionItem = ({
  emotion_id,
  emotion_img,
  emotion_description,
  onClick,
  isSelected,
}) => {
  return (
    <div
      className={[
        "EmotionItem",
        isSelected ? `EmotionItem_on_${emotion_id}` : `EmotionItem_off`,
      ].join(" ")}
      onClick={() => onClick(emotion_id)}
    >
      <img src={emotion_img} alt="emotion_image" />
      <span>{emotion_description}</span>
    </div>
  );
};

export default React.memo(EmotionItem);
