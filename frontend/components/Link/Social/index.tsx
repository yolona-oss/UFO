import React, { ReactNode } from 'react'
import Link from 'next/link'

import styles from './SocialLink.module.scss'

interface Props {
        children?: ReactNode
        color?: "blue" | "red" | "amber"
        image?: ReactNode
        href: string
}

export default function({children, color = "blue", image, href}: Props) {
        return (
                <Link href={href}>
                        <div className={`${styles["glass-btn"]} ${styles[`${color}-btn`]}`}>
                                {children ? <div className={styles["content"]}>{children}</div> : null}
                                {image}
                        </div>
                </Link>
        )
}
