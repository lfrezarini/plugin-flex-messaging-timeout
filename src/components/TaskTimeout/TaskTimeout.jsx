import React from 'react';
import moment from 'moment';

class TaskTimeout extends React.Component {
  maxInactivityTimeInMinutes = 15;

  constructor(props) {
    super(props);
    this.state = {
      interval: null
    };

    this.verifyInactivityTimeout = this.verifyInactivityTimeout.bind(this);
    this.wrapUpAndFinishTask = this.wrapUpAndFinishTask.bind(this);
  }

  componentDidMount() {
    const interval = setInterval(this.verifyInactivityTimeout, 15000);
    this.setState({ interval });
  }

  async verifyInactivityTimeout() {
    const { chatChannel } = this.props;

    if (
      chatChannel &&
      chatChannel.source &&
      chatChannel.source.lastMessage
    ) {
      const { source } = chatChannel;
      const { timestamp } = source.lastMessage;

      console.debug('verifying chatChannel source timeout', source)
      const inactivityTimeInMinutes = moment().diff(
        moment(timestamp),
        'minutes'
      );

      console.debug('chatChannel inacitivty time in minutes: ', inactivityTimeInMinutes);
      if (inactivityTimeInMinutes >= this.maxInactivityTimeInMinutes) {
        await this.wrapUpAndFinishTask();
      }
    }
  }

  async wrapUpAndFinishTask() {
    const { task } = this.props;

    try {
      await task.wrapUp();
      await task.complete();
    } catch (err) {
      console.error(
        'error while performing wrapUp and completing task on timeout',
        err
      );
      throw err;
    }
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  render() {
    return null;
  }
}

export default TaskTimeout;
