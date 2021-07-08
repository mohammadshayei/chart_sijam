import React, { useState, useEffect } from "react";
import "./Body.scss";
import Card from "../../component/Card/Card";
import { data } from "../../assets/DummyData/data";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const Body = (props) => {
  const [charts, setCharts] = useState([]);

  const dragEnd = (result) => {
    if (!result.destination) return;

    const card = [...charts];

    const [orderedCard] = card.splice(result.source.index, 1);
    card.splice(result.destination.index, 0, orderedCard);

    setCharts(card);
  };

  useEffect(() => {
    data.forEach((item) => {
      if (item.bankId === props.bankId) {
        setCharts(
          item.charts.map((ch) => {
            return {
              ...ch,
            };
          })
        );
      }
    });
  }, [data]);

  return (
    <div>
      <DragDropContext onDragEnd={dragEnd}>
        <Droppable droppableId="cardsSequence" direction="horizontal">
          {(provided) => (
            <div
              className="cardsContainer"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {charts
                ? charts.map((item, index) => (
                    <Draggable
                      draggableId={`draggable${item.id}`}
                      key={`draggable${item.id}`}
                      index={index}
                      isDragDisabled={false}
                    >
                      {(provided) => (
                        <div
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                        >
                          <Card
                            key={`${item.id}`}
                            title={item.title}
                            chartType={item.type}
                            backGroundColor={item.backGroundColor}
                            borderColor={item.borderColor}
                            borderRadius={item.borderRadius}
                            borderWidth={item.borderWidth}
                            database={item.database}
                            option={item.option}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))
                : null}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};
export default Body;
