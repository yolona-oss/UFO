import React from 'react'

import {Section, SubSection} from 'components/Section'

import styles from './Blog.module.scss'

export default function() {
        const ref0 = React.createRef<HTMLDivElement>()

        return (
                <Section disablenav id="blog">
                        <SubSection ref={ref0} id="asdf" title="Жопа" css_class="section-main">
                        </SubSection>
                </Section>
        )
}
