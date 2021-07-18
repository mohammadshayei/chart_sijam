import React, { useState, useEffect } from "react";
import "./Body.scss";
import CardsContainer from "./CardsContainer/CardsContainer";
import { DragDropContext } from "react-beautiful-dnd";

const Body = (props) => {
  const [chartsArray, setChartsArray] = useState(null);

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const reorderCharts = (inputCharts, source, destination) => {
    const current = [...inputCharts[source.droppableId]];
    const next = [...inputCharts[destination.droppableId]];
    const target = current[source.index];
    // moving to same list
    if (source.droppableId === destination.droppableId) {
      const reordered = reorder(current, source.index, destination.index);
      return {
        ...inputCharts,
        [source.droppableId]: reordered,
      };
    }

    // moving to different list

    // remove from original
    current.splice(source.index, 1);
    // insert into next
    next.splice(destination.index, 0, target);
    let swapTarget;
    console.log(destination.index)
    console.log(next.length)
    if (destination.index > next.length-2 ) {
      swapTarget = next[destination.index - 1];
      // remove next chart from destination list
      next.splice(destination.index - 1, 1);
      // insert into source list
      current.splice(source.index, 0, swapTarget);
    } else {
      swapTarget = next[destination.index + 1];
      // remove next chart from destination list
      next.splice(destination.index + 1, 1);
      // insert into source list
      current.splice(source.index, 0, swapTarget);
    }

    return {
      ...inputCharts,
      [source.droppableId]: current,
      [destination.droppableId]: next,
    };
  };

  useEffect(() => {
    let tempDataArray = [];
    let tempChartsArray = {};
    let count = parseInt(`${window.innerWidth / 600}`);
    if (props.data) {
      let charts = [];
      props.data.forEach((dt) => {
        charts = [...charts, ...dt.charts];
      });
      for (let index = 0; index < charts.length; index++) {
        if (charts[index]) {
          tempDataArray = [...tempDataArray, charts[index]];
          if ((index + 1) % count === 0) {
            tempChartsArray = {
              ...tempChartsArray,
              [index + 1]: tempDataArray,
            };
            tempDataArray = [];
          }
        }
      }
      setChartsArray(tempChartsArray);
    }
  }, [props.data]);

  return (
    <div>
      <DragDropContext
        onDragEnd={(result) => {
          if (!result.destination) {
            return;
          }
          let src = result.source;
          let dist = result.destination;
          setChartsArray(reorderCharts(chartsArray, src, dist));
        }}
      >
        <div className="cardsContainer">
          {chartsArray
            ? Object.entries(chartsArray).map(([k, v]) => {
                return v ? (
                  <CardsContainer
                    key={k}
                    listId={k}
                    listType="CARD"
                    charts={v}
                  />
                ) : null;
              })
            : null}
        </div>
      </DragDropContext>
    </div>
  );
};
export default Body;
