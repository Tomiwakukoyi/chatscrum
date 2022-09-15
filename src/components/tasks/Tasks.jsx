import React, { useState } from "react";
import taskList from "../../static/tasks";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

export default function Tasks() {
  const [taskRoll, updateTaskRoll] = useState(taskList);

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(taskRoll);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateTaskRoll(items);
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div className="tasker">
        <div className="container">
          <Droppable droppableId="tasket">
            {(provided) => (
              <div
                className="weekly box"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <h3>Weekly Tasks</h3>
                {taskRoll.map(({ id, item }, index) => {
                  return (
                    <Draggable key={id} draggableId={id} index={index}>
                      {(provided) => (
                        <p
                          className="task"
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                        >
                          {item}
                        </p>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          <Droppable droppableId="tasketer">
            {(provided) => (
              <div
                className="daily box"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <h3>Daily Target</h3>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </div>
    </DragDropContext>
  );
}
