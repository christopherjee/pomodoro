import React from 'react';

class Controls extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="controls">
                <button
                    className="playpause"
                    onClick={this.props.onPlayPause}
                >
                    { this.props.isPlay ? "Pause" : "Play" }
                </button>
            </div>
        );
    }
}

export default Controls;
