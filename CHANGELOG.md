# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

* Added Renovate to ensure dependencies stay up to date ([#15](https://github.com/CondeNast/perf-timeline-cli/issues/15))
* Added `page.setViewport` args ([#19](https://github.com/CondeNast/perf-timeline-cli/issues/19))

### Changes

* Pin dependencies via Renovate ([#16](https://github.com/CondeNast/perf-timeline-cli/issues/16))
* Updated `yargs` to 13.1.0 ([#20](https://github.com/CondeNast/perf-timeline-cli/issues/20))

### Fixed

* Fixed Test errors after Jest update ([#14](https://github.com/CondeNast/perf-timeline-cli/issues/14))
* Fixed new lint error after lint config updates ([#14](https://github.com/CondeNast/perf-timeline-cli/issues/14))

### Security

* Updated all packages to resolve `npm audit` and Github Security issues ([#14](https://github.com/CondeNast/perf-timeline-cli/issues/14))

## [0.1.3] - 2018-04-08

### Fixed

* Corrected typo in README.md ([#8](https://github.com/CondeNast/perf-timeline-cli/pull/8))
* Remove spread operator as it causes an error to be thrown for Node 8.2.x and lower
([#10](https://github.com/CondeNast/perf-timeline-cli/issues/10))

## [0.1.2] - 2018-03-26

### Added

* Added badges to communicate project version and dependency status
* Added keywords to package.json

### Fixed

* Use non-relative path for SVG to allow graphic to show on NPM

## [0.1.1] - 2018-03-26

### Fixed

* Updated docs to use package name with namespace for the install command
* Bumped version to publish publicly

## 0.1.0 - 2018-03-25

* Initial release

[Unreleased]: https://github.com/CondeNast/perf-timeline/compare/0.1.3...master
[0.1.3]: https://github.com/CondeNast/perf-timeline/compare/0.1.2...0.1.3
[0.1.2]: https://github.com/CondeNast/perf-timeline/compare/0.1.1...0.1.2
[0.1.1]: https://github.com/CondeNast/perf-timeline/compare/0.1.0...0.1.1
