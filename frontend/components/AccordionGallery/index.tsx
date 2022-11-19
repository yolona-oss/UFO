import React from 'react'

import styles from './AccordionGallery.module.scss'

export function Photo({title, imageSrc}: {title: string, imageSrc: string}) {
        return (
                <div className={styles.card}>
                        <img src={imageSrc} />
                        <div className={styles.head}>{title}</div>
                </div>
        )
}

export default function({children}) {
        return (
                <div className={styles.container}>
                        {children}
                </div>

        )
}
