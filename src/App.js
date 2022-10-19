//  App
import "./App.css";

import React, { useEffect, useReducer, useRef } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Edit from "./pages/Edit";
import Diary from "./pages/Diary";
import New from "./pages/New";

// import MyHeader from "./components/MyHeader";
// import MyButton from "./components/MyButton";

// reducer 함수
const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT": {
      return action.data;
    }

    case "CREATE": {
      newState = [action.data, ...state];
      break;
    }

    case "EDIT": {
      newState = state.map((item) =>
        item.id === action.data.id ? { ...action.data } : item
      );
      break;
    }

    case "REMOVE": {
      newState = state.filter((item) => item.id !== action.targetId);
      break;
    }

    default:
      return state;
  }
  localStorage.setItem("diary", JSON.stringify(newState));
  return newState;
};

export const stateContext = React.createContext();
export const dispatchContext = React.createContext();

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function App() {
  useEffect(() => {
    const localData = localStorage.getItem("diary");

    if (localData) {
      const diaryList = JSON.parse(localData).sort(
        (a, b) => parseInt(b.id) - parseInt(a.id)
      );

      if (diaryList.length >= 1) {
        dataId.current = parseInt(diaryList[0].id) + 1;
        dispatch({ type: "INIT", data: diaryList });
      }
    }
  }, []);

  const [data, dispatch] = useReducer(reducer, []);
  const dataId = useRef(0);

  // 일기 생성 함수
  const onCreate = (date, emotion, content) => {
    dispatch({
      type: "CREATE",
      data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        emotion,
        content,
      },
    });
    dataId.current += 1;
  };

  // 일기 삭제 함수
  const onRemove = (targetId) => {
    dispatch({ type: "REMOVE", targetId });
  };

  // 일기 편집 함수
  const onEdit = (targetId, date, emotion, content) => {
    dispatch({
      type: "EDIT",
      data: { id: targetId, date: new Date(date).getTime(), emotion, content },
    });
  };

  return (
    <stateContext.Provider value={data}>
      <dispatchContext.Provider value={{ onCreate, onEdit, onRemove }}>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/edit/:id" element={<Edit />} />
              <Route path="/diary/:id" element={<Diary />} />
              <Route path="/new" element={<New />} />
            </Routes>
          </div>
        </BrowserRouter>
      </dispatchContext.Provider>
    </stateContext.Provider>
  );
}

export default App;
