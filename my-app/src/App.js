import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./App.css";
import _ from "lodash";
import { v4 } from "uuid";

const item = {
  id: v4(),
  name: "Clean the room and sleep",
};

const item2 = {
  id: v4(),
  name: "Make a website",
};

function App() {
  const [state, setState] = useState({
    "to-do": {
      title: "Todo",
      items: [item],
    },
    "in-progress": {
      title: "In-progress",
      items: [item2],
    },
    done: {
      title: "Completed",
      items: [],
    },
  });

  return (
    <div className="App">
      <DragDropContext onDragEnd={(e) => console.log(e)}>
        {_.map(state, (data, key) => {
          return (
            <div key={key} className="column">
              <h3>{data.title}</h3>
              <Droppable droppableId={key}>
                {(provided) => {
                  return (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={"droppable-col"}
                    >
                      {data.items.map((el: T, index: number) => {
                        return (
                          <Draggable
                            key={el.id}
                            index={index}
                            droppableId={el.id}
                          >
                            {(provided) => {
                              return (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.droppableProps}
                                  {...provided.dragHandleProps}
                                >
                                  {el.name}
                                </div>
                              );
                            }}
                          </Draggable>
                        );
                      })}
                    </div>
                  );
                }}
              </Droppable>
            </div>
          );
        })}
      </DragDropContext>
    </div>
  );
}

export default App;
