import React from 'react';

class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            minutes: props.minutes,
            seconds: props.seconds,
        };
    }

    render() {
        return (
            <div className="timer">
                <div className="minutes">{this.state.minutes}</div>
                <div className="divider">:</div>
                <div className="seconds">{this.state.seconds}</div>
            </div>
        );
    }
}

export default Timer;
