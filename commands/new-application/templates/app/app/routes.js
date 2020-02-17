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
        name: 'home',
        pattern: '',
        module: '@home/module',
        injection: {
            point: '[pollon-app]'
        }
    }
]