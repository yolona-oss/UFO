import React from 'react'

import styles from './RingIndicatored.module.scss'

export default function({children}) {
        return (
                <div className={styles.wrap}>
                        <button className={styles.button}>{children}</button>
                </div>
        )
}
