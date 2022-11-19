import React, { createRef, useState } from 'react'

// import useWindowDimensions     from 'hooks/useWindowDimensions'
import {Section, SubSection} from 'components/Section'
import GlowingSphereBackground from 'components/Background/GlowingSphere'
import SelectDates from './SelectDate'

import styles from './Recording.module.scss'

import Calendar from 'react-calendar'

export default function() {
        const [date, setDate] = useState(new Date());

        return (
                <>
                        <Section title="Звукозапись" id="recording">
                                <SubSection ref={createRef()} id="services" title="Услуги" css_class="section-main">
                                        <div className={`${styles.wrapper} segment`}>
                                                <div className={`segment ${styles.content} ${styles.services}`}>
                                                        <div className={styles.vline}>
                                                        </div>
                                                </div>
                                        </div>
                                </SubSection>
                                <SubSection ref={createRef()} id="schedule" title="Записаться" css_class="section-main">
                                        <div className={`${styles.wrapper} segment`}>
                                                <div className={`${styles.content} ${styles.schedule}`}>
                                                        <SelectDates/>
                                                </div>
                                        </div>
                                </SubSection>
                        </Section>
                        </>
        )
}
