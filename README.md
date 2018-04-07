# Perf Timeline CLI

A command line interface for generating Chrome Performance timelines.

[![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg?style=flat)](LICENSE)
![GitHub package version](https://img.shields.io/github/package-json/v/condenast/perf-timeline-cli.svg)
[![Build status](https://travis-ci.org/CondeNast/perf-timeline-cli.svg?branch=master)](https://travis-ci.org/CondeNast/perf-timeline-cli)
[![Coverage status](https://coveralls.io/repos/github/CondeNast/perf-timeline-cli/badge.svg?branch=master)](https://coveralls.io/github/CondeNast/perf-timeline-cli?branch=master)
![Dependencies](https://img.shields.io/david/condenast/perf-timeline-cli.svg)
![Dev Dependencies](https://img.shields.io/david/dev/condenast/perf-timeline-cli.svg)

_Proudly built by:_

<a href="https://technology.condenast.com"><img src="https://user-images.githubusercontent.com/1215971/35070721-3f136cdc-fbac-11e7-81b4-e3aa5cc70a17.png" title="Conde Nast Technology" width=350/></a>

## Demo

Generate a timeline, see how many [Layout](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/render-tree-construction)
events occurred, and get the total JavaScript execution time using [Big Rig](https://github.com/googlearchive/node-big-rig).

![Command line demo SVG](https://cdn.rawgit.com/CondeNast/perf-timeline-cli/master/.project/perf-timeline.svg)

## Motivations

Chrome DevTools' Performance panel is an industry standard for creating page load timelines to
understand how a website renders. As nice as it is to be able to click a few buttons to generate a
timeline, creating a Performance timeline from the command line extends the functionality to fit
different workflows.

Prior to building this tool, I struggled with a few issues when generating timelines from the Chrome
DevTools Performance panel.

1. The UI is sometimes slow and unresponsive, especially when debugging sites with high CPU usage.
1. Due to the way that some sites are constructed, it is hard to get a "clean" timeline. If you load
a page, then hit the "Start profiling and reload page" button, your timeline often includes trace
events for the unloading of the current page.
1. It is not possible to programmatically generate timelines. For instance, when trying to find a
performance regression, you may want to generate a timeline for the last 10 builds of a project.
This task requires a lot of extra UI steps within DevTools.

Perf Timeline attempts to improve the developer experience by providing a fast interface to generate
clean Performance timelines.

## Prerequisites

Perf Timeline CLI requires Node 8+ and a current version of Chrome to view generated timelines.

## Install

```
npm install -g @condenast/perf-timeline-cli
```

## Usage

Generate a Performance timeline using defaults

```
perf-timeline generate https://www.wired.com
```

Generate a Performance timeline while throttling network

```
perf-timeline generate https://www.wired.com \
  --emulate-network-conditions \
  --latency 150 \
  --upload-throughput 0.75 \
  --download--throughput 1.6
```

Generate a Performance timeline while throttling CPU

```
perf-timeline generate https://www.wired.com \
  --set-cpu-throttling-rate \
  --rate 4
```

Generate a Performance timeline with screenshots

```
perf-timeline generate https://www.wired.com \
  --screenshots
```

Generate a Performance timeline and save to a custom location

```
perf-timeline generate https://www.wired.com \
  --path ~/my-timeline.json
```

## Commands

## `generate`

`generate` creates a Performance timeline for the URL passed to the command. The timeline is saved
as `trace.json` in the current directory. The timeline conditions can be adjusted using the
arguments documented below.

### Positional

* `url` (required; no default) - URL used to generate the Performance timeline

### Launch Options

Launch options are passed to the `puppeteer.launch()` command. Not all options are currently
supported. Supported options are listed below. For more information, please see the [Puppeteer
Documentation](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#puppeteerlaunchoptions).

* `--ignore-https-errors` (optional; `false`) - When `--ignore-https-errors` is passed, an HTTPS
errors will be ignored. This causes Chrome's default error behaviors when encountering HTTPS issues
to be ignored.
* `--headless` (optional; `true`) - By default, Perf Timeline CLI runs in "[headless](https://developers.google.com/web/updates/2017/04/headless-chrome)" mode (i.e., without a visible
browser UI). To see a browser UI when generating the timeline, pass the `--headless false` to the
`generate` command. Please note that `--no-headless` is a synonym for `--headless false`.
* `--executable-path` (optional; `null`) - Define a path to run a specific Chrome or Chromium
executable. By default, the bundled Chromium, which is the optimal executable for Puppeteer will be
used to generate the timeline. If you prefer a specific executable, you can define the path to the
file here.
* `--slow-mo` (optional; `0`) - Number of milliseconds to slow down the Puppeteer steps. This adds
a timeout between Puppeteer steps and is primary used for debugging to allow you to make
observations between steps. Please note that this could potentially cause inaccurate timelines to be
generated.
* `--args` (options; `''`) - Additional flag arguments that can be passed to the browser instance
when starting it. There are a [number of flags](https://peter.sh/experiments/chromium-command-line-switches/)
that can be passed. The flags should be passed as a comma separated list, e.g.,
`--args="--disable-gpu,--video-threads=5"`. Due to the sheer volume of possible flags, not all can
be verified. Your mileage may vary.

### Network Emulation Options

The Network Emulation Options allow you to generate a Performance timeline under specified network
conditions. To turn on network emulation, you must pass the `--emulate-network-conditions` flag
along with additional configuration options. These options mirror Chrome Headless' [`emulateNetworkConditions` arguments](https://chromedevtools.github.io/devtools-protocol/tot/Network#method-emulateNetworkConditions).
All options are supported. Note that some arguments have been augmented for the CLI use case to
improve the product experience (e.g., throughout arguments us megabits per second instead of bytes
per second).

* `--emulate-network-conditions` (optional; `false`) - In order to set network conditions for a
timeline generation session, you must pass the `--emulate-network-conditions` flag. This flag
allows the other Network Emulation Options to be respected. They will be completely ignored unless
this flag is set.
* `--offline` (optional; `false`) - Passing the `--offline` flag to the `generate` command emulate
a network disconnect.
* `--latency` (optional; `0`) - Artificial, minimum latency between request sent and response header
received expressed in milliseconds (ms).
* `--download-throughput` (optional: `-1`) - The maximum download speed in megabits per second. Note
Chrome Headless' version of this argument uses bytes per second. Perf Timeline CLI uses megabits per
second as that is a more common measure of network throughput. `-1` disables throttling.
* `--upload-throughput` (optional: `-1`) - The maximum upload speed in megabits per second. Note
Chrome Headless' version of this argument uses bytes per second. Perf Timeline CLI uses megabits per
second as that is a more common measure of network throughput.`-1` disables throttling.
* `--connection-type` (optional: `none`) - A label of the supposed underlying network connection
type that the browser is using. Supported values are documented under Chrome Headless'
[`ConnectType` documentation](https://chromedevtools.github.io/devtools-protocol/tot/Network#type-ConnectionType).

### Set CPU Throttling Rate Options

The Set CPU Throttling Rate Emulation Options allow you to generate a Performance timeline under
specified CPU conditions. To turn on CPU emulation, you must pass the `--set-cpu-throttling-rate`
flag along with additional configuration options. These options mirror Chrome Headless'
[`setCPUThrottlingRate` arguments](https://chromedevtools.github.io/devtools-protocol/tot/Emulation#method-setCPUThrottlingRate).
All options are supported.

* `--set-cpu-throttling-rate` (optional; `false`) - In order to set network conditions for a
timeline generation session, you must pass the `--set-cpu-throttling-rate` flag. This flag
allows the other Set CPU Throttling Rate Options to be respected. They will be completely ignored
unless this flag is set.
* `--rate` (optional; `1`) - Sets the CPU throttling rate. The number represents the slowdown
factor (e.g., 2 is a "2x" slowdown).

### Goto Options

The Goto Options mirror the `page.goto()` method's options from Puppeteer. These options allow you
to configure how the page navigation is handled. All options are currently supported. Note that the
`url` option for `page.goto` is provided by the `url`, positional argument passed to `generate`. You
cannot override that option here. See the [`page.goto` documentation](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#pagegotourl-options) for more
details.

* `--timeout` (optional; `30`) - Maximum time in seconds to load the page until the timeline
generation is stopped. Note that if you emulate the network or CPU, or if you set later
`--wait-until` values, you should increase `--timeout` to improve the chances of successfully
generating a timeline.
* `--wait-until` (optional; `load`) - The success event for the navigation. Puppeteer "waits until"
this event has occurred to finish the timeline. `load`, `domcontentloaded`, `networkidle0`, and
`networkidle2` are supported. Note that `--timeout` takes precedence over `--wait-until`. If the
`--wait-until` event has not occurred before the `--timeout` time is reached, an error is thrown and
no timeline will be generated.

### Tracing Options

The Tracing Options allow to you configure the options for Puppeteer's `page.tracing.start()`
method. All options are supported. See the [`page.tracing.start` documentation](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#tracingstartoptions) for more
details.

* `--path` (optional; `./trace.json`) - The file path for where to save the trace.
* `--screenshots` (optional; `false`) - Passing the `--screenshots` flag causes Chrome to take
screenshots of the page as the timeline is generated. These screenshots are embedded in the tracing
file and are shown in DevTools when viewing the Performance timeline.
* `--categories` (optional; `[]`) - The list of trace event categories to capture in the timeline.
This argument is passed as a comma separated list of categories. This option is useful if you wish
to reduce the overall size of the trace file. Note that limiting to certain categories only can
leave you with a timeline that does not appear to show anything when viewing in DevTools'
Performance panel. The best way to see the possible categories is to view a raw trace and look for
the `cat` value of events.

## Thanks

This project is built on the shoulders of giants. It's nothing more than a convenience wrapper
around some really exciting projects, including:

* [Puppeteer](https://github.com/GoogleChrome/puppeteer)
* [Chrome Headless](https://developers.google.com/web/updates/2017/04/headless-chrome)
* [Chrome DevTools](https://github.com/ChromeDevTools/devtools-frontend)
* [Yargs](https://github.com/yargs/yargs)

## Contributors

See the list of [contributors](https://github.com/CondeNast/perf-timeline/contributors) who
participated in writing this tool.
