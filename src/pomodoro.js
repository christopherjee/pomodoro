import React from 'react';
import Timer from './timer.js';
import History from './history.js';
import Controls from './controls.js';

class Pomodoro extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            minutes: 0,
            seconds: 0,
            focusIsNext: true,
            isPlay: false,
            history: [],
        };
    }

    render() {
        return (
            <div>
                <h1>Pomodoro</h1>
                <History
                    history={this.state.history}
                />
                <Timer
                    minutes={this.state.minutes}
                    seconds={this.state.seconds}
                />
                <Controls
                    isPlay={this.state.isPlay}
                    onPlayPause={() => this.handlePlayPause()}
                    onStop={() => this.handleStop()}
                    onBack={() => this.handleBack()}
                />
            </div>
        );
    }

    handlePlayPause() {
        console.log(`Play / pause clicked, isPlay = ${this.state.isPlay}`);
    }

    handleStop() {
        console.log(`Stop clicked`);
    }

    handleBack() {
        console.log(`Back clicked`);
    }
}

export default Pomodoro;
