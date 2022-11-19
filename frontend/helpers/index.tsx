export function parseUnits(unit: string|number|undefined|null) {
        if (typeof unit == "string") {
                return unit
        } else if (typeof unit == "number") {
                return unit + "px"
        }
        return "0"
}

interface Point {
        x: number
        y: number
}

export const pointInRect = ({x, y, right, bottom}: DOMRect, point: Point) => (
        (point.x > x && point.x < right) && (point.y > y && point.y < bottom)
)

export function convertCssUnits(cssValue: string, target: HTMLElement|null|undefined) {
        if (typeof window == "undefined") {
                return null
        }

        target = target || document.body;

        const supportedUnits = {

                // Absolute sizes
                'px': (value: number) => value,
                'cm': (value: number) => value * 38,
                'mm': (value: number) => value * 3.8,
                'q': (value: number) => value * 0.95,
                'in': (value: number) => value * 96,
                'pc': (value: number) => value * 16,
                'pt': (value: number) => value * 1.333333,

                // Relative sizes
                'rem': (value: number) => value * parseFloat(getComputedStyle(document.documentElement).fontSize),
                'em': (value: number) => value * parseFloat(getComputedStyle(target).fontSize),
                'vw': (value: number) => value / 100 * window.innerWidth,
                'vh': (value: number) => value / 100 * window.innerHeight,

                // Times
                'ms': (value: number) => value,
                's': (value: number) => value * 1000,

                // Angles
                'deg': (value: number) => value,
                'rad': (value: number) => value * ( 180 / Math.PI ),
                'grad': (value: number) => value * ( 180 / 200 ),
                'turn': (value: number) => value * 360

        };

        // Match positive and negative numbers including decimals with following unit
        const pattern = new RegExp( `^([\-\+]?(?:\\d+(?:\\.\\d+)?))(${ Object.keys( supportedUnits ).join( '|' ) })$`, 'i' );

        // If is a match, return example: [ "-2.75rem", "-2.75", "rem" ]
        const matches = String.prototype.toString.apply( cssValue ).trim().match( pattern );

        if (matches) {
                const value = Number(matches[1]);
                const unit = matches[2].toLocaleLowerCase();

                // Sanity check, make sure unit conversion function exists
                if (unit in supportedUnits) {
                        // @ts-ignore
                        return supportedUnits[unit](value);
                }
        }

        return cssValue;

};

export interface Rect {
        left: number,
        top: number,
        bottom: number,
        right: number
}

export interface ElementOffset {
        left: number
        top: number
        width: number
        height: number
}

export const boxModel = (function() {
        type GetReturnType<Type> = Type extends (...args: never[]) => infer Return
                ? Return
                : never;

        const avalibleProps = ["margin", "offset", "padding", "borderWidth"]
        type BoxModelPropType = "margin" | "offset" | "padding" | "borderWidth"

        type BoxModelPropElementType<T extends BoxModelPropType> = 
                T extends "margin" ? Rect :
                T extends "offset" ? ElementOffset :
                T extends "padding" ? Rect :
                T extends "borderWidth" ? Rect :
                never

        interface CacheEntry {
                style: CSSStyleDeclaration,
                props: {
                        margin?: BoxModelPropElementType<"margin">
                        offset?: BoxModelPropElementType<"offset">
                        padding?: BoxModelPropElementType<"padding">
                        borderWidth?: BoxModelPropElementType<"borderWidth">
                },
                stamp: Date
        }

        class _getBoxModel {
                private cache: Map<HTMLElement, CacheEntry> = new Map()

                private getSinglePropWrap<T extends BoxModelPropType>(element: HTMLElement, detail: T): BoxModelPropElementType<T> {
                        // check win
                        let cacheHit = false
                        let cachedEntry: CacheEntry | undefined
                        for (let [node, entry] of this.cache) {
                                if (node.isEqualNode(element)) {
                                        cacheHit = true
                                        cachedEntry = entry
                                        break
                                }
                        }

                        if (cacheHit) {
                                if (getComputedStyle(element) == cachedEntry?.style) {
                                        if (cachedEntry?.props[detail]) {
                                                return cachedEntry?.props[detail]
                                        } else {
                                                let prop = this.getSingleProp(element, cachedEntry.style, detail)
                                                // @ts-ignore
                                                cachedEntry.props[detail] = prop
                                                return prop
                                        }
                                } else {
                                        let style = getComputedStyle(element)
                                        let prop = this.getSingleProp(element, style, detail)
                                        // @ts-ignore
                                        cachedEntry!.props[detail] = prop
                                        return prop
                                }
                        } else {
                                let style = getComputedStyle(element)
                                let prop = this.getSingleProp(element, style, detail)
                                let props: any = {}
                                props[detail] = prop
                                this.cache.set(element, {
                                        style,
                                        props,
                                        stamp: new Date()
                                })

                                return prop
                        }
                }

                private getSingleProp<T extends BoxModelPropType>(element: HTMLElement, styles: CSSStyleDeclaration, detail: T): BoxModelPropElementType<T> {
                        let ret: any

                        if (detail.includes("margin")) {
                                ret = {
                                        left: convertCssUnits(styles!.borderLeftWidth, element),
                                        right: convertCssUnits(styles!.borderRightWidth, element),
                                        top: convertCssUnits(styles!.borderTopWidth, element),
                                        bottom: convertCssUnits(styles!.borderBottomWidth, element)
                                }
                        } else if (detail.includes("offset")) {
                                ret = {
                                        left: element!.offsetLeft,
                                        top: element!.offsetTop,
                                        width: element!.offsetWidth,
                                        height: element!.offsetHeight,
                                }
                        } else if (detail.includes("borderWidth")) {
                                ret = {
                                        left: convertCssUnits(styles!.borderLeftWidth, element),
                                        right: convertCssUnits(styles!.borderRightWidth, element),
                                        top: convertCssUnits(styles!.borderTopWidth, element),
                                        bottom: convertCssUnits(styles!.borderBottomWidth, element)

                                }
                        } else if (detail.includes("padding")) {
                                ret = {
                                        left: convertCssUnits(styles!.borderLeftWidth, element),
                                        right: convertCssUnits(styles!.borderRightWidth, element),
                                        top: convertCssUnits(styles!.borderTopWidth, element),
                                        bottom: convertCssUnits(styles!.borderBottomWidth, element)
                                } as BoxModelPropElementType<T>
                        }

                        console.log("asdf", detail)

                        return ret as BoxModelPropElementType<T>;
                }


                getProps(element: HTMLElement|undefined) {
                        if (!element) {
                                return null
                        }

                        return {
                                margin: () => this.getSinglePropWrap(element, "margin"),
                                padding: () => this.getSinglePropWrap(element, "padding"),
                                offset: () => this.getSinglePropWrap(element, "offset"),
                                borderWidth: () => this.getSinglePropWrap(element, "borderWidth"),
                        }
                }
        }

        return _getBoxModel
})()
