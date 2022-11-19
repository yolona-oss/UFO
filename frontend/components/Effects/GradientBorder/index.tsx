import React from 'react'

import styles from './GradientBorder.module.scss'

export default function({children, borderWidth = 3+"px"}) {
        return (
                <div className={styles["gradient-border"]} style={{ "--gradient-border-width": borderWidth }}>
                        {children}
                </div>
        )
}
