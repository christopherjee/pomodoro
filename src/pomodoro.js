import React from 'react';
import Timer from './timer.js';
import History from './history.js';
import Controls from './controls.js';
import Progress from './progress.js';

const NUM_MINUTES_FOCUS = 25;
const NUM_SECONDS_FOCUS = 10 //NUM_MINUTES_FOCUS*60;
const NUM_SECONDS_BREAK = 5 // 5*60;
const NUM_SECONDS_LONGBREAK = 15 //30*60;
const INTERVAL_FOCUS = "Focus";
const INTERVAL_BREAK = "Break";
const INTERVAL_LONGBREAK = "Long Break";
const INTERVAL_PAUSE = "Pause";
const NUM_TOTAL_POMODOROS = 4;

class Pomodoro extends React.Component {
    constructor(props) {
        super(props);
        this.numSeconds = NUM_SECONDS_FOCUS;
        this.intervalHandle = null;

        const minSec = this.getMinSec();
        this.state = {
            minutes: minSec.minutes,
            seconds: minSec.seconds,
            currentInterval: INTERVAL_FOCUS,
            numPomodoros: 1,
            isPlay: false,
            isBlink: true,
            history: [],
        };
    }

    render() {
        return (
            <div style={{
                backgroundColor: (
                    this.state.isPlay || this.state.isBlink
                        ? (this.state.isFocus ? "#8CC152" : "#E9573F" )
                        : "#FFFFFF")
            }}>
                <h1>Pomodoro</h1>
                <Timer
                    minutes={this.state.minutes}
                    seconds={this.state.seconds}
                />
                <Progress
                    currentInterval={this.state.currentInterval}
                    numPomodoros={this.state.numPomodoros}
                    totalPomodoros={NUM_TOTAL_POMODOROS}
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
            if (this.state.currentInterval !== null) {
                this.appendHistory(this.state.currentInterval);
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
            let currentInterval = this.state.currentInterval;
            let numPomodoros = this.state.numPomodoros;
            if (minSec.minutes === 0 && minSec.seconds === 0) {
                if (isFocus === true) {
                    isFocus = false;

                    // If it's the last pomodoro, we go to a long break
                    if (numPomodoros === NUM_TOTAL_POMODOROS) {
                        this.numSeconds = NUM_SECONDS_LONGBREAK;
                        currentInterval = INTERVAL_LONGBREAK;
                    } else {
                        this.numSeconds = NUM_SECONDS_BREAK;
                        currentInterval = INTERVAL_BREAK;
                    }
                } else {
                    isFocus = true;

                    // If this is the last of the pomodoros, reset
                    if (numPomodoros === NUM_TOTAL_POMODOROS) {
                        numPomodoros = 1;
                    } else {
                        numPomodoros++;
                    }

                    this.numSeconds = NUM_SECONDS_FOCUS;
                    currentInterval = INTERVAL_FOCUS;
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
                currentInterval: currentInterval,
                numPomodoros: numPomodoros,
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
