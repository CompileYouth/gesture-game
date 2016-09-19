import React from 'react';

require('./pdollar.js');
require('./Game.css');

export default class Game extends React.Component {
    constructor(props) {
        super(props);

        this._isDown = false;
        this._strokeID = 0; // stroke's number
        this._points = new Array();
    }

    componentDidMount() {
        this.gameCanvas = document.getElementById('game-canvas');
        this.ctx = this.gameCanvas.getContext('2d');
        this.ctx.fillStyle = "rgba(255,0, 0, 0.5)";
        this.ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    }

    gameCanvasMouseDown(e) {
        console.log("down");
        this._isDown = true;
        const x = e.clientX;
        const y = e.clientY;
        // this._points[this._points.length] = new Point(x, y, ++this._strokeID);
        const clr = "rgb(" + rand(0,200) + "," + rand(0,200) + "," + rand(0,200) + ")";
        this.ctx.strokeStyle = clr;
        this.ctx.fillStyle = clr;
        this.ctx.fillRect(x - 4, y - 3, 9, 9);
    }

    gameCanvasMouseMove(e) {
        console.log("move");
        if (_isDown) {
            const x = e.clientX;
            const y = e.clientY;
            this._points[this._points.length] = new Point(x, y, this._strokeID); // append
            this.drawConnectedPoint(this._points.length - 2, this._points.length - 1);
        }
    }

    gameCanvasMouseUp(e) {
        console.log("up");
    }

    drawConnectedPoint(from, to) {
        this.ctx.beginPath();
        this.ctx.moveTo(this._points[from].X, this._points[from].Y);
        this.ctx.lineTo(this._points[to].X, this._points[to].Y);
        this.ctx.closePath();
        this.ctx.stroke();
    }

    render() {
        return (
            <canvas id="game-canvas" ref="gameCanvas"
                onMouseDown = { this.gameCanvasMouseDown.bind(this) }
                onMouseMove = { this.gameCanvasMouseMove.bind(this) }
                onMouseUp = { this.gameCanvasMouseUp.bind(this) }></canvas>
        );
    }
}

function rand(low, high) {
    return Math.floor((high - low + 1) * Math.random()) + low;
}
