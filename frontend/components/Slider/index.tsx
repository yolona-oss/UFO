import React, { useEffect, useRef, useState } from 'react'

import styles from './Slider.module.scss'

import useWIndowDimensions from 'hooks/useWindowDimensions'
import { convertCssUnits, boxModel as _boxModel } from 'helpers'
import { useIsVisible } from 'react-is-visible'
import Node from './components/Node'
export { Node }

const boxModel = new _boxModel()

function Slider(props: Props) {
        const winSize = useWIndowDimensions()
        const nodes = useRef<Map<number, HTMLElement>>(new Map<number, HTMLElement>())
        const viewRef = useRef<HTMLDivElement>() 
        const containerRef = useRef<HTMLDivElement>() 
        let [activeNodeInd, setActiveNodeInd] = useState(0)
        let [isSwiping, setIsSwiping] = useState(false)
        let [swipScrollInitialOffset, setSwipScrollInitialOffset] = useState(0)
        let [swipStartCursor, setSwipStartCursor] = useState({x: 0, y: 0})
        let [nodeWidth, setNodeWidth] = useState(0)
        let [autoScroll, setAutoScroll] = useState(false)
        let isVisible = useIsVisible(viewRef)

        const getNodeContentBoxModel = () => {
                return boxModel.getProps(nodes.current.get(0)?.children[0] as HTMLElement)
        }

        const getNodeBoxModel = () => {
                return boxModel.getProps(nodes.current.get(0))
        }

        const getContainerBoxModel = () => {
                return boxModel.getProps(containerRef.current)
        }

        const getViewBoxModel = () => {
                return boxModel.getProps(viewRef.current)
        }

        function scrollTo(i: number) {
                if (!nodes.current.has(i)) {
                        console.error("Slider::scrollTo() cannot scroll to element with ind", i, "Reason: element unexists")
                        return
                }
                viewRef.current?.scrollTo(nodes.current.get(i)!.offsetLeft, 0)
        }

        function onScroll() {
                if (isSwiping) {
                        return
                }

                const scroll = viewRef.current?.scrollLeft
                let scrollPadding = props.scrollPadding ? convertCssUnits(props.scrollPadding, viewRef.current) : 0
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
                // scrollerRef.current.style["scroll-snap-type"] = "none" // proximity
                setIsSwiping(true)
                setSwipScrollInitialOffset(viewRef.current!.scrollLeft)
                setSwipStartCursor({x: ev.clientX, y: ev.clientY})
                setActiveNodeInd(-228)
        }

        function swipEnd() {
                const scrollOffset = viewRef.current!.scrollLeft
                let min_distance = Number.MAX_SAFE_INTEGER
                let min_distnace_node_ind = -1
                for (let [ ind, node ] of nodes.current) {
                        if (Math.abs(scrollOffset - node.offsetLeft) < min_distance) {
                                min_distance = node.offsetLeft
                                min_distnace_node_ind = ind
                        }
                }

                if (min_distnace_node_ind > 0) {
                        scrollTo(min_distnace_node_ind)
                        setActiveNodeInd(min_distnace_node_ind)

                }

                // @ts-ignore
                // scrollerRef.current.style["scroll-snap-type"] = "x mandatory"
                setIsSwiping(false)
                setSwipScrollInitialOffset(0)
                setAutoScroll(true)
        }

        function swipMove(ev: any) {
                if (isSwiping) {
                        const curScroll = swipScrollInitialOffset
                        const cursorInitialOffset = swipStartCursor.x
                        const currentCursorOffset = ev.clientX
                        viewRef.current?.scrollTo(curScroll + cursorInitialOffset-currentCursorOffset, 0)
                }
        }

        function calculateNodeWidth() {
                const scrollerWidth = viewRef.current!.offsetWidth
                if (!props.visibleNodes || props.visibleNodes == 1) {
                        return scrollerWidth
                }
                const initialNodeOffset = 
                        getNodeContentBoxModel()!.padding().left + getNodeContentBoxModel()!.padding().right +
                        getNodeContentBoxModel()!.margin().left + getNodeContentBoxModel()!.margin().right +
                        getNodeContentBoxModel()!.borderWidth().left + getNodeContentBoxModel()!.borderWidth().right
                const countToPlace = props.visibleNodes ?? 1
                return (scrollerWidth-initialNodeOffset*countToPlace) / countToPlace
        }

        useEffect(() => {
                if (props.interval && props.interval > 0) {
                        setAutoScroll(true)
                }
                if (props.scrollPadding) {
                        viewRef.current!.style["scroll-padding-left"] = props.scrollPadding
                }

                const calcInitialScroll = () => convertCssUnits(props.scrollPadding, viewRef.current)
                viewRef.current?.scrollTo(props.scrollPadding ? calcInitialScroll() : 0, 0)

                if (nodes.current.size > 0) {
                        // with zero width get offset
                        setNodeWidth(calculateNodeWidth())
                }

                setTimeout(() => viewRef.current!.style!.opacity = "1", 100)

                return () => {
                        setAutoScroll(false)
                }
        }, [])

        useEffect(() => {

        }, [nodeWidth])

        if (props.interval && props.interval > 0) {
                let [intervalId, setIntervalId] = useState(0)
                useEffect(() => {
                        const setupInterval = () => {
                                let _activeNodeInd = activeNodeInd
                                let _intervalId = setInterval(() => {
                                        try {
                                                console.log(activeNodeInd)
                                                const nextInd = (_activeNodeInd >= nodes.current.size-1 ? 0 : _activeNodeInd+1)
                                                console.log(nextInd)
                                                const nextNode = nodes.current.get(nextInd)
                                                if (nextNode) {
                                                        viewRef.current?.scrollTo(nextNode.offsetLeft, 0)
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
                console.log("winSize", winSize)
                if (winSize.width != 0) {
                        console.log(calculateNodeWidth())
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
                <div ref={containerRef} className={styles.tape}>
                        <div
                                ref={viewRef}
                                style={{ opacity: "0" }}
                                className={styles.scroller}
                                // onScroll={onScroll}
                        >
                                {React.Children.map(children, (child, i) => {
                                        return React.cloneElement(child, {
                                                // @ts-ignore
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
