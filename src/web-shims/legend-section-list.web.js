// `@legendapp/list/section-list` on web.
//
// The Legend list is driven by native-friendly virtualization and renders no
// rows under react-native-web. react-native-web ships a working SectionList
// with the same public contract, so alias the package to it here.
'use strict';

const { SectionList } = require('react-native-web');

module.exports = { SectionList };
module.exports.default = SectionList;
