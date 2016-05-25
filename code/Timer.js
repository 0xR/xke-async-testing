import React, { Component } from 'react';

export default class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = { time: new Date() };
  }

  componentWillMount() {
    const updateState = () => this.setState({ time: new Date() });
    this.interval = setInterval(updateState, 500);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <p>The time is {this.state.time.toString()}</p>
    );
  }
}
