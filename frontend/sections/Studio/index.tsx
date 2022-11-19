import React from 'react'

import Galery, { Photo } from 'components/AccordionGallery'

import {Section, SubSection} from 'components/Section'

import styles from './Studio.module.scss'

export default function({studio}: Props) {
        return (
                <Section title="Студия" id="studio">
                        <SubSection ref={React.createRef()} id="galery" title="Галерея" css_class="section-main">
                                <div className="center flex justify-center">
                                        <Galery>
                                                {
                                                studio.galery.map(( opt, i ) => (<Photo key={i} title={opt.title} imageSrc={`/images/galery/studio/${opt.file}`} />))
                                                }
                                        </Galery>
                                </div>
                        </SubSection>
                        <SubSection ref={React.createRef()} id="devices" title="Дивайсы" css_class="section-main">
                        </SubSection>
                </Section>
        )
}

interface Props {
        studio: {
                galery: {
                        file: string
                        title: string
                }[]
        },
}
