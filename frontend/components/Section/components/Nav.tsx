import React, { useState } from 'react'
// import useRouter from 'next/router'
import { motion } from 'framer-motion'

import { ISection } from './../types'

import styles from './../styles/Section.Nav.module.scss'

export interface Props {
        title: string
        sections: ISection[]
        activeSubSection: string
}

export interface State {
}

interface LinkProps extends ISection {
        onClick: (ev: any) => void,
        isActive: boolean
}

function Link({value, link, isActive = false, onClick = () => {}}: LinkProps) {
        let [localIsActive, setLocalIsActive] = useState(false)

        return (
                <a
                        key={link}
                        className={styles["link"] + (isActive || localIsActive ? ` ${styles["is-active"]}` : "")}
                        onClick={(e) => onClick(e)}
                        onMouseEnter={() => setLocalIsActive(true)}
                        onMouseLeave={() => setLocalIsActive(false)}
                >
                        {value}
                        <motion.img
                                src="/images/ufo.png"
                                className={styles["mark"]}

                                animate={isActive || localIsActive ? "active" : "inActive"}
                                transition={{ duration: 0.3 }}
                                variants={{
                                        active: { left: "0px" },
                                        inActive: { left: "8rem" }
                                }}
                                initial={isActive ? "active" : "inActive"}
                        />
                </a>
        )
}

export default function(props: Props) {
        function onClick(ev: any, link: string) {
                ev.preventDefault()
                // useRouter.router?.scrollToHash("#" + link)
                document.querySelector(`#${link}`)?.scrollIntoView()
        }

        const activeSubSection = props.activeSubSection
        const sections = props.sections ?? []

        return (
                <div className={styles["nav"]}>
                        <div className={styles["nav-content"]}>
                                <h2 className={styles["title"]}>{props.title}</h2>
                                {sections.map(( v, i ) => (
                                        <Link
                                                key={i}
                                                value={v.value}
                                                link={v.link}
                                                onClick={(ev) => onClick(ev, v.link)}
                                                isActive={activeSubSection == v.link}
                                        />
                                ))}
                        </div>
                </div>
        )
}
