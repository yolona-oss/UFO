import React from 'react'

import {Section, SubSection} from 'components/Section'

import styles from './Bits.module.scss'

export default function() {
        const ref0 = React.createRef<HTMLDivElement>()

        return (
                <Section title="Биты" id="bits">
                        <SubSection ref={ref0} id="overview" title="Обзор" css_class="section-main">
                        </SubSection>
                </Section>
        )
}
