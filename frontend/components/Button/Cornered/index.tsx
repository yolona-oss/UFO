import React from 'react'

import styles from './CorneredButton.module.scss'

interface Props {
        children?: React.ReactNode
        version?: number
        borderColor?: string
        fontSize?: string
        width?: string
        centred?: boolean
        onClick?: () => void
}

export default function({children, version, borderColor = "#98c379", fontSize = "1rem", width = "100%", centred = false, onClick = () => {}}: Props) {
        const style = {
                "--borderColor": borderColor,
                "fontSize": fontSize
        }

        return (
                <div onClick={onClick} className={`${styles.button} ${styles[`v${version??7}`]}`} style={style}>
                        <span className={styles.label} style={{width: width, textAlign: (centred ? "center" : "left")}}>{children}</span>
                        <span className={styles.icon}>
                                <span></span>
                        </span>
                        <span className={styles.icon2}>
                        </span>
                </div>
        )
}
