### Installation

``` bash
$ npm install
```

or

``` bash
$ yarn install
```

### Basic usage

``` bash
# dev server with hot reload at http://localhost:3000
$ npm start 
```

or 

``` bash
# dev server with hot reload at http://localhost:3000
$ yarn start
```

Navigate to [http://localhost:3000](http://localhost:3000). The app will automatically reload if you change any of the source files.

#### Build

Run `build` to build the project. The build artifacts will be stored in the `build/` directory.

```bash
# build for production with minification
$ npm run build
```

or

```bash
# build for production with minification
$ yarn build
```

## What's included

Arquitectura Atomic Design

```
front-end
├── public/          # static files
│   └── index.html   # html template
│
├── src/             # project root
│   ├── api/     
│   ├── assets/      # images, icons, etc.
│   ├── components/  # common components - header, footer, sidebar, etc.
│       └── atoms
│       └── headers
│       └── molecules
│       └── organism
│       └── template
│   ├── layouts/     # layout containers
│       └── routes.js    # routes config
│       └── _nav.js    # routes config
│   ├── service/     
│   ├── hooks/ 
│   ├── config/
│   ├── context/
│   ├── scss/        # scss styles
│   ├── views/       # application views
│   ├── App.js
│   ├── index.js
│   └── store.js     # template state example 
│
└── package.json
```
 