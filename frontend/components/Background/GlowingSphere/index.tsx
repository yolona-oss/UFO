import React from 'react'

import styles from './GlowingSphere.module.scss'

import Background from './../index'

export default function({className = ""}) {
        return (
                <Background className={className}>
                        <div className={`${styles.back} ${className}`}>
                                <div className={`${styles.shpere} ${className}`}>
                                </div>
                        </div>
                </Background>
        )
}
