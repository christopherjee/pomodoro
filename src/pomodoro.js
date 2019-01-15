import React from 'react';
import Timer from './timer.js';
import History from './history.js';
import Controls from './controls.js';

const NUM_MINUTES_FOCUS = 25;
const NUM_SECONDS_FOCUS = 5; //NUM_MINUTES_FOCUS*60;
const NUM_SECONDS_BREAK = 1; //5*60;
const NUM_SECONDS_LONGBREAK = 10; //30*60;

class Pomodoro extends React.Component {
    constructor(props) {
        super(props);
        this.numSeconds = NUM_SECONDS_FOCUS;
        const minSec = this.getMinSec();
        this.state = {
            minutes: minSec.minutes,
            seconds: minSec.seconds,
            isFocus: true,
            isPlay: false,
            history: [],
        };
        this.intervalHandle = null;
        this.numPomodoros = 0;
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
        if (this.state.isPlay === true) {
            clearInterval(this.intervalHandle);
        } else {
            this.intervalHandle = setInterval(() => this.handleTick(), 1000);
        }

        this.setState({ isPlay: !this.state.isPlay });
    }

    handleStop() {
        console.log(`Stop clicked`);
    }

    handleBack() {
        console.log(`Back clicked`);
    }

    handleTick() {
        console.log(`Tick`);
        this.numSeconds--;
        let minSec = this.getMinSec();
        let isFocus = this.state.isFocus;
        if (minSec.minutes === 0 && minSec.seconds === 0) {
            if (isFocus === true) {
                isFocus = false;
                this.numPomodoros++;
                if (this.numPomodoros === 4) {
                    this.numPomodoros = 0;
                    this.numSeconds = NUM_SECONDS_LONGBREAK;
                } else {
                    this.numSeconds = NUM_SECONDS_BREAK;
                }
            } else {
                isFocus = true;
                this.numSeconds = NUM_SECONDS_FOCUS;
            }

            // Refresh minSec calculation after having reset the countdown appropriately
            minSec = this.getMinSec();
        }

        this.setState({
            minutes: minSec.minutes,
            seconds: minSec.seconds,
            isFocus: isFocus
        });
    }

    getMinSec() {
        const minutes = Math.floor(this.numSeconds / 60);
        const seconds = this.numSeconds % 60;
        return {
            minutes: minutes,
            seconds: seconds,
        };
    }
}

export default Pomodoro;
