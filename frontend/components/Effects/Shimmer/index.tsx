import React from 'react'

import styles from './Shimmer.module.scss'

export default function({children, color = "rgba(0, 0, 0, 0.2)"}) {
        const style = {
                "--shimmer-color": color,
        }
        return (
                <div className={styles.shimmer} style={style}>
                        {children}
                </div>
        )
}
