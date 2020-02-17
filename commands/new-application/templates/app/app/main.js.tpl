import Loader from '@pollon/system-js'
import Binder from '@pollon/knockout'
import { Application } from '@pollon/pollon'
import { routes } from '@application/routes'

var App
App = new Application('test', {
    baseUrl: '',
    selector: '[pollon-app]',
    loader: new Loader(),
    binder: new Binder()
})


App.use({
    '@pollon/juice': {},
    '@pollon/http': {}
})


App.routes(routes)

App.navigationStep(route => {
    return true
    let App = Application.get('{% this.app.name %}')
    let disposables = (
        App.kernel.currentModule &&
        App.kernel.currentModule.View &&
        App.kernel.currentModule.View.Model &&
        App.kernel.currentModule.View.Model.disposables) || []

    disposables.forEach(d => d.dispose && d.dispose())

    return true
})

App.prepare()
    .then(() => App.start())
    .then(() => {
        let page = window.location.pathname || ''
        App.navigate(page)
    })


export default App