import React, { ReactNode } from 'react'

import styles from './../../styles/SubSection/Section.SubSection.Title.module.scss'

export default function TopicTitle({children}: {children?: ReactNode}) {
                return (
                        <div className={styles["title-wrapper"] + " header"}>
                                <div className={styles["title"] + " segment"}>
                                        <div className={styles.backdrop}></div>
                                        <h1>{children}</h1>
                                </div>
                        </div>
                )
        }
