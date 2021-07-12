import React, { useEffect, useState } from "react";
import "./CardsContainer.scss";
import { Draggable, Droppable } from "react-beautiful-dnd";
import Card from "../../../component/Card/Card";

const CardsContainer = React.memo((props) => {
  // const getItemStyle = (draggableStyle, isDragging) => ({
  //   // change background colour if dragging
  //   background: isDragging ? "lightgreen" : "white",
  //   // styles we need to apply on draggables
  //   ...draggableStyle,
  // });

  // const getListStyle = (isDraggingOver) => ({
  //   background: isDraggingOver ? "lightblue" : "rgb(249, 249, 249)",
  // });

  return (
    <Droppable
      droppableId={props.listId}
      type={props.listType}
      direction="horizontal"
      isCombineEnabled={false}
    >
      {(provided, snapshot) => (
        <div {...provided.droppableProps}>
          <div>
            <div>
              <div
                // style={{ display: "flex" }}
                ref={provided.innerRef}
                // style={getListStyle(snapshot.isDraggingOver)}
              >
                {/* {props.charts.map((item, index) => { */}
                <Draggable
                  draggableId={`draggable${props.charts.id}`}
                  key={`draggable${props.charts.id}`}
                  index={props.index}
                  isDragDisabled={false}
                >
                  {(provided, snapshot) => (
                    <div
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      // style={getItemStyle(provided.draggableStyle, snapshot.isDragging)}
                    >
                      <Card
                        title={props.charts.title}
                        chartType={props.charts.type}
                        chartId={props.charts.id}
                        backGroundColor={props.charts.backGroundColor}
                        borderColor={props.charts.borderColor}
                        borderRadius={props.charts.borderRadius}
                        borderWidth={props.charts.borderWidth}
                        database={props.charts.database}
                        option={props.charts.option}
                        index={props.index}
                      />
                    </div>
                  )}
                </Draggable>
                {/* })} */}
                {provided.placeholder}
              </div>
            </div>
          </div>
        </div>
      )}
    </Droppable>
  );
});

export default CardsContainer;
