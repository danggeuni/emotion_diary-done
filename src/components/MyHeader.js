// 마이 헤더
const MyHeader = ({ left_btn, head_text, right_btn }) => {
  return (
    <header className="MyHeader">
      <div className="head_btn_left">{left_btn}</div>
      <div className="head_text">{head_text}</div>
      <div className="head_btn_right">{right_btn}</div>
    </header>
  );
};

export default MyHeader;
