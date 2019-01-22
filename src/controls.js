import React from 'react';

class Controls extends React.Component {
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
                    className="next"
                    onClick={this.props.onNext}
                >
                    Next
                </button>
            </div>
        );
    }
}

export default Controls;
