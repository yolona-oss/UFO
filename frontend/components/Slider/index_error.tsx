import React, { useEffect, useRef, useState } from 'react'

import styles from './Slider.module.scss'

import { convertCssUnits } from 'helpers'
import { useIsVisible } from 'react-is-visible'
import Node from './components/Node'
export { Node }

function Slider(props: Props) {
        const scrollerRef = useRef<HTMLDivElement>() 
        let nodes: Map<number, HTMLElement> = new Map()
        let intervalId: string | number | NodeJS.Timeout | undefined = 0

        let [activeNodeInd, setActiveNodeInd] = useState(0)
        let [isDraging, setIsDraging] = useState(false)
        let [dragScrollInitialOffset, setDragScrollInitialOffset] = useState(0)
        let [dragStartCursor, setDragStartCursor] = useState({x: 0, y: 0})
        let [nodeWidth, setNodeWidth] = useState(0)

        function isIntervalSetted() {
                return props.interval && props.interval > 0
        }

        function scrollTo(i: number) {
                if (!nodes.has(i)) {
                        return
                }
                scrollerRef.current?.scrollTo(nodes.get(i)!.offsetLeft, 0)
        }

        function onScroll() {
                if (isDraging) {
                        return
                }

                if (intervalId) {
                        resetAutoScrollTimer()
                }

                const scroll = scrollerRef.current?.scrollLeft
                const scrollPadding = props.scrollPadding ? convertCssUnits(props.scrollPadding, scrollerRef.current) : 0
                for (let [ind, elementRef] of nodes) {
                        if (scroll == elementRef.offsetLeft - scrollPadding) {
                                setActiveNodeInd(ind)
                                break;
                        }
                }
        }

        function scrollNext() {
                console.log(nodes)
                try {
                        const nextInd = (activeNodeInd >= nodes.size-1 ? 0 : activeNodeInd+1)
                        const nextNode = nodes.get(nextInd)
                        if (nextNode) {
                                scrollerRef.current?.scrollTo(nextNode.offsetLeft, 0)
                                setActiveNodeInd(nextInd)
                        }
                } catch (e) {
                        console.error(e)
                }
        }

        function resetAutoScrollTimer() {
                if (intervalId) {
                        clearInterval(intervalId)
                }
                intervalId = setInterval(scrollNext, props.interval)
        }

        function dragStart(ev: any) {
                if (intervalId) {
                        clearInterval(intervalId)
                        setItervalId(0)
                }
                // @ts-ignore
                scrollerRef.current.style["scroll-snap-type"] = "x none" // proximity
                setIsDraging(true)
                setDragScrollInitialOffset(scrollerRef.current!.scrollLeft)
                setDragStartCursor({x: ev.clientX, y: ev.clientY})
                setActiveNodeInd(-228)
        }

        function dragEnd() {
                const scrollOffset = scrollerRef.current!.scrollLeft
                let min_distance = Number.MAX_SAFE_INTEGER
                let min_distnace_node_ind = -1
                for (let [ ind, node ] of nodes) {
                        if (Math.abs(scrollOffset - node.offsetLeft) < min_distance) {
                                min_distance = node.offsetLeft
                                min_distnace_node_ind = ind
                        }
                }

                if (min_distnace_node_ind > 0) {
                        scrollTo(min_distnace_node_ind)
                        // containerRef.current.scrollTo(scrollOffset - min_distance, 0)
                        // setState({activeNodeInd: min_distnace_node_ind})
                }

                // @ts-ignore
                scrollerRef.current.style["scroll-snap-type"] = "x mandatory"
                setIsDraging(false)
                setDragScrollInitialOffset(0)
                resetAutoScrollTimer()
        }

        function dragMove(ev: any) {
                if (isDraging) {
                        const curScroll = dragScrollInitialOffset
                        const cursorInitialOffset = dragStartCursor.x
                        const currentCursorOffset = ev.clientX
                        scrollerRef.current?.scrollTo(curScroll + cursorInitialOffset-currentCursorOffset, 0)
                }
        }

        useEffect(() => {
                if (props.scrollPadding) {
                        scrollerRef.current!.style["scroll-padding-left"] = props.scrollPadding
                }

                const calcInitialScroll = () => convertCssUnits(String(props!.scrollPadding), scrollerRef.current)
                scrollerRef.current?.scrollTo(props.scrollPadding ? calcInitialScroll() : 0, 0)

                if (nodes.size > 0) {
                        // with zero width get offset
                        const scrollerWidth = scrollerRef.current!.offsetWidth
                        const initialNodeWidthOffset = nodes.get(0)!.offsetWidth
                        const countToPlace = props.visibleNodes ?? 1
                        setNodeWidth((scrollerWidth-initialNodeWidthOffset*countToPlace) / countToPlace)
                }

                setTimeout(() => {
                        scrollerRef.current!.style!.opacity = "1"
                        if (isIntervalSetted()) {
                                intervalId = setInterval(scrollNext.bind(this), props.interval)
                        }
                }, 100)


                return () => {clearInterval(intervalId); intervalId = 0}
        }, [])

        // let isVisible = useIsVisible(scrollerRef)
        // 
        // useEffect(() => {
        //         if (!isVisible && intervalId) {
        //                 clearInterval(intervalId)
        //                 intervalId = 0
        //         } else if (intervalId == null){
        //                 if (props.interval && props.interval > 0) {
        //                         resetAutoScrollTimer()
        //                 }
        //         }
        // }, [isVisible])

        const children = props.children

        return (
                <div className={styles.wrapper}>
                        <div
                                ref={scrollerRef}
                                style={{ opacity: "0" }}
                                className={styles["nodes-wrapper"]}
                                onScroll={onScroll}
                        >
                                {React.Children.map(children, (child, i) => {
                                        const isNodeActive = (activeNodeInd == i)
                                        // @ts-ignore
                                        return React.cloneElement(child, {
                                                // @ts-ignore
                                                ...child.props,
                                                ref: (ref: any) => {nodes.set(i, ref); return true;},
                                                width: nodeWidth,
                                                height: props.height,
                                                timeout: props.interval,
                                                active: isNodeActive,
                                                class: props.nodeClass,
                                                activeClass: props.activeNodeClass,
                                                key: i,
                                                __dragEnd: dragEnd.bind(this),
                                                __dragStart: dragStart.bind(this),
                                                __dragMove: dragMove.bind(this),
                                        })
                                })}
                        </div>
                </div>
        )
}

interface Props {
        children?: React.ReactElement<Node>[]
        interval: number
        height: string
        visibleNodes?: number
        node?: string
        scrollPadding?: string
        activeNodeClass?: string
        nodeClass?: string
}

const defaultProps = {
        children: [],
        visibleNodes: 1,
        height: "10vh",
        scrollPadding: "0px",
        activeNodeClass: "",
        nodeClass: ""
}

Slider.defaultProps = defaultProps

export default Slider
