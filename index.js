const path = require('path');

const NO_REACT_PATCH_ERROR =
    'Unable to include `react-hot-loader/patch`, the entry path was not ' +
    'found. Please make sure to use the `entry` option in your ' +
    '`poi.config.js` file.';

module.exports = ({ tsLoaderOptions } = {}) => poi => {
    // Extract the entry path, used to find which webpack entry imports the
    // entry path.
    const entryPath = path.resolve(poi.options.entry);

    poi.extendWebpack(config => {
        // Add ts and tsx extensions as importable extensions
        config.resolve.extensions.add('.ts').add('.tsx');

        // Add ts-loader to ts or tsx files
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

        // Add ts-loader to vue files
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

        // Find the entry that includes the entry path and prepend the entry
        // with react-hot-loader/patch.
        let patchIncluded = false;
        for (const key of config.entryPoints.store.keys()) {
            const entry = config.entry(key);

            if (entry.store.has(entryPath)) {
                entry.prepend(require.resolve('react-hot-loader/patch'));
                patchIncluded = true;
            }
        }

        // Throw an error if the entry path is not found.
        if (!patchIncluded) {
            throw new Error(NO_REACT_PATCH_ERROR);
        }
    });
};
