import "./App.css";
import { useState } from "react";
import { COLORS } from "./common/colors";
import Circle from "./components/circle";

function App() {
  const [circles, setCircles] = useState([]);
  const [circlesHistory, setCirclesHistory] = useState([]);

  const markTheCircle = (e) => {
    setCircles((prev) => {
      return [
        ...prev,
        {
          id: new Date().getTime(),
          top: e.clientY,
          left: e.clientX,
          color: COLORS[getRandomColor()],
        },
      ];
    });
  };

  const getRandomColor = () => {
    return Math.floor(Math.random() * COLORS.length);
  };

  const undoCircle = (e) => {
    e.stopPropagation();
    const copyOfCircles = [...circles];
    const poppedCircle = copyOfCircles.pop();
    setCirclesHistory((prev) => [poppedCircle, ...prev]);
    setCircles(copyOfCircles);
  };

  const redoCircle = (e) => {
    e.stopPropagation();
    const copyOfCircles = [...circlesHistory];
    const poppedCircle = copyOfCircles.pop();
    setCircles((prev) => [...prev, poppedCircle]);
    setCirclesHistory(copyOfCircles);
  };

  const resetCircle = (e) => {
    e.stopPropagation();
    setCircles([]);
    setCirclesHistory([]);
  };

  return (
    <div className="container" onClick={markTheCircle}>
      <div className="btn-container">
        <button
          onClick={undoCircle}
          className={circles?.length === 0 ? "disabled" : ""}
          disabled={circles?.length === 0}
        >
          Undo
        </button>
        <button
          onClick={redoCircle}
          className={circlesHistory?.length === 0 ? "disabled" : ""}
          disabled={circlesHistory?.length === 0}
        >
          Redo
        </button>
        <button
          onClick={resetCircle}
          className={circles?.length === 0 ? "disabled" : ""}
          disabled={circles?.length === 0}
        >
          Reset
        </button>
      </div>

      {circles?.length > 0 &&
        circles?.map((circle) => {
          return (
            <Circle
              key={circle.id}
              left={circle.left}
              top={circle.top}
              color={circle.color}
            />
          );
        })}
    </div>
  );
}

export default App;
