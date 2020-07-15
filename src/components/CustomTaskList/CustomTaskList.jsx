import React from 'react';

import { CustomTaskListComponentStyles } from './CustomTaskList.Styles';

class CustomTaskList extends React.Component {

  componentDidMount() {
    // const { tasks } = this.props;

    // console.log("tasks >>>", tasks.values());
    // for (const task of tasks.values()) {
    //   console.log("task >>> ", task);
    // }
  }

  render() {
    if (!this.props.isOpen) {
      return null;
    }

    return (
      <CustomTaskListComponentStyles>
        This is a dismissible demo component
        <i className="accented" onClick={this.props.dismissBar}>
          close
        </i>
      </CustomTaskListComponentStyles>
    );
  }
};

export default CustomTaskList;
