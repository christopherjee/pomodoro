import React from 'react';

class Controls extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="controls">
                <button
                    className="back"
                    onClick={this.props.onBack}
                >
                    Back
                </button>
                <button
                    className="playpause"
                    onClick={this.props.onPlayPause}
                >
                    { this.props.isPlay ? "Pause" : "Play" }
                </button>
                <button
                    className="stop"
                    onClick={this.props.onStop}
                >
                    Stop
                </button>
            </div>
        );
    }
}

export default Controls;
