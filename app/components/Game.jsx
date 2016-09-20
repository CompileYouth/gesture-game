import React from 'react';

const pDollarRecognizer = require('./PDollarRecognizerSinglton.js').pDollarRecognizer;
const pd = require('./pdollar.js');
require('./Game.css');

export default class Game extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentSymbol: null,
            score: 0,
            showStarter: true,
            starter: 3
        }

        this._isDown = false;
        this._strokeID = 0; // stroke's number
        this._points = new Array();
        this._timer = null;
    }

    componentDidMount() {
        this.gameCanvas = document.getElementById('game-canvas');
        this.ctx = this.gameCanvas.getContext('2d');

        this.ctx.canvas.width = window.innerWidth;
        this.ctx.canvas.height = window.innerHeight;
        this.ctx.fillStyle = "rgba(0, 0, 0, 0)";
        this.ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

        setTimeout(() => {
            this.setState({starter: 2});
            setTimeout(() => {
                this.setState({starter: 1});
                setTimeout(() => {
                    this.setState({starter: "开始游戏"});
                    setTimeout(() => {
                        this.setState({showStarter: false});
                        this.beginGame();
                    }, 1000);
                }, 1000);
            }, 1000);
        }, 1000);
    }

    gameCanvasMouseDown(e) {
        this._isDown = true;

        if (this._timer) {
            clearTimeout(this._timer);
            this._timer = null;
        }

        const x = e.clientX;
        const y = e.clientY;
        this._points[this._points.length] = new pd.Point(x, y, ++this._strokeID);
        const clr = "rgb(" + rand(0,100) + "," + rand(0,100) + "," + rand(0,100) + ")";
        this.ctx.strokeStyle = clr;
        this.ctx.fillStyle = clr;
        this.ctx.fillRect(x - 4, y - 3, 9, 9);
    }

    gameCanvasMouseMove(e) {
        if (this._isDown) {
            const x = e.clientX;
            const y = e.clientY;
            this._points[this._points.length] = new pd.Point(x, y, this._strokeID); // append
            this.drawConnectedPoint(this._points.length - 2, this._points.length - 1);
        }
    }

    gameCanvasMouseUp(e) {
        if (this._isDown) {
            this._isDown = false;
        }

        if (!this._timer) {
            this._timer = setTimeout(() => {
                const result = pDollarRecognizer.Recognize(this._points);
                console.log(result);
                this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
            }, 1000);
        }
    }

    drawConnectedPoint(from, to) {
        this.ctx.beginPath();
        this.ctx.moveTo(this._points[from].X, this._points[from].Y);
        this.ctx.lineTo(this._points[to].X, this._points[to].Y);
        this.ctx.closePath();
        this.ctx.stroke();
    }

    beginGame() {

    }

    render() {
        return (
            <div>
                { this.state.showStarter ? <div id="game-starter">{ this.state.starter }</div> : null }
                <div id="game-header">
                    <div id="pre" onClick = { this.props.onClick }></div>
                    <div id="bar">{ this.state.currentSymbol }</div>
                    <div id="score">{ this.state.score }</div>
                </div>
                <canvas id="game-canvas" ref="gameCanvas"
                    onMouseDown = { this.gameCanvasMouseDown.bind(this) }
                    onMouseMove = { this.gameCanvasMouseMove.bind(this) }
                    onMouseUp = { this.gameCanvasMouseUp.bind(this) }></canvas>
            </div>
    );
    }
}

function rand(low, high) {
    return Math.floor((high - low + 1) * Math.random()) + low;
}
