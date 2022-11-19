import React from 'react'

import Progress from 'components/Progress'

import styles from './SliderNode.module.scss'

interface Props {
        children?: React.ReactNode
        active?: boolean
        width?: string
        height?: string
        timeout?: number
        __swipStart?: (ev: any) => void
        __swipEnd?: (ev: any) => void
        __swipMove?: (ev: any) => void

        class?: string
        activeClass?: string
}

const Node = React.forwardRef((props: Props, ref: React.Ref<HTMLDivElement>) => {
        const geometry = {
                width: props.width,
                height: props.height
        }

        return (
                <div
                        ref={ref}
                        className={styles["node-wrapper"]}
                >
                        <div
                                className={(props.class ?? "") + " " + (props.active ? (props.activeClass ?? "") : "")}
                                onMouseDown={props.__swipStart}
                                onMouseMove={props.__swipMove}
                                onMouseUp={props.__swipEnd}
                                style={geometry}
                        >
                                {props.children}
                        </div>
                        <div className={styles.progress} style={{ opacity: Number(props.active && props.timeout && props.timeout > 0)}}>
                                <Progress timeout={props.timeout} timeoutState={() => props.active ?? false} width={"100%"} />
                        </div>
                </div>
        )
})

export default Node
