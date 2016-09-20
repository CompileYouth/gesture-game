import React from 'react';

require("./About.css");

export default class About extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="about" onClick = { this.props.onClick }>
                靠，这么无聊，这都看啊！
            </div>
        );
    }
}
