import React, {Ref} from 'react'
import Link from 'next/link'
import { useIsVisible } from 'react-is-visible'

import styles from './ScrollTop.module.scss'

export function ScrollTopAnchor() {
        return <div id="scrollTopAnchor"/>
}

export function ScrollTopButton({ignoreElement}: {ignoreElement: Ref<HTMLElement>}) {
        let isVisible = useIsVisible(ignoreElement)

        return (
                <div className={(!isVisible ? `${styles["is-active"]} ` : `${styles["not-active"]} ` ) + styles["scroll-to-top"] + " segment"}>
                        <Link href="#scrollTopAnchor">
                                <span key={0} className={styles.text}>Наверх</span>
                                <div key={1} className={styles["wrapper"]}>
                                        <div className={styles["button"]}>
                                                {upArrow}
                                        </div>
                                </div>
                        </Link>
                </div>
        )
}

const upArrow = (<svg className={styles["up-arrow"]} fill="inherit" width="100%" height="100%" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%"></stop> <stop offset="100%"></stop></linearGradient></defs><path d="M21.18 17L24 14.5263L12 4L-4.6012e-07 14.5263L2.82 17L12 8.96491L21.18 17Z"></path></svg>)
