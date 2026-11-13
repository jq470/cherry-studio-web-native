// `@legendapp/list/section-list` on web.
//
// The Legend list is driven by native-friendly virtualization and mounts no
// rows under react-native-web. This shim implements the small SectionList
// contract the app uses with a plain scroll container, so rows actually render.
'use strict';

const React = require('react');

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  minHeight: 0,
  overflowY: 'auto',
  overflowX: 'hidden',
};

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
          'div',
          { key: `section-${sectionIndex}` },
          renderSectionHeader({ section }),
        ),
      );
    }
    (section.data || []).forEach((item, itemIndex) => {
      const key = keyExtractor ? keyExtractor(item, itemIndex) : item.id ?? itemIndex;
      children.push(
        React.createElement(
          'div',
          { key: `row-${sectionIndex}-${key}` },
          renderItem({ item, index: itemIndex, section }),
        ),
      );
    });
  });

  if (children.length === 0 && ListEmptyComponent) {
    children.push(React.createElement('div', { key: 'empty' }, ListEmptyComponent));
  }
  if (ListFooterComponent) {
    children.push(React.createElement('div', { key: 'footer' }, ListFooterComponent));
  }

  return React.createElement(
    'div',
    {
      'data-testid': testID,
      style: { ...containerStyle, ...(style || {}), ...(contentContainerStyle || {}) },
    },
    children,
  );
}

module.exports = { SectionList: WebSectionList };
module.exports.default = WebSectionList;
