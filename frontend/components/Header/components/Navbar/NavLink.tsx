import React from 'react'
import useRouter from 'next/router'

import styles from './../../styles/Navbar.module.scss'

interface NavLinkProps {
        href?: string
        children?: React.ReactNode
        className?: string
        onClick?: (e: React.MouseEvent, href?: string) => never
}

export default function NavbarLink({ href, children, className, onClick }: NavLinkProps) {
        const _onClick = (e: React.MouseEvent, href?: string) => {
                e.preventDefault();
                if (href) useRouter.router?.scrollToHash(href)
        }

        let UsingOnClick = (e: any) => _onClick(e, href)
        if (onClick) {
                UsingOnClick = onClick
        }

        return (
                <div className={styles.link +" "+ (className ?? "")} onClick={UsingOnClick}>
                        {children}
                </div>
        )
}

