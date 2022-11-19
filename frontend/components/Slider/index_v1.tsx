import React, { useEffect, useRef, useState } from 'react'

import styles from './Slider_v1.module.scss'

import useWIndowDimensions from 'hooks/useWindowDimensions'
import { convertCssUnits } from 'helpers'
import { useIsVisible } from 'react-is-visible'
import Node from './components/Node'
export { Node }

function Slider(props: Props) {
        const winSize = useWIndowDimensions()
        const nodes = useRef<Map<number, HTMLElement>>(new Map<number, HTMLElement>())
        const scrollerRef = useRef<HTMLDivElement>() 
        let [activeNodeInd, setActiveNodeInd] = useState(0)
        let [isSwiping, setIsSwiping] = useState(false)
        let [swipScrollInitialOffset, setSwipScrollInitialOffset] = useState(0)
        let [swipStartCursor, setSwipStartCursor] = useState({x: 0, y: 0})
        let [nodeWidth, setNodeWidth] = useState(0)
        let [autoScroll, setAutoScroll] = useState(false)
        let isVisible = useIsVisible(scrollerRef)

        function scrollTo(i: number) {
                if (!nodes.current.has(i)) {
                        console.error("Slider::scrollTo() cannot scroll to element with ind", i, "Reason: element unexists")
                        return
                }
                scrollerRef.current?.scrollTo(nodes.current.get(i)!.offsetLeft, 0)
        }

        function onScroll() {
                if (isSwiping) {
                        return
                }

                const scroll = scrollerRef.current?.scrollLeft
                let scrollPadding = props.scrollPadding ? convertCssUnits(props.scrollPadding, scrollerRef.current) : 0
                if (scrollPadding < 0.1) {
                        scrollPadding = 0
                }
                for (let [ind, elementRef] of nodes.current) {
                        if (scroll == elementRef.offsetLeft - scrollPadding) {
                                setActiveNodeInd(ind)
                                break;
                        }
                }

        }

        function swipStart(ev: any) {
                setAutoScroll(false)
                // @ts-ignore
                scrollerRef.current.style["scroll-snap-type"] = "proximity" // proximity
                setIsSwiping(true)
                setSwipScrollInitialOffset(scrollerRef.current!.scrollLeft)
                setSwipStartCursor({x: ev.clientX, y: ev.clientY})
                setActiveNodeInd(-228)
        }

        function swipEnd() {
                const scrollOffset = scrollerRef.current!.scrollLeft
                let min_distance = Number.MAX_SAFE_INTEGER
                let min_distnace_node_ind = -1
                for (let [ ind, node ] of nodes.current) {
                        if (Math.abs(scrollOffset - node.offsetLeft) < min_distance) {
                                min_distance = node.offsetLeft
                                min_distnace_node_ind = ind
                        }
                }

                        console.log(min_distnace_node_ind)
                if (min_distnace_node_ind > 0) {
                        scrollTo(min_distnace_node_ind)
                        setActiveNodeInd(min_distnace_node_ind)
                }

                scrollerRef.current!.style.scrollSnapType = "x mandatory"
                setIsSwiping(false)
                setSwipScrollInitialOffset(0)
                setAutoScroll(true)
                console.log("swipe end")
        }

        function swipMove(ev: any) {
                if (isSwiping) {
                        const curScroll = swipScrollInitialOffset
                        const cursorInitialOffset = swipStartCursor.x
                        const currentCursorOffset = ev.clientX
                        scrollerRef.current?.scrollTo(curScroll + cursorInitialOffset-currentCursorOffset, 0)
                }
        }

        function calculateNodeWidth() {
                const scrollerWidth = scrollerRef.current!.offsetWidth
                if (!props.visibleNodes || props.visibleNodes == 1) {
                        return scrollerWidth
                }
                const initialNode = nodes.current.get(0)
                let borderWidth = 0
                if (initialNode?.children[0]) {
                        borderWidth = convertCssUnits(getComputedStyle(initialNode.children[0]).borderLeftWidth, initialNode)
                }
                const initialNodeOffset = 
                        convertCssUnits(getComputedStyle(initialNode!.children[0]).paddingLeft, initialNode) +
                        convertCssUnits(getComputedStyle(initialNode!.children[0]).paddingRight, initialNode) +
                        convertCssUnits(getComputedStyle(initialNode!.children[0]).marginLeft, initialNode) +
                        convertCssUnits(getComputedStyle(initialNode!.children[0]).marginRight, initialNode) +
                        borderWidth*2
                const countToPlace = props.visibleNodes ?? 1
                return (scrollerWidth-initialNodeOffset*countToPlace) / countToPlace
        }

        useEffect(() => {
                if (props.interval && props.interval > 0) {
                        setAutoScroll(true)
                }
                if (props.scrollPadding) {
                        scrollerRef.current!.style.scrollPaddingLeft = props.scrollPadding
                        nodes.current.get(0)!.style.marginLeft = props.scrollPadding
                }

                const calcInitialScroll = () => convertCssUnits(props.scrollPadding, scrollerRef.current)
                scrollerRef.current?.scrollTo(props.scrollPadding ? calcInitialScroll() : 0, 0)

                if (nodes.current.size > 0) {
                        // with zero width get offset
                        setNodeWidth(calculateNodeWidth())
                }

                setTimeout(() => scrollerRef.current!.style!.opacity = "1", 100)

                return () => {
                        setAutoScroll(false)
                }
        }, [])

        if (props.interval && props.interval > 0) {
                let [intervalId, setIntervalId] = useState(0)
                useEffect(() => {
                        const setupInterval = () => {
                                let _activeNodeInd = activeNodeInd
                                let _intervalId = setInterval(() => {
                                        try {
                                                const nextInd = (_activeNodeInd >= nodes.current.size-1 ? 0 : _activeNodeInd+1)
                                                const nextNode = nodes.current.get(nextInd)
                                                if (nextNode) {
                                                        scrollerRef.current?.scrollTo(nextNode.offsetLeft, 0)
                                                        setActiveNodeInd(() => nextInd)
                                                } else {
                                                        throw new Error("Cannot scroll to next node. Reason: next node unexists")
                                                }
                                        } catch (e) {
                                                console.error(e)
                                        }
                                }, props.interval)

                                return _intervalId
                        }

                        if (autoScroll) {
                                if (!intervalId) {
                                        let _intervalId = setupInterval()
                                        setIntervalId(_intervalId)
                                } else {
                                        clearInterval(intervalId)
                                        setIntervalId(0)

                                        let _intervalId = setupInterval()

                                        setIntervalId(_intervalId)
                                }
                        } else {
                                clearInterval(intervalId)
                                setIntervalId(0)
                        }
                }, [autoScroll, activeNodeInd])
        }

        useEffect(() => {
                if (winSize.width != 0) {
                        setNodeWidth(calculateNodeWidth())
                }
        }, [winSize.width])

        useEffect(() => {
                if (isVisible) {
                        if (props.interval && props.interval > 0) {
                                setActiveNodeInd(activeNodeInd+1)
                                setActiveNodeInd(activeNodeInd)
                                setAutoScroll(true)
                        }
                } else {
                        setAutoScroll(false)
                }
        }, [isVisible])

        const children = props.children

        return (
                <div className={styles.wrapper}>
                        <div
                                ref={scrollerRef}
                                style={{ opacity: "0" }}
                                className={styles["nodes-wrapper"]}
                                onScroll={onScroll}
                                // onmousedown={swipStart}
                                // onmouseup={swipEnd}
                                // onmousemove={swipMove}
                        >
                                {React.Children.map(children, (child: React.ReactElement<Node>, i) => {
                                        return React.cloneElement(child, {
                                                ...child.props,
                                                ref: (ref: any) => nodes.current.set(i, ref),
                                                width: nodeWidth,
                                                height: props.height,
                                                timeout: props.interval,
                                                active: (activeNodeInd == i),
                                                class: props.nodeClass,
                                                activeClass: props.activeNodeClass,
                                                key: i,
                                                __swipEnd: swipEnd,
                                                __swipStart: swipStart,
                                                __swipMove: swipMove,
                                        })
                                })}
                        </div>
                </div>
        )
}

interface Props {
        children: React.ReactElement<Node>[]
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
