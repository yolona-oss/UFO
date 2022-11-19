import React, { useEffect, useState } from 'react'
import {motion} from 'framer-motion'

import styles from './SideRiseMenu.module.scss'

export default function({children, fullHide = () => false}) {
        const menuRef = React.createRef<HTMLDivElement>()
        const tongueRef = React.createRef<HTMLDivElement>()
        let [ g, setG ] = useState({hide: "0px", fullHide: "-1980px"})
        let [ toggled, setToggled ] = useState(false)

        useEffect(() => {
                menuRef.current!.style.top = `calc(50% - ${menuRef.current?.clientHeight}px / 2)`
                setTimeout(() => {menuRef.current!.style.opacity = "1"}, 1500)
                
                tongueRef.current!.style.height = menuRef.current?.clientHeight + "px"

                setG({
                        hide: -(menuRef.current?.clientWidth-tongueRef.current?.clientWidth) + "px",
                        fullHide: -menuRef.current?.clientWidth + "px",
                })

                return () => {

                }
        }, [])

        return (
                <motion.div
                        ref={menuRef}
                        className={styles.menu}
                        style={{ opacity: "0" }}

                        animate={fullHide() ? "fullHide" : toggled ? "show" : "hide"}
                        transition={{ duration: 0.3 }}
                        variants={{
                                show: { right: "0px" },
                                hide: { right: g.hide },
                                fullHide: { right: g.fullHide }
                        }}
                        initial="fullHide"

                >
                        <div ref={tongueRef} className={styles.tongue} onClick={() => setToggled(!toggled)}>
                                -
                        </div>
                        <div className={styles.content}>
                                {children}
                        </div>
                </motion.div>
        )
}
