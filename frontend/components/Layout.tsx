import React from 'react'
import Head from 'next/head'
import { Navbar as Header } from 'components/Header'
import Footer from 'components/Footer'

export interface Props {
        children?: React.ReactNode[]
        keywords?: string
        title?: string
}

export default function({children, keywords, title}: Props) {
        return (
                <>
                        <Head>
                                <link rel="icon" href="/favicon.ico" />
                                <meta name="viewport" content="width=device-width, initial-scale=1" />
                                <meta
                                        name="description"
                                        content="Официальный сайт студии звукозаписи UFO Records в городе Краснодар"
                                        />
                                <meta keywords={`UFO звукозапись ${keywords}`} />
                                <link rel="apple-touch-icon" href="/logo192.png" />
                                <link rel="manifest" href="/manifest.json" />
                                <title>{title ?? "UFO Records"}</title>
                        </Head>
                        {children}
                        <Header />
                        <Footer />
                </>
        )
}
