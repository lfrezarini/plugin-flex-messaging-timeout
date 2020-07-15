import React from 'react';
import { BoldText } from './TaskTimeoutNotification.Styles';

const TaskTimeoutNotification = (props) => {
  const { notificationContext: { task, name } } = props; 
  const minutes = process.env.REACT_APP_INACTIVITY_TIMEOUT_IN_MINUTES;

  return (
    <div>Your task from <BoldText>{name}</BoldText> ({task.sid}) was completed automatically after <span className="strong">{minutes} minutes without new interactions</span></div>
  );
}

export default TaskTimeoutNotification;