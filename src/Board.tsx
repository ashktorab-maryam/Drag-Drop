import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import Task from './Task';
import { v4 as uuidv4 } from 'uuid';

export type TaskData = {
  id: string;
  title: string;
}

const initialTasks: TaskData[] = [
  { id: uuidv4(), title: 'Task 1' },
  { id: uuidv4(), title: 'Task 2' },
  { id: uuidv4(), title: 'Task 3' },
];

const Board: React.FC = () => {
  const [tasks, setTasks] = useState(initialTasks);

  const handleDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const task = tasks.find((task) => task.id === draggableId);

    if (!task) {
      return;
    }

    // const newTasks = Array.from(tasks);
    // newTasks.splice(source.index, 1);
    // newTasks.splice(destination.index, 0, task);
    const newTasks = Array.from(tasks);
    newTasks.splice(source.index, 1);

    if (destination.droppableId === 'todo') {
      newTasks.splice(destination.index, 0, task);
    } else if (destination.droppableId === 'doing') {
      const targetIndex = destination.index > 0 ? destination.index - 1 : 0;
      newTasks.splice(targetIndex, 0, task);
    } else if (destination.droppableId === 'done') {
      newTasks.splice(destination.index + 1, 0, task);
    }

    setTasks(newTasks);
  };

  return (
    <div>
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="board">
        <Droppable droppableId="todo">
          {(provided: any) => (
            <div className="column" {...provided.droppableProps} ref={provided.innerRef}>
              <h2>Todo</h2>
              {tasks.map((task, index) => {
                if (index === 0) {
                  return (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided: any) => (
                        <div
                          className="task"
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                        >
                          <Task title={task.title} />
                        </div>
                      )}
                    </Draggable>
                  );
                } else {
                  return (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided: any) => (
                        <div
                          className="task"
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                        >
                          <Task title={task.title} />
                        </div>
                      )}
                    </Draggable>
                  );
                }
              })}
              {provided.placeholder}
            </div>
            
          )}
          
        </Droppable>
          <Droppable droppableId="doing">
            {(provided: any) => (
              <div className="column" {...provided.droppableProps} ref={provided.innerRef}>
                <h2>Doing</h2>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <Droppable droppableId="done">
            {(provided: any) => (
              <div className="column" {...provided.droppableProps} ref={provided.innerRef}>
                <h2>Done</h2>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
      </div>
    </DragDropContext>
    </div>
  );
};

export default Board;
