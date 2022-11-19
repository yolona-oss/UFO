import React, { useEffect, useRef } from "react";

interface ScrollInfo {
        scrollHeight: number
}

interface Props {
        mainWrapper?: React.ReactNode
        children: React.ReactNode
        loader?: React.ReactNode
        dipatchScroll?: (scrollInfo: ScrollInfo) => void
}

export default function InfiniteScroll({
        mainWrapper,
        children,
        loader,
        dipatchScroll,
}: Props) {
        let mainWrapperRef = useRef();

        const triggerScroll = (mainWrapperRef) => {
                if (
                        mainWrapperRef.current &&
                                Object.keys(mainWrapperRef.current).length > 0
                ) {
                        const element = mainWrapperRef.current;
                        element.onscroll = (e) => {
                                if (
                                        e.target.scrollTop + e.target.offsetHeight ===
                                                e.target.scrollHeight
                                )
                                dipatchScroll({ scrollHeight: e.target.scrollHeight });
                        };
                }
        };

        useEffect(() => {
                triggerScroll(mainWrapperRef);
        }, [triggerScroll]);

        return React.cloneElement(mainWrapper, { ref: mainWrapperRef }, [
                ...children,
                loader
        ]);
}

InfiniteScroll.defaultProps = {
        mainWrapper: undefined, //Should be html tag or React element
        loader: undefined, //It should be a React element.
        dipatchScroll: (data: ScrollInfo) => {
                console.log("dipatchScroll", data);
        }, //Used to handle scroll callback event in the parent.
};

// InfiniteScroll.propTypes = {
//   mainWrapper: PropTypes.element.isRequired,
//   loader: PropTypes.element,
//   dipatchScroll: PropTypes.func.isRequired,
// };
