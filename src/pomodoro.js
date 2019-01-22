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
            currentPomodoro: 1,
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
                        ? (this.state.currentInterval === INTERVAL_FOCUS ? "#8CC152" : "#E9573F" )
                        : "#FFFFFF")
            }}>
                <h1>Pomodoro</h1>
                <Timer
                    minutes={this.state.minutes}
                    seconds={this.state.seconds}
                />
                <Progress
                    currentInterval={this.state.currentInterval}
                    currentPomodoro={this.state.currentPomodoro}
                    totalPomodoros={NUM_TOTAL_POMODOROS}
                />
                <Controls
                    isPlay={this.state.isPlay}
                    onPlayPause={() => this.handlePlayPause()}
                    onBack={() => this.handleBackNext('back')}
                    onNext={() => this.handleBackNext('next')}
                />
                <History
                    history={this.state.history}
                />
            </div>
        );
    }

    handlePlayPause(forcePlayPause = null) {
        // If forcePlayPause is set, use that setting. Otherwise, just toggle.
        let isPlay = forcePlayPause ? forcePlayPause === 'play' : !this.state.isPlay;

        console.log(`Play / pause, this.state.isPlay = ${this.state.isPlay}, forcePlayPause = ${forcePlayPause}, isPlay = ${isPlay}`);

        if (isPlay === false) {
            clearInterval(this.intervalHandle);
            this.intervalHandle = setInterval(() => this.handleTick(), 250);
            this.appendHistory(INTERVAL_PAUSE);
        } else {
            clearInterval(this.intervalHandle);
            this.intervalHandle = setInterval(() => this.handleTick(), 1000);
            this.appendHistory(this.state.currentInterval);
        }

        this.setState({ isPlay: isPlay });
    }

    handleBackNext(direction) {
        console.log(`${direction}`);
        let currentInterval = this.state.currentInterval;
        let currentPomodoro = this.state.currentPomodoro;
        switch (direction) {
            case 'back':
                // If it's playing, just go back to the beginning of the interval
                if (this.state.isPlay !== true) {
                    switch (currentInterval) {
                        case INTERVAL_FOCUS:
                            if (currentPomodoro !== 1) {
                                currentInterval = INTERVAL_BREAK;
                                currentPomodoro--;
                            }
                            break;
                        case INTERVAL_BREAK:
                        case INTERVAL_LONGBREAK:
                            currentInterval = INTERVAL_FOCUS;
                            break;
                        default:
                            console.log("No current interval");
                            break;
                    }
                }
                break;
            case 'next':
                switch (currentInterval) {
                    case INTERVAL_FOCUS:
                        if (currentPomodoro === NUM_TOTAL_POMODOROS) {
                            currentInterval = INTERVAL_LONGBREAK;
                        } else {
                            currentInterval = INTERVAL_BREAK;
                        }
                        break;
                    case INTERVAL_BREAK:
                    case INTERVAL_LONGBREAK:
                        if (currentPomodoro === NUM_TOTAL_POMODOROS) {
                            currentPomodoro = 1;
                        } else {
                            currentPomodoro++;
                        }

                        currentInterval = INTERVAL_FOCUS;
                        break;
                    default:
                        console.log("No current interval");
                        break;
                }
                break;
            default:
                console.log("No direction supplied");
                break;
        }

        // Always pause after changing direction
        this.handlePlayPause('pause');

        // Reset countdown based on new interval
        switch (currentInterval) {
            case INTERVAL_FOCUS:
                this.numSeconds = NUM_SECONDS_FOCUS;
                break;
            case INTERVAL_BREAK:
                this.numSeconds = NUM_SECONDS_BREAK;
                break;
            case INTERVAL_LONGBREAK:
                this.numSeconds = NUM_SECONDS_LONGBREAK;
                break;
            default:
                console.log("No current interval");
                break;
        }

        let minSec = this.getMinSec();
        this.setState({
            minutes: minSec.minutes,
            seconds: minSec.seconds,
            currentInterval: currentInterval,
            currentPomodoro: currentPomodoro,
        });
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

            // If we are looking at state change, then let that handler
            // take care of it. Otherwise, just update the countdown.
            if (minSec.minutes === 0 && minSec.seconds === 0) {
                this.handleBackNext('next');
            } else {
                this.setState({
                    minutes: minSec.minutes,
                    seconds: minSec.seconds,
                });
            }
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
