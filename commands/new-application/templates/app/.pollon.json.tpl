{
    "name": "{% this.app.name %}",
    "version": "{% this.app.package.version %}",
    "bundler": "{% this.app.bundler %}",
    "loader": "{% this.app.loader %}",
    "aliases": {
        "@application/": "/",
        "@modules/": "/modules/",
        "@404/": "/modules/404/",
        "@welcome/": "/modules/welcome/"
    },
    "bundles": {

    }
}