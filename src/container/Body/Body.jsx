import React, { useState, useEffect } from "react";
import "./Body.scss";
import Card from "../../component/Card/Card";
import { data } from "../../assets/DummyData/data";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";

const Body = (props) => {
  const [charts, setCharts] = useState([]);
  const bankData = useSelector((state) => state.bank);
  const software = useSelector((state) => state.software);

  const dragEnd = (result) => {
    if (!result.destination) return;

    const card = [...charts];

    const [orderedCard] = card.splice(result.source.index, 1);
    card.splice(result.destination.index, 0, orderedCard);

    setCharts(card);
  };
  useEffect(() => {
    if (props.data) {
      props.data.forEach((item) => {
        setCharts(
          item.charts.map((ch) => {
            return {
              ...ch,
            };
          })
        );
      });
    }
    // if (bankData.bank.id)  {
    //   console.log(bankData.bank.id)
    //   console.log(data.filter((dt) => dt.bankId === bankData.bank.id));
    //   data
    //     .filter((dt) => dt.bankId === bankData.bank.id)
    //     .forEach((item) => {
    //       if (item.bankId === props.bankId) {
    //         setCharts(
    //           item.charts.map((ch) => {
    //             return {
    //               ...ch,
    //             };
    //           })
    //         );
    //       }
    //     });
    // } else {
    // console.log(software)
    // data.forEach((item) => {
    //   if (item.bankId === '001001002') {
    //     setCharts(
    //       item.charts.map((ch) => {
    //         return {
    //           ...ch,
    //         };
    //       })
    //     );
    //   }
    // });
    // }
  }, [props.data]);

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
                          className="cardsItem"
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
