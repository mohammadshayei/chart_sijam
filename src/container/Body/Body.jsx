import React, { useState, useEffect } from "react";
import "./Body.scss";
import CardsContainer from "./CardsContainer/CardsContainer";
import { DragDropContext } from "react-beautiful-dnd";

const Body = (props) => {
  const [charts, setCharts] = useState([]);
  const [chartsArray, setChartsArray] = useState(null);

  const dragEnd = (result) => {
    if (!result.destination) return;
    const card = [...charts];
    const [orderedCard] = card.splice(result.source.index, 1);
    card.splice(result.destination.index, 0, orderedCard);
    setCharts(card);
  };

  useEffect(() => {
    let tempData = [];
    let tempDataArray = [];
    let tempChartsArray = [];
    let count = parseInt(`${window.innerWidth / 500}`);
    if (props.data) {
      props.data.forEach((item) => {
        if (item.charts) {
          item.charts.map((ch) => (tempData = [...tempData, ch]));
        }
      });
      setCharts(tempData);
      // for (let index = 0; index < charts.length; index++) {
      //   tempDataArray.push(charts[index]);
      // if (index % count === 0) {
      //     tempChartsArray.push(tempDataArray);
      //     tempDataArray = [];
      //   }
      // }
      // setChartsArray(tempChartsArray);
    }
  }, [props.data]);

  return (
    <div>
      <DragDropContext onDragEnd={dragEnd}>
        <div className="cardsContainer">
          {charts
            ? charts.map((item, index) => (
                <CardsContainer
                  key={`${item.id}`}
                  listId={`${item.id}`}
                  listType="CARD"
                  charts={item}
                  index={index}
                />
              ))
            : null}
        </div>
      </DragDropContext>
    </div>
  );
};
export default Body;
