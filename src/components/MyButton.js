// 마이버튼
const MyButton = ({ text, type, onClick }) => {
  // positive, negative 외 type default 처리
  const myBtnType = ["positive", "negative"].includes(type) ? type : "default";
  return (
    <button
      className={["MyButton", `MyButton_${myBtnType}`].join(" ")}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

MyButton.defaultProps = {
  type: "default",
};

export default MyButton;
