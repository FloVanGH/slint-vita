# slint vita

slint vita is an experimental showcase, of a [TypeScript](https://www.typescriptlang.org/) application with a [Slint](https://github.com/slint-ui/slint) user interface.

## About

This showcase is used to explore and show the possibilities of Slint with the TypeScript language. The user interface of the
showcase is inspired by the playstation vita.

## Prerequisites

In order to use this template and build a Node.js application, you need to install a few tools:

  * **[Node.js](https://nodejs.org/download/release/v16.19.1/)** (v16. Newer versions currently not supported: [#961](https://github.com/slint-ui/slint/issues/961))
  * **[Rust compiler](https://www.rust-lang.org/tools/install)** (1.66 or newer)

## How to run

From root of this projects run:

```sh
npm install
export SLINT_BACKEND=winit && npm start
```

## How to display psn trophies

It is possible to display psn trophies. To use it an authentication token is needed. An explanation how to obain
an authentic token can be found at https://www.npmjs.com/package/psn-api. With that token the app can be run with:

```sh
npm install
export PSN=my_token && npm start
```

## License

The source code of the showcase is available under the terms of MIT license.
(See [LICENSE-MIT](./LICENSES/MIT.txt) for details.)

However, because of the use of GPL dependencies, lili, as a whole, is licensed
under the terms of the GPLv3 (See [LICENSE-GPL](./LICENSES/GPL-3.0-only.txt))