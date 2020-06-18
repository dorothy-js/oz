export const routes = [
    {
        name: '404',
        pattern: '404',
        module: '@404/module',
        injection: {
            point: '[pollon-app]'
        }
    },
    {
        name: 'welcome',
        pattern: '',
        module: '@welcome/module',
        injection: {
            point: '[pollon-app]'
        }
    }
]