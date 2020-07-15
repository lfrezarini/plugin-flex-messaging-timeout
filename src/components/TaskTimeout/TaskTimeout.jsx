import React from 'react';
import moment from 'moment';
import * as Flex from '@twilio/flex-ui';

class TaskTimeout extends React.Component {
  maxInactivityTimeInMinutes = process.env.REACT_APP_INACTIVITY_TIMEOUT_IN_MINUTES;
  enabledTimeoutChannels = process.env.REACT_APP_INACTIVITY_TIMEOUT_ENABLED_CHANNELS.trim().split(',');

  constructor(props) {
    super(props);
    this.state = {
      interval: null
    };

    this.verifyInactivityTimeout = this.verifyInactivityTimeout.bind(this);
    this.wrapUpAndFinishTask = this.wrapUpAndFinishTask.bind(this);
  }

  componentDidMount() {
    const { task } = this.props;

    if (this.enabledTimeoutChannels.includes(task.channelType)) {
      const interval = setInterval(this.verifyInactivityTimeout, 15000);
      this.setState({ interval });
    }
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

      console.log(process.env)

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
      
      const { name, from } = task.attributes;

      Flex.Notifications.showNotification("taskTimeoutNotification", { 
        task,
        name: name !== "" ? name : from
      });
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
