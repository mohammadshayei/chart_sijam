import React, { useEffect } from "react";
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
                style={{ display: "flex" }}
                ref={provided.innerRef}
                // style={getListStyle(snapshot.isDraggingOver)}
              >
                {props.charts
                  ? props.charts.map((item, index) => {
                      return (
                        <Draggable
                          draggableId={`draggable${item.id}`}
                          key={`draggable${item.id}`}
                          index={index}
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
                                title={item.title}
                                chartType={item.type}
                                chartId={item.id}
                                backGroundColor={item.backGroundColor}
                                borderColor={item.borderColor}
                                borderRadius={item.borderRadius}
                                borderWidth={item.borderWidth}
                                database={item.database}
                                option={item.option}
                                index={index}
                              />
                            </div>
                          )}
                        </Draggable>
                      );
                    })
                  : null}
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
