import React from 'react'
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
        return (
                <Html>
                        <Head>
                                <link rel="preconnect" href="https://fonts.googleapis.com" />
                                <link rel="preconnect" href="https://fonts.gstatic.com" />
                                <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto' />
                                <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Lato' />
                                <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Open+Sans" />
                                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
                                <meta charSet="utf-8" />
                        </Head>
                        <body>
                                <Main />
                                <NextScript />
                        </body>
                </Html>
        )
}
