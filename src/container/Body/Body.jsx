import React, { useState, useEffect } from "react";
import "./Body.scss";
import Card from "../../component/Card/Card";
import { data } from "../../assets/DummyData/data";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const Body = (props) => {
  const [charts, setCharts] = useState([]);
  // const dragEnd = (result) => {
  //   const cards = [...cards];

  //   const [orderedCards] = cards.splice(result.source.index, 1);
  //   cards.splice(result.destination.index, 0, orderedCards);

  //   setCards(cards);
  // };

  useEffect(() => {
    data.forEach((item) => {
      if (item.bankId === props.bankId) {
        setCharts(
          item.charts.map((ch) => {
            return {
              ...ch,
              database: item.database[0],
            };
          })
        );
      }
    });
  }, [data]);
  return (
    <div className="cardsContainer">
      {/* <DragDropContext onDragEnd={dragEnd}>
        <Droppable droppableId="cardsSequence" direction="vertical" type="row">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              <Draggable draggableId="card1" key="card1" index="1">
                {(provided) => (
                  <Card
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    title={stringFa.card_title[1]}
                    chartType="Line"
                  />
                )}
              </Draggable>
              <Draggable draggableId="card2" key="card2" index="2">
                {(provided) => (
                  <Card
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    title={stringFa.card_title[3]}
                    chartType="Doughnut"
                  />
                )}
              </Draggable>
              <Draggable draggableId="card3" key="card3" index="3">
                {(provided) => (
                  <Card
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    title={stringFa.card_title[0]}
                    chartType="Bar"
                  />
                )}
              </Draggable>
              <Draggable draggableId="card4" key="card4" index="4">
                {(provided) => (
                  <Card
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    title={stringFa.card_title[2]}
                    chartType="Radar"
                  />
                )}
              </Draggable>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext> */}
      {charts
        ? charts.map((item) => (
            <Card
              title={item.title}
              chartType={item.type}
              backGroundColor={item.backGroundColor}
              borderColor={item.borderColor}              
              option={item.option}
              labels={item.labels}
              database={item.database}
            />
          ))
        : null}
    </div>
  );
};
export default Body;
