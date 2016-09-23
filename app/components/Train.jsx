import React from 'react';

const pDollarRecognizer = require('./PDollarRecognizerSinglton.js').pDollarRecognizer;
const pd = require("./pdollar.js");
const Hammer = require('react-hammerjs');

require('./Train.css');

export default class Train extends React.Component {
    constructor(props) {
        super(props);

        this._isDown = false;
        this._strokeID = 0; // stroke's number
        this._points = new Array();
    }

    componentDidMount() {
        this.gameCanvas = document.getElementById('train-canvas');
        this.ctx = this.gameCanvas.getContext('2d');

        this.ctx.canvas.width = window.innerWidth;
        this.ctx.canvas.height = window.innerHeight;
        this.ctx.fillStyle = "rgba(0, 0, 0, 0)";
        this.ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    }

    trainCanvasMouseDown(e) {
        console.log("down");
        this._isDown = true;

        const x = e.clientX;
        const y = e.clientY;
        this._points[this._points.length] = new pd.Point(x, y, ++this._strokeID);
        const clr = "rgb(" + rand(0,100) + "," + rand(0,100) + "," + rand(0,100) + ")";
        this.ctx.strokeStyle = clr;
        this.ctx.fillStyle = clr;
        this.ctx.fillRect(x - 4, y - 3, 9, 9);
    }

    trainCanvasMouseMove(e) {
        console.log("move");
        if (this._isDown) {
            const x = e.clientX;
            const y = e.clientY;
            this._points[this._points.length] = new pd.Point(x, y, this._strokeID); // append
            this.drawConnectedPoint(this._points.length - 2, this._points.length - 1);
        }
    }

    trainCanvasMouseUp(e) {
        console.log("up");
        if (this._isDown) {
            this._isDown = false;
        }
    }

    drawConnectedPoint(from, to) {

        this.ctx.beginPath();
        this.ctx.moveTo(this._points[from].X, this._points[from].Y);
        this.ctx.lineTo(this._points[to].X, this._points[to].Y);
        this.ctx.closePath();
        this.ctx.stroke();
    }

    clearBtnClick(e) {
        this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    }

    addBtnClick(e) {
        const name = this.refs.gestureName.value;
        if (this._points.length >= 10 && name.length > 0) {
            console.log("Add");
            pDollarRecognizer.AddGesture(name, this._points);

            window.allSymbols.push(name);
            this._points = [];
            this.refs.gestureName.value = "";
            this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        }
    }

    handlePanStart(e) {
        console.log("panStart");
    }
    handlePan(e) {
        console.log("pan");
    }
    handlePanEnd(e) {
        console.log("panEnd");
    }

    render() {
        return (
            <div>
                <div id="train-header">
                    <div id="pre" onClick = { this.props.onClick }></div>
                    <input ref="gestureName"/>
                    <button onClick = { this.clearBtnClick.bind(this) }>清除</button>
                    <button onClick = { this.addBtnClick.bind(this) }>添加</button>
                </div>
                {/* <Hammer
                    onPanStart={ this.trainCanvasMouseDown.bind(this) }
                    onPan={ this.trainCanvasMouseMove.bind(this) }
                    onPanEnd={ this.trainCanvasMouseUp.bind(this)}
                    options={{
                       recognizers: {
                          pan: { enable: true }
                       }
                    }}> */}
                    <canvas id="train-canvas" ref="trainCanvas"
                        onMouseDown = { this.trainCanvasMouseDown.bind(this) }
                        onMouseMove = { this.trainCanvasMouseMove.bind(this) }
                        onMouseUp = { this.trainCanvasMouseUp.bind(this) }></canvas>
                {/* </Hammer> */}

            </div>
        );
    }
}

function rand(low, high) {
    return Math.floor((high - low + 1) * Math.random()) + low;
}
