import React from 'react';
import Game from "./Game.jsx";
import Main from "./Main.jsx";

require('./App.css');


export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentPage: "main"
        };

        this._pages = {
            "play-game": "game",
            "select-gesture": "select",
            "train-gesture": "train",
            "about-author": "about"
        };
    }

    handleMainClick(e) {
        this.setState({
            currentPage: this._pages[e.target.id]
        });

        if (this._pages[e.target.id] === "game") {

        }
    }

    render() {
        return (
            <div>
                { this.state.currentPage === "main" ? <Main onClick = { this.handleMainClick.bind(this) } ref = "main"></Main> : null }
                { this.state.currentPage === "game" ? <Game></Game> : null }
            </div>
        );
    }
}
