import React, { useState, useEffect } from "react";
import taskList from "../../static/tasks";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

export default function Tasks({ data, deleteTask }) {
  const [weeklyTasks, setWeeklyTasks] = useState(data);
  const [dailyTasks, setDailyTasks] = useState([]);

  useEffect(() => {
    setWeeklyTasks(data);
  }, [data]);

  const handleOnDragEnd = (result) => {
    const { source, destination } = result;

    if (!result.destination) return;
    if (source.droppableId === destination.droppableId) {
      if (source.droppableId === "tasket") {
        let data = Array.from(weeklyTasks);
        const [reorderedItem] = data.splice(result.source.index, 1);
        data.splice(destination.index, 0, reorderedItem);
        setWeeklyTasks(data);
      } else {
        let tempDailyTasks = Array.from(dailyTasks);
        const [reorderedItem] = tempDailyTasks.splice(result.source.index, 1);
        tempDailyTasks.splice(destination.index, 0, reorderedItem);
        setDailyTasks(tempDailyTasks);
      }
    } else {
      let data = weeklyTasks;
      let tempDailyTasks = dailyTasks;

      if (source.droppableId === "tasket") {
        const [removed] = data.splice(source.index, 1);
        tempDailyTasks.splice(destination.index, 0, removed);
        setDailyTasks(tempDailyTasks);
        setWeeklyTasks(data);
      } else {
        const [removed] = tempDailyTasks.splice(source.index, 1);
        data.splice(destination.index, 0, removed);
        setDailyTasks(tempDailyTasks);
        setWeeklyTasks(data);
      }
    }
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
                <div className="scroll">
                  {data.map(
                    (
                      { id, name, time_created, scrumgoalhistory_set },
                      index
                    ) => {
                      return (
                        <Draggable key={id} draggableId={id} index={index}>
                          {(provided) => (
                            <p
                              className="task"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              onClick={() => deleteTask(id)}
                            >
                              {name}
                              <div id="time">
                                {time_created.slice(0, 10)} at
                                {time_created.slice(12, 16)}
                              </div>
                              <div className="blue">
                                {scrumgoalhistory_set.map(({ id, done_by }) => {
                                  return <p key={id}>{done_by}</p>;
                                })}
                              </div>
                            </p>
                          )}
                        </Draggable>
                      );
                    }
                  )}
                </div>

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
                <h3>Daily Targets</h3>
                {dailyTasks.map(({ id, content }, index) => {
                  return (
                    <Draggable key={id} draggableId={id} index={index}>
                      {(provided) => (
                        <p
                          className="task"
                          ref={provided.innerRef}
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                        >
                          {content}
                        </p>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </div>
    </DragDropContext>
  );
}
