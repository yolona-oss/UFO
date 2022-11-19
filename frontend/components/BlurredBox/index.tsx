import React from 'react'

import styles from './BlurredBox.module.scss'

export default function({children, width = '300px', height = '300px'}) {
        return (<div className={styles.container} style={{ "--bb-width": width, "--bb-height": height }}>
                {children}
        </div>)
}
