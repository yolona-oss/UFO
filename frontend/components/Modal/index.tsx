import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

import Button from 'components/Button'

import styles from './Modal.module.scss'

import { parseUnits, pointInRect } from 'helpers'

function getIcon(name: string) {
        return (<span className="material-symbols-outlined">{name}</span>)
}

export const Modal = (props: Props) => {
        const geometry = {
                width: (props.fullscreen ? "100vw" : parseUnits(props.width)),
                height: (props.fullscreen ? "100vh" : parseUnits(props.height)),
        }
        const contentRef = React.createRef<HTMLDivElement>()

        let [ isOpened, setOpened ] = useState(props.initialState)

        if (typeof isOpened != "undefined") {
                useEffect(() => {
                        setOpened(props.isOpened())
                }, [props.isOpened()])
        }

        return (
                <motion.div
                        className={styles.modal}
                        animate={isOpened ? "show" : "hide"}
                        transition={{ duration: 0.3 }}
                        variants={{
                                show: { opacity: 1 },
                                hide: { opacity: 0 }
                        }}
                        initial="hide"
                        onClick={(ev) => {
                                const x = ev.clientX
                                const y = ev.clientY
                                if (!pointInRect(contentRef.current!.getBoundingClientRect(), {x: x, y: y})) {
                                        setOpened(false)
                                }
                        }}
                >
                        <div className={styles.close} onClick={() => setOpened(!isOpened)}>{getIcon("close")}</div>
                        <div ref={contentRef} className={styles.view} style={geometry}>
                                {props.children}
                        </div>
                        <div className={styles.buttons}>
                                {props.buttons?.map(button => {
                                        return <Button onClick={button.onClick}>{getIcon(button.icon)}</Button>
                                })}
                        </div>
                </motion.div>
        )
}

interface Props {
        children: React.ReactNode
        initialState?: boolean
        fullscreen: boolean
        width: string | number
        height: string | number
        isOpened?: () => boolean
        buttonsPositon?: "top" | "bottom" | "top-right" | "top-left" | "bottom-right" | "bottom-left"
        buttons?: Button[]
}

interface Button {
        icon: string
        onClick: () => void
}

const defaultProps = {
        initialState: false,
        fullscreen: false,
        width: "50vw",
        height: "50vh",
        buttonsPositon: "bottom",
        buttons: []
}

Modal.defaultProps = defaultProps
