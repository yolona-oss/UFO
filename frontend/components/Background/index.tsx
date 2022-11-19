import React from 'react'

interface Props {
        children?: React.ReactNode
        image?: string
        className?: string
        fullscreen?: boolean
        layer?: number
        style?: any
}

export default function({children, image, className, layer = -2, fullscreen = false, style = {}}: Props) {
        // const styles = (image ? { "background-image": `url("${image}");` } : {});
        let ins
        if (image) {
                ins = (
                        <img src={`${image}`} />
                )
        }

        const baseClass = fullscreen ? "background-fullscreen" : "background"

        return (
                <div className={`${baseClass} ${className ?? ""}`} style={{ zIndex: layer, ...style }}>
                        <div className={`${className ?? ""}`}>
                                {ins}
                                {children}
                        </div>
                </div>
        )
}
