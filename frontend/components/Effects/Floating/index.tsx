import React from 'react'

import styles from './Floating.module.scss'

export default function({children, distance}) {
        return <div className={styles["floating-block"]} style={{ "--floating-distance": distance }}>{children}</div>
}
