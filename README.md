## Cook

A Node.JS application to assist creating Web development projects.

Compare with other more comprehensive tools such as [Yeoman](http://yeoman.io/), Cook is much more light-weight and only focuses on scarffolding.

Prerequisite
============

* Internet connection :-)
* [Node.js](http://nodejs.org/)
* Node.js npm
* [LiveReload](http://livereload.com/) browser plugins for `grunt watch`
* SASS for live processing `sass/*.scss`

Installation
============

        git clone https://github.com/hufyhang/cook.git
        cd cook
        npm install . -g

Usage
=====

To create a new Web development project:

        cook -c projectName

Project Build & Deploy
======================

For **RequireJS** supporeted projects:

1. Ensure RequireJS and its Optimizer are installed.
2. Build project:

        r.js -o build.js

3. All CSSs and JSs are either combined or uglified and enventually exported to `/dist`.

For **non-RequireJS** projects:

CSSs and JSs are in `/css` and `/js/built` respectively.

