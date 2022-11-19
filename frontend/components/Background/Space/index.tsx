import React from 'react'

import Background from './../index'

import styles from './Space.module.scss'

export default function({fullscreen = false}) {
        return (
                <Background fullscreen>
                        <div className={styles.bg}></div>
                        <div className={styles["star-field"]}>
                                <div className={styles.layer}></div>
                                <div className={styles.layer}></div>
                                <div className={styles.layer}></div>
                        </div>
                </Background>
        )
}
