module.exports = {
    images: {
        domains: ['[type]-top.ru']
    },
    webpack(config, options) {
        config.module.rules.push({
            loader: '@svgr/webpack',
            options: {
                prettier: false,
                svgo: true,
                svgoConfig: {
                    plugins: [{ removeViewBox: false }],
                },
                titleProp: true,
            },
            test: /\.svg$/,
        });

        return config;
    },
};