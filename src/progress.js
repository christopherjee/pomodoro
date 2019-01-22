import React from 'react';

class Progress extends React.Component {
    render() {
        return (
            <div className="progress">
                <div className="interval">{this.props.currentInterval}</div>
                <div className="current-pomodoro">{this.props.currentPomodoro}</div>
                <div className="slash">of</div>
                <div className="total-pomodoros">{this.props.totalPomodoros}</div>
            </div>
        );
    }
}

export default Progress;
