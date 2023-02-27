import React from 'react';

export type TaskProps = {
  title: string;
}

const Task: React.FC<TaskProps> = ({ title }) => {
  return (
    <div className="task">
      <p>{title}</p>
    </div>
  );
};

export default Task;
