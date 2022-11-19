import React from 'react'

import styles from './Timeline.module.scss'

export function Year({children, value}: {children: React.ReactNode, value: number}) {
        return (
                <div className={styles.timeline__group}>
                        <span className={`${styles.timeline__year} ${styles.time}`} aria-hidden="true">{value}</span>
                        {children}
                </div>
        )
}

export function Entry({children, date}: {children: React.ReactNode, date: Date}) {
        return (
                <div className={`${styles.timeline__card} ${styles.card}`}>
                        <header className={styles.card__header}>
                                <time className={styles.time} dateTime={date.toDateString()}>
                                        <span className={styles.time__day}>{date.getDay()}</span>
                                        <span className={styles.time__month}>{date.getMonth()}</span>
                                </time>
                        </header>
                        <div className={styles.card__content}>
                                <p>{children}</p>
                        </div>
                </div>
        )
}

export default function({children}) {
        return (
                <div className={styles.timeline}>
                        {children}
                </div>
        )

}
