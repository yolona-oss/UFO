import React from 'react'

import styles from './BubbleBackground.module.scss'

export default function({children}) {
        return (<div className={`${styles.bubbly} ${styles.animate}`}></div>)
}
