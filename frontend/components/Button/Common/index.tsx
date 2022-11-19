import React from 'react'

import styles from './CommonButton.module.scss'

interface Props {
        children: React.ReactNode
        onClick: (ev: any) => void
        variant: number
        color: string
}

export default function ({children, onClick = () => {}, variant = 2, color = "#ffffff"}: Props) {
        const __variantclass = `btn-${variant}`
        const __classname = styles.btn + " " + styles[__variantclass]

        return (
                <a
                        onClick={onClick}
                        className={__classname}
                        // style={{ "--common-button-color": color }}
                >
                        {children}
                </a>
        )
}
