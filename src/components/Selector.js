import React from "react";

// DiaryList의 옵션 셀렉터
//{props}
// dataList : 전달 받은 데이터를 map으로 value와 name 사용
// onChnage : event.target.value 용도

const Selector = React.menu(({ dataList, setState, state }) => {
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

export default Selector;
