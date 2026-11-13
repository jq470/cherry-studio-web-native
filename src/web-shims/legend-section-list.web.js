// `@legendapp/list/section-list` on web.
//
// The Legend list is driven by native-friendly virtualization and renders no
// rows under react-native-web. This shim provides the small SectionList
// contract the app uses, backed by react-native-web's ScrollView, so rows
// actually mount on the page.
'use strict';

const React = require('react');
const { ScrollView, View } = require('react-native-web');

function WebSectionList(props) {
  const {
    sections,
    renderItem,
    renderSectionHeader,
    ListEmptyComponent,
    ListFooterComponent,
    keyExtractor,
    testID,
    style,
    contentContainerStyle,
  } = props;

  const children = [];
  (sections || []).forEach((section, sectionIndex) => {
    if (renderSectionHeader) {
      children.push(
        React.createElement(
          View,
          { key: `section-${sectionIndex}`, collapsable: false },
          renderSectionHeader({ section }),
        ),
      );
    }
    (section.data || []).forEach((item, itemIndex) => {
      const key = keyExtractor ? keyExtractor(item, itemIndex) : item.id ?? itemIndex;
      children.push(
        React.createElement(
          View,
          { key: `row-${sectionIndex}-${key}`, collapsable: false },
          renderItem({ item, index: itemIndex, section }),
        ),
      );
    });
  });

  if (children.length === 0 && ListEmptyComponent) {
    children.push(React.createElement(View, { key: 'empty' }, ListEmptyComponent));
  }
  if (ListFooterComponent) {
    children.push(React.createElement(View, { key: 'footer' }, ListFooterComponent));
  }

  return React.createElement(
    ScrollView,
    {
      testID,
      style,
      contentContainerStyle,
      showsVerticalScrollIndicator: false,
    },
    children,
  );
}

module.exports = { SectionList: WebSectionList };
module.exports.default = WebSectionList;
