module.exports = ({ tsLoaderOptions } = {}) => poi => {
    poi.extendWebpack(config => {
        config.resolve.extensions.add('.ts').add('.tsx');

        config.module
            .rule('typescript')
            .test(/\.tsx?$/)
            .use('react-hot-loader/webpack')
            .loader('react-hot-loader/webpack')
            .end()
            .use('ts-loader')
            .loader('ts-loader')
            .options(
                Object.assign({ appendTsSuffixTo: [/\.vue$/] }, tsLoaderOptions)
            );

        config.module
            .rule('vue')
            .use('vue-loader')
            .tap(vueOptions => {
                vueOptions.esModule = true;
                vueOptions.loaders.ts = [
                    {
                        loader: 'ts-loader',
                        options: tsLoaderOptions
                    }
                ];
                return vueOptions;
            });

        if (config.entryPoints.has('client')) {
            config
                .entry('client')
                .prepend(require.resolve('react-hot-loader/patch'));
        } else {
            throw new Error('Currently only the `client` entry is supported');
        }
    });
};
