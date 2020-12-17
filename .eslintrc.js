module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    settings: {
        "react": {
            version: "detect"
        },
    },
    plugins: [
        '@typescript-eslint',
    ],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
    ],
    rules: {
        '@typescript-eslint/ban-ts-ignore': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        'react/prop-types': 'off',
    }
};
