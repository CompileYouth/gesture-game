import React from 'react';
import Game from "./Game.jsx";
import Main from "./Main.jsx";
import About from "./About.jsx";
import Train from "./Train.jsx";

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

    handleGameClick(e) {
        this.setState({
            currentPage: "main"
        });
    }

    handleAboutClick(e) {
        this.setState({
            currentPage: "main"
        });
    }

    handleTrainClick(e) {
        this.setState({
            currentPage: "main"
        });
    }

    render() {
        return (
            <div>
                { this.state.currentPage === "main" ? <Main onClick = { this.handleMainClick.bind(this) }></Main> : null }
                { this.state.currentPage === "game" ? <Game onClick = { this.handleGameClick.bind(this) } ></Game> : null }
                { this.state.currentPage === "train" ? <Train onClick = { this.handleTrainClick.bind(this) }></Train> : null }
                { this.state.currentPage === "about" ? <About onClick = { this.handleAboutClick.bind(this) }></About> : null }
            </div>
        );
    }
}
