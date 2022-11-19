import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin'

// export default function(phase, {defaultConfig}) {
//         if ('sassOptions' in defaultConfig) {
//                 defaultConfig['sassOptions'] = {
//                         includePaths: ['./styles', './components/styles', './']
//                 }
//         }
//         return defaultConfig;
// }

export const config = (phase, { defaultConfig }) => {
        /**
        * @type {import('next').NextConfig}
        */
        const nextConfig = {
                ...defaultConfig,
                swcMinify: false,
                basePath: './',
                compress: ture,

                pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],

                distDir: 'build',

                devIndicators: {
                        buildActivityPosition: 'bottom-right',
                },

                compiler: {
                        // see https://styled-components.com/docs/tooling#babel-plugin for more info on the options.
                        styledComponents: {
                                // Enabled by default in development, disabled in production to reduce file size,
                                // setting this will override the default for all environments.
                                displayName: "UFO-Records",
                                // Enabled by default.
                                ssr: true,
                                // Enabled by default.
                                fileName: true,
                                // Empty by default.
                                topLevelImportPaths: ["./"],
                                // Defaults to ["index"].
                                meaninglessFileNames: ["index"],
                                // Enabled by default.
                                cssProp: true,
                                // Empty by default.
                                namespace: undefined,
                                // Not supported yet.
                                minify: true,
                                // Not supported yet.
                                transpileTemplateLiterals: true,
                                // Not supported yet.
                                pure: true,
                        },

                        compiler: {
                                reactRemoveProperties: { properties: ['^data-test$'] },
                                removeConsole: {
                                        exclude: ['error'],
                                },
                        },
                },

                webpack: (config, {isServer}) => {
                        config.resolve = {
                                plugins: [new TsconfigPathsPlugin({
                                        baseUrl: "./"
                                })]
                        }
                        if (!isServer) {
                                config.node = {
                                        fs: 'empty'
                                }
                        }

                        return config
                },

                sassOptions: {
                        includePaths: ['./styles', './components/styles', './']
                },
        }

        return nextConfig
}
