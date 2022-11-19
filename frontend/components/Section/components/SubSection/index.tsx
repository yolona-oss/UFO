import React from 'react'
import {motion} from 'framer-motion'

import Title from './Title'

import styles from './../../styles/SubSection/Section.SubSection.module.scss'

interface Props {
        title?: string
        children: React.ReactNode
        id: string
        css_class?: string
        isActive?: boolean
        refContent?: React.Ref<HTMLDivElement>
}

export default React.forwardRef((props: Props, ref: React.Ref<HTMLDivElement>) => {
        const title = props.title
        const children = props.children
        const id = props.id

        if (props.isActive) {
                console.log("visible:", id)
        }

        return (
                <div ref={ref} id={id} className={styles["sub-section"]}>
                        {title && title.length > 0 ? <Title>{title}</Title> : null}
                        <motion.div
                                className={styles["content-wrapper"]}

                                animate={props.isActive ? "in" : "out"}
                                transition={{ duration: 0.8 }}
                                variants={{
                                        in: { opacity: 1 },
                                        out: { opacity: 0.1 }
                                }}
                                initial="out"
                        >
                                <section className={props.css_class}>
                                        <div ref={props.refContent} className={styles.content}>
                                                {children}
                                        </div>
                                </section>
                        </motion.div>
                </div>
        )
});
