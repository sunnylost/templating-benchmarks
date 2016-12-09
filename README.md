templating-benchmarks
=====================

This project provides a framework for running benchmarks against multiple templating engines under Node.js. The following templating engine modules are currently integrated:

Template | Syntax | Streaming | Asynchronous | Auto-escape
---- | ---- | ---- | ---- | ----
[dustjs-linkedin](https://github.com/linkedin/dustjs) | Text | ✔ | ✔ | ✔
[doT](https://github.com/olado/doT) | Text | ✖ | ✖ | ✖
[handlebars](https://github.com/wycats/handlebars.js) | Text | ✖ | ✖ | ✔
[pug](https://github.com/pugjs/pug) | Short-hand HTML | ✖ | ✖ | ✔
[marko](https://github.com/marko-js/marko) | HTML/Concise HTML | ✔ | ✔ | ✔
[nunjucks](http://mozilla.github.io/nunjucks/) | Text | ✖ | ✔ | ✖
[react](https://facebook.github.io/react/)<sup>1</sup> | JSX | ✖ | ✖ | ✔
[swig](http://mozilla.github.io/nunjucks/) | Text | ✖ | ✖ | ✔

NOTE 1: While React is not a "templating engine", it is commonly used to render HTML on the server so it has been included in this benchmark.

# Table of Contents

- [Run Benchmarks](#run-benchmarks)
- [Current Results](#current-results)
	- [Performance](#performance)
	- [Compiled Size](#compiled-size)
- [Client-side Runtime Sizes](#client-side-runtime-sizes)
	- [Marko](#marko)
	- [Dust](#dust)
- [Contribute](#contribute)
	- [Adding a New Comparison Group](#adding-a-new-comparison-group)
	- [Adding a New Template Engine](#adding-a-new-template-engine)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Run Benchmarks

1. Clone this repository
2. `npm install`
3. `npm test` (or `make`)

# Current Results

The following results were collected with the following setup:

- Node.js v6.9.1
- MacBook Pro (Retina, 15-inch, Mid 2015)
- Processor: 2.2 GHz Intel Core i7
- Memory: 16 GB 1600 MHz DDR3

## Performance

Higher numbers are better.

<!-- <performance> -->
```
                      RUNTIME PERFORMANCE
                      ===================
                      friends
       ✓ hornbill-template »    8,214 op/s (fastest)
                   ✗ marko »    3,111 op/s (62.13% slower)
                    ✗ dust »      671 op/s (91.83% slower)

                      if-expression
       ✓ hornbill-template »  387,844 op/s (fastest)
                   ✗ marko »  318,021 op/s (18.00% slower)
                     ✗ pug »  204,302 op/s (47.32% slower)
                    ✗ jade »   23,224 op/s (94.01% slower)

                      projects-escaped
       ✓ hornbill-template »  113,203 op/s (fastest)
                   ✗ marko »   67,567 op/s (40.31% slower)
      ✗ marko (native-for) »   60,929 op/s (46.18% slower)
              ✗ handlebars »   41,960 op/s (62.93% slower)
                    ✗ dust »   31,546 op/s (72.13% slower)

                      projects-unescaped
      ✓ marko (native-for) »  338,653 op/s (fastest)
       ✗ hornbill-template »  338,240 op/s (0.12% slower)
                   ✗ marko »  313,459 op/s (7.44% slower)
              ✗ handlebars »  120,148 op/s (64.52% slower)
                    ✗ dust »   63,012 op/s (81.39% slower)

                      reverse-helper
                   ✓ marko »  379,237 op/s (fastest)
                    ✗ dust »  231,068 op/s (39.07% slower)

                      search-results
       ✓ hornbill-template »   78,950 op/s (fastest)
                   ✗ marko »   28,711 op/s (63.63% slower)
                    ✗ dust »    8,247 op/s (89.55% slower)

                      simple-1
       ✓ hornbill-template »  338,612 op/s (fastest)
                     ✗ pug »  196,683 op/s (41.91% slower)
                   ✗ marko »  181,671 op/s (46.35% slower)
                     ✗ dot »  181,307 op/s (46.46% slower)
              ✗ handlebars »   97,307 op/s (71.26% slower)
                    ✗ dust »   74,406 op/s (78.03% slower)
                    ✗ swig »   61,318 op/s (81.89% slower)
                    ✗ jade »   29,585 op/s (91.26% slower)
                ✗ nunjucks »   27,906 op/s (91.76% slower)
                     ✗ vue »    9,128 op/s (97.30% slower)
                   ✗ react »    4,132 op/s (98.78% slower)

                      simple-2
       ✓ hornbill-template »  337,810 op/s (fastest)
                   ✗ marko »  247,820 op/s (26.64% slower)
                    ✗ dust »   79,428 op/s (76.49% slower)

                      ui-components
                   ✓ marko »   60,110 op/s (fastest)
                   ✗ react »    3,956 op/s (93.42% slower)
```
<!-- </performance> -->

## Compiled Size

Lower numbers are better.

<!-- <size> -->
```
                      COMPILED SIZE (gzipped/uncompressed)
                      ====================================
                      friends
                   ✓ marko »   472 bytes gzipped     920 bytes uncompressed
                                      (smallest)                 (smallest)
                    ✗ dust »   489 bytes gzipped    1387 bytes uncompressed
                                    3.48% larger              33.67% larger
       ✗ hornbill-template »   530 bytes gzipped    1494 bytes uncompressed
                                   10.94% larger              38.42% larger

                      if-expression
                   ✓ marko »   281 bytes gzipped     469 bytes uncompressed
                                      (smallest)                 (smallest)
       ✗ hornbill-template »   350 bytes gzipped     649 bytes uncompressed
                                   19.71% larger              27.73% larger
                    ✗ jade »   388 bytes gzipped    1057 bytes uncompressed
                                   27.58% larger              55.63% larger
                     ✗ pug »   906 bytes gzipped    2147 bytes uncompressed
                                   68.98% larger              78.16% larger

                      projects-escaped
                   ✓ marko »   247 bytes gzipped     379 bytes uncompressed
                                      (smallest)                 (smallest)
                    ✗ dust »   262 bytes gzipped     563 bytes uncompressed
                                    5.73% larger              32.68% larger
      ✗ marko (native-for) »   268 bytes gzipped     407 bytes uncompressed
                                    7.84% larger               6.88% larger
       ✗ hornbill-template »   347 bytes gzipped     716 bytes uncompressed
                                   28.82% larger              47.07% larger
              ✗ handlebars »   553 bytes gzipped    1551 bytes uncompressed
                                   55.33% larger              75.56% larger

                      projects-unescaped
                   ✓ marko »   250 bytes gzipped     382 bytes uncompressed
                                      (smallest)                 (smallest)
                    ✗ dust »   268 bytes gzipped     595 bytes uncompressed
                                    6.72% larger              35.80% larger
      ✗ marko (native-for) »   272 bytes gzipped     410 bytes uncompressed
                                    8.09% larger               6.83% larger
       ✗ hornbill-template »   328 bytes gzipped     613 bytes uncompressed
                                   23.78% larger              37.68% larger
              ✗ handlebars »   530 bytes gzipped    1573 bytes uncompressed
                                   52.83% larger              75.72% larger

                      reverse-helper
                    ✓ dust »   151 bytes gzipped     321 bytes uncompressed
                                      (smallest)              31.78% larger
                   ✗ marko »   167 bytes gzipped     219 bytes uncompressed
                                    9.58% larger                 (smallest)

                      search-results
                   ✓ marko »   542 bytes gzipped    1200 bytes uncompressed
                                      (smallest)                 (smallest)
                    ✗ dust »   545 bytes gzipped    1523 bytes uncompressed
                                    0.55% larger              21.21% larger
       ✗ hornbill-template »   674 bytes gzipped    2340 bytes uncompressed
                                   19.58% larger              48.72% larger

                      simple-1
                   ✓ marko »   389 bytes gzipped     635 bytes uncompressed
                                      (smallest)                 (smallest)
                   ✗ react »   395 bytes gzipped     850 bytes uncompressed
                                    1.52% larger              25.29% larger
                    ✗ dust »   415 bytes gzipped     897 bytes uncompressed
                                    6.27% larger              29.21% larger
       ✗ hornbill-template »   445 bytes gzipped     834 bytes uncompressed
                                   12.58% larger              23.86% larger
                     ✗ dot »   506 bytes gzipped     821 bytes uncompressed
                                   23.12% larger              22.66% larger
                    ✗ jade »   523 bytes gzipped    1124 bytes uncompressed
                                   25.62% larger              43.51% larger
              ✗ handlebars »   617 bytes gzipped    1473 bytes uncompressed
                                   36.95% larger              56.89% larger
                ✗ nunjucks »   634 bytes gzipped    1433 bytes uncompressed
                                   38.64% larger              55.69% larger
                    ✗ swig »   763 bytes gzipped    3707 bytes uncompressed
                                   49.02% larger              82.87% larger
                     ✗ pug »  1052 bytes gzipped    2317 bytes uncompressed
                                   63.02% larger              72.59% larger

                      simple-2
                   ✓ marko »   255 bytes gzipped     484 bytes uncompressed
                                      (smallest)                 (smallest)
                    ✗ dust »   268 bytes gzipped     648 bytes uncompressed
                                    4.85% larger              25.31% larger
       ✗ hornbill-template »   319 bytes gzipped     671 bytes uncompressed
                                   20.06% larger              27.87% larger

                      ui-components
                   ✓ marko »   179 bytes gzipped     219 bytes uncompressed
                                      (smallest)                 (smallest)
                   ✗ react »   204 bytes gzipped     310 bytes uncompressed
                                   12.25% larger              29.35% larger
```
<!-- </size> -->

# Client-side Runtime Sizes

Below are the approximate runtime sizes for each engine (lower numbers are better):

## Marko

| Modules        | Size |
| ------------- |:-------------:| -----:|
| `marko` | ~1.2KB gzipped (2.7KB uncompressed) |
| `marko` +<br>`async-writer` + <br>`raptor-xml/util` | ~2.33KB gzipped (6.3KB uncompressed) |

_NOTE:_ Sizes are approximate because overhead associated with the CommonJS module loader varies. Size based on code as of April 7, 2014.

## Dust

| Modules        | Size |
| ------------- |:-------------:| -----:|
| `dust-core` | 3.41KB gzipped (10.07KB uncompressed) |
| `dust-core` +<br>`dust-helpers` | 4.7KB gzipped (14.2KB uncompressed) |

_NOTE:_ Size based on code as of April 7, 2014.

# Contribute

## Adding a New Comparison Group

Each comparison group should contain a data file (either `data.json` or `data.js`) and a set of templates to compare. The file extension of the template will be used to determine which engine should be used. If the data file has the `.js` extension then it should be a JavaScript module that exports the data. A sample directory structure is shown below:

```
templates
    ├── group1
    │   ├── data.js
    │   ├── template.dust
    │   └── template.marko
    ├── group2
    │   ├── data.json
    │   ├── template.dust
    │   └── template.marko
    ├── group3
    │   ├── data.json
    │   ├── template.dust
    │   ├── template.native-for.marko
    │   └── template.marko
    └── group4
        ├── data.json
        ├── template.dust
        └── template.marko
```

## Adding a New Template Engine

To register a new templating engine, simply create a new module under the `engines` directory and it will automatically be loaded. See existing engine modules for supported methods and properties.

Pull Requests welcome!
