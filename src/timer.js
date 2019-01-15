import React from 'react';

class Timer extends React.Component {
    render() {
        return (
            <div className="timer">
                <div className="minutes">{this.props.minutes}</div>
                <div className="divider">:</div>
                <div className="seconds">{this.displaySeconds()}</div>
            </div>
        );
    }

    displaySeconds() {
        let displaySeconds = this.props.seconds + "";
        if (displaySeconds.length < 2) {
            displaySeconds = "0" + displaySeconds;
        }

        return displaySeconds;
    }
}

export default Timer;
