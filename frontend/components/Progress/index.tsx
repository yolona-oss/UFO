import React, { useEffect, useRef } from 'react'
// import { motion } from 'framer-motion'

import styles from './ProgressBar.module.scss'

interface Props {
        width: string
        progress?: () => number
        timeout?: number
        timeoutState?: () => boolean
}

export default function({timeout, width, progress, timeoutState = () => false}: Props) {
        const progressRef = useRef<HTMLDivElement>(null)

        let progress_div = (<div ref={progressRef} className={styles.progress} style={{ backgroundSize: "0%" }} />)

        useEffect(() => {
                function resetAnimation() {
                        progressRef.current?.classList.remove(styles["timeout-animation"])
                        progressRef.current?.offsetWidth
                        progressRef.current?.classList.add(styles["timeout-animation"])
                }
                resetAnimation()

                if (!timeoutState()) {
                        progressRef.current?.classList.remove(styles["timeout-animation"])
                } else {
                        progressRef.current?.classList.add(styles["timeout-animation"])
                }
        }, [timeoutState()])

        if (timeout && timeout > 0) {
                progress_div = (
                        <div
                                ref={progressRef}
                                className={`${styles.progress} ${(timeoutState() ? styles["timeout-animation"] : "" )}`}
                                style={{ "--progress-timeout": `${timeout}ms` }}
                                />
                )
        } else if (progress) {
                progress_div = (<div ref={progressRef} className={styles.progress} style={{ backgroundSize: `${progress()} + "%", 100%` }} />)
        }

        return (
                <div className={styles.wrapper} style={{ width: width }}>
                        {progress_div}
                </div>
        )
}
