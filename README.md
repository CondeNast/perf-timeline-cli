# Perf Timeline

A command line interface for generating Chrome Performance Timelines.

[![license](https://img.shields.io/badge/license-Apache%202.0-blue.svg?style=flat)](LICENSE)

_Proudly built by:_

<a href="https://technology.condenast.com"><img src="https://user-images.githubusercontent.com/1215971/35070721-3f136cdc-fbac-11e7-81b4-e3aa5cc70a17.png" title="Conde Nast Technology" width=350/></a>

## Prerequisites

Perf Timeline requires Node 8+ and a current version of Chrome for use with Puppeteer.

## Install

1. `npm install -g perf-timeline`

## Usage

Generate a performance timeline using defaults

```
perf-timeline generate https://www.wired.com
```

Generate a performance timeline while throttling network

```
perf-timeline generate https://www.wired.com --emulate-network-conditions --latency 150 --upload-throughput 750 --download--throughput 1.6
```

Generate a performance timeline while throttling CPU

```
perf-timeline generate https://www.wired.com --set-cpu-throttling-rate --rate 4
```

Generate a performance timeline with screenshots

```
perf-timeline generate https://www.wired.com --screenshots
```

Generate a performance timeline and save to a custom location

```
perf-timeline generate https://www.wired.com --path ~/my-timeline.json
```

## Thanks

TODO

## Contributors

See the list of [contributors](https://github.com/CondeNast/perf-timeline/contributors) who participated in writing this tool.
