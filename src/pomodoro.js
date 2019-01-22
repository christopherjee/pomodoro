import React from 'react';
import Timer from './timer.js';
import History from './history.js';
import Controls from './controls.js';

const NUM_MINUTES_FOCUS = 25;
const NUM_SECONDS_FOCUS = NUM_MINUTES_FOCUS*60;
const NUM_SECONDS_BREAK = 5*60;
const NUM_SECONDS_LONGBREAK = 30*60;
const INTERVAL_FOCUS = "Focus";
const INTERVAL_BREAK = "Break";
const INTERVAL_LONGBREAK = "Long Break";
const INTERVAL_PAUSE = "Pause";

class Pomodoro extends React.Component {
    constructor(props) {
        super(props);
        this.numSeconds = NUM_SECONDS_FOCUS;
        this.intervalHandle = null;
        this.numPomodoros = 0;
        this.currentInterval = INTERVAL_FOCUS;

        const minSec = this.getMinSec();
        this.state = {
            minutes: minSec.minutes,
            seconds: minSec.seconds,
            isFocus: true,
            isPlay: false,
            isBlink: true,
            history: [],
        };
    }

    render() {
        return (
            <div style={{
                backgroundColor: (
                    this.state.isBlink
                        ? (this.state.isFocus ? "#8CC152" : "#E9573F" )
                        : "#FFFFFF")
            }}>
                <h1>Pomodoro</h1>
                <Timer
                    minutes={this.state.minutes}
                    seconds={this.state.seconds}
                />
                <Controls
                    isPlay={this.state.isPlay}
                    onPlayPause={() => this.handlePlayPause()}
                    onBack={() => this.handleBack()}
                />
                <History
                    history={this.state.history}
                />
            </div>
        );
    }

    handlePlayPause() {
        console.log(`Play / pause clicked, isPlay = ${this.state.isPlay}`);
        if (this.state.isPlay === true) {
            this.appendHistory(INTERVAL_PAUSE);
            clearInterval(this.intervalHandle);
            this.intervalHandle = setInterval(() => this.handleTick(), 250);
        } else {
            clearInterval(this.intervalHandle);
            this.intervalHandle = setInterval(() => this.handleTick(), 1000);

            // If starting an interval, log in history
            if (this.currentInterval !== null) {
                this.appendHistory(this.currentInterval);
            }
        }

        this.setState({ isPlay: !this.state.isPlay });
    }

    appendHistory(interval) {
        let history = this.state.history.slice(0); // Copy, don't mutate.
        history.push(interval)
        this.setState({ history: history });
    }


    handleTick() {
        console.log(`Tick`);
        if (this.state.isPlay === true) {
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
                        this.currentInterval = INTERVAL_LONGBREAK;
                    } else {
                        this.numSeconds = NUM_SECONDS_BREAK;
                        this.currentInterval = INTERVAL_BREAK;
                    }
                } else {
                    isFocus = true;
                    this.numSeconds = NUM_SECONDS_FOCUS;
                    this.currentInterval = INTERVAL_FOCUS;
                }

                // Refresh minSec calculation after having reset the countdown appropriately.
                minSec = this.getMinSec();

                // Pause the timer, so the user can get ready for the next interval
                this.handlePlayPause();
            }

            this.setState({
                isFocus: isFocus,
                minutes: minSec.minutes,
                seconds: minSec.seconds,
            });
        } else {
            this.setState({
                isBlink: !this.state.isBlink,
            });
        }
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
