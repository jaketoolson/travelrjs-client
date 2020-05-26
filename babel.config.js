module.exports = {
    "presets": [ "es2015", "react" ],
    "plugins": ["emotion",
        [
            'module-resolver',
            {
                alias: {
                    '@': './src',
                },
                root: ['.'],
                extensions: ['.js', '.jsx', '.tsx', '.ts', '.json', '.png'],
            },
        ],
    ]
}
