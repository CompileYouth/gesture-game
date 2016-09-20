import React from 'react';

const ReactCSSTransitionGroup = require('react-addons-css-transition-group');
require('./Main.css');

export default class Main extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="main">
                <button id="play-game" onClick = { this.props.onClick }>开始游戏</button>
                <button id="select-gesture" onClick = { this.props.onClick }>选择图案</button>
                <button id="train-gesture" onClick = { this.props.onClick }>训练图案</button>
                <button id="about-author" onClick = { this.props.onClick }>关于作者</button>
            </div>
        );
    }
}
