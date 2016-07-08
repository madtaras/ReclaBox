# ReclaBox

To start development run

`npm i`

`gulp`

Flags:

* `--prod` - build production version (includes minification)
* `--noBrowserSync` - prevent starting browserSync
* `--noWatch` - prevent watching for changing and rebuilding

There is a bug in materialize-css module.
You need to replace `require('./picker.js')` by `require('../../../pickadate/lib/picker.js')` in materialize js file.
