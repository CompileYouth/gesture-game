import React from 'react';

require('./Train.css');

export default class Train extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div id="train-header">
                    <div id="pre" onClick = { this.props.onClick }></div>
                    <input/>
                    <button>添加</button>
                </div>
            </div>
        );
    }
}
