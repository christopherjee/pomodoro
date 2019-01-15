import React from 'react';

class History extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let history = this.props.history.map(
            (interval, i) => {
                return <li key={i}>{interval}</li>;
            }
        );

        return (
            <div>
                <h1>History</h1>
                <ol>{history}</ol>
            </div>
        );
    }
}

export default History;
