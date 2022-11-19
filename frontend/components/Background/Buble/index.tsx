import React from 'react'
import Background from './../index'

class Circle {
        constructor(x, y) {
                this.x = x;
                this.y = y;
                this.r = 3;
                this.done = false;
        }

        draw(ctx) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.r, 0, Math.PI*2);
                ctx.stroke();
        }
}

interface Props {
        children?: React.ReactNode
        className?: string
}

export default class extends React.Component<Props> {
        private canvasRef
        private canvas;
        private ctx;
        private w;
        private h;
        private mouseX
        private mouseY;
        private circles;

        constructor(props: Props) {
                super(props)
        }

        setupCircles() {
                this.circles = [];
        }

        reset() {
                this.h = window.innerHeight;
                this.w = window.innerWidth;
                if (this.canvas) {
                        this.canvas.height = this.h
                        this.canvas.width = this.w
                }
        }

        dist(x1, y1, x2, y2) {
                return Math.hypot(x1 - x2, y1 - y2);
        }

        addCircles() {
                let nrOfTries = 0;
                let wasAdded;
                do {
                        wasAdded = false;
                        let x = Math.random() * this.w;
                        let y = Math.random() * this.h;
                        if (this.validPos(x, y)) {
                                wasAdded = true;
                                let c = new Circle(x, y);
                                this.circles.push(c);
                        }
                        nrOfTries++;
                } while (!wasAdded && nrOfTries < 100)
        }

        validPos(x, y) {
                for(let i = 0; i < this.circles.length; i++) {
                        let current = this.circles[i];
                        let d = this.dist(x, y, current.x, current.y);
                        if(d - 3 < current.r) {
                                return false;
                        }
                }
                let distToCursor = this.dist(this.mouseX, this.mouseY, x, y);
                if(distToCursor < 70) {
                        return false;
                }
                return true;
        }

        canGrow(circle) {
                for(let i = 0; i < this.circles.length; i++) {
                        let current = this.circles[i];
                        if(circle !== current) {
                                let d = this.dist(circle.x, circle.y, current.x, current.y);
                                if(d-2 <= circle.r + current.r) {
                                        return false;
                                } 
                        }
                }
                return true;
        }

        drawCircles() {
                for(let j = 0; j < 4; j++) {
                        this.addCircles();
                }
                this.circles.forEach(c => {
                        if(!c.done && this.canGrow(c)) {
                                c.r += 0.5;
                        } else {
                                c.done = true;
                        }
                        c.draw(this.ctx);
                });
                this.circles = this.circles.filter(c => this.dist(this.mouseX, this.mouseY, c.x, c.y) > 50);
        }

        mousemove(event) {
                this.mouseX = event.clientX;
                this.mouseY = event.clientY;
        }

        draw() {
                this.draw = this.draw.bind(this)
                requestAnimationFrame(this.draw);
                this.ctx.fillStyle = "black";
                this.ctx.fillRect(0, 0, this.w, this.h);
                this.ctx.strokeStyle = "white";
                this.drawCircles();
        }

        componentDidMount(): void {
                this.canvas = this.canvasRef.current;
                this.ctx = this.canvas.getContext("2d");
                this.reset();
                document.addEventListener("resize", this.reset.bind(this));
                document.addEventListener("mousemove", this.mousemove.bind(this));
                this.setupCircles();
                this.mouseX = this.mouseY = this.w * 10;
                this.draw();
        }

        componentWillUnmount() {
                window.removeEventListener("resize", this.reset);
                document.removeEventListener("mousemove", this.mousemove);
        }

        render() {
                this.canvasRef = React.createRef()

                return (
                        <Background className={this.props.className}>
                                <canvas ref={this.canvasRef}>
                                        {this.props.children}
                                </canvas>
                        </Background>
                )
        }
}
