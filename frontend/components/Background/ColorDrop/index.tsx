import React from 'react'

import styles from './ColorDrop.module.scss'

import Background from './../index'

export default function({className}) {
        let cdrops: any[] = []
        for (let i = 0; i < 145; i++) {
                cdrops.push(<div className={styles.c}></div>)
        }

        return (
                <Background className={className}>
                        <div className={styles.wrapper}>
                                {cdrops}
                        </div>
                </Background>
        )
}
