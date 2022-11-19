import React, { createRef } from 'react'
import Vector from 'ts-vector'

import Background from './Background'

import styles from './styles/AllyShipPlayground.module.scss'

interface Point {
        x: number
        y: number
}

interface ShipProps {
        speed: number
}

interface ShipState {
}

export class Ship extends React.Component<ShipProps, ShipState> {

        private timer: number

        private position: Point = {x:500,y:500}
        private direction: Point = {x:500,y:500}
        private mousePosition: Point = {x:500,y:500}
        private angle: number

        private shipRef: React.Ref<HTMLDivElement>

        constructor(props: ShipProps) {
                super(props)
                this.shipRef = React.createRef<HTMLDivElement>()
                this.updateMouse = this.updateMouse.bind(this)
                this.update = this.update.bind(this)
                this.move = this.move.bind(this)
        }

        update() {
                let newVector: Point = {
                        x: this.direction.x-this.position.x+this.mousePosition.x-this.position.x,
                        y: this.direction.y-this.position.y+this.mousePosition.y-this.position.y
                }

                if (newVector.x == 0 || newVector.y == 0) {
                        newVector = { x: 10, y: 10 }
                }
                const velocity = new Vector(newVector.x, newVector.y).normalizeVector().multiply(this.props.speed)

                this.position = { x: Number(velocity.at(0)), y: Number(velocity.at(1)) }
                this.direction = newVector

                this.move()
        }

        move() {
                try {
                        this.shipRef!.current.style.top = this.position.y + 'px'
                        this.shipRef!.current.style.left = this.position.x + 'px'
                } catch (e) {}
        }

        updateMouse(ev: any) {
                this.mousePosition = {x: ev.x, y: ev.y}
        }

        componentDidMount(): void {
                document.addEventListener('mousemove', this.updateMouse)
                this.timer = setInterval(this.update, 1000)
        }

        componentDidUnmount(): void {
                document.removeEventListener('mousemove', this.updateMouse)
                clearInterval(this.timer)
        }

        render() {
                return (
                        <div ref={this.shipRef} className={styles.ship}>
                        </div>
                )
        }
}

interface Props {

}

interface State {
}

export default class extends React.Component<Props, State> {

        constructor(props: Props) {
                super(props)
        }

        render() {
                return (
                        <Background>
                                <Ship speed={100} />
                        </Background>
                )
        }
}
