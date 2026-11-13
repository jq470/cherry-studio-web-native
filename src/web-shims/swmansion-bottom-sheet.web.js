// @swmansion/react-native-bottom-sheet on web.
//
// The package's native host imports Fabric specs at module load and calls
// codegenNativeComponent, which does not exist under react-native-web. The app
// only needs the provider, the modal host and `programmatic`, so this shim
// renders the same children in a plain absolute overlay instead.
'use strict';

const React = require('react');
const { View } = require('react-native-web');

const BottomSheetProvider = (props) => (props && props.children) || null;

function ModalBottomSheet(props) {
  if (!props || props.index === 0) return null;
  return React.createElement(
    View,
    {
      style: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: props.scrimColor || 'rgba(0,0,0,0.35)',
      },
    },
    props.children,
  );
}

const programmatic = (value) => value;

module.exports = {
  BottomSheetProvider,
  ModalBottomSheet,
  programmatic,
  BottomSheetView: View,
  BottomSheetScrollView: View,
};
module.exports.default = module.exports;
