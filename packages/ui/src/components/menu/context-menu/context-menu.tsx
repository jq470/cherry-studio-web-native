import { Platform, View } from 'react-native';

import type { ContextMenuProps } from '../menu.types';
import { ContextMenu as NativeContextMenu } from './context-menu.android';
import { ContextMenuTrigger } from './context-menu-trigger';

// Metro resolves context-menu.ios.tsx on iOS and context-menu.android.tsx on
// Android. On web the native menu host is a no-op stub that returns null, so
// wrapping message content in it drops the whole subtree. Keep the children
// (and the trigger API) but skip long-press menus on web.
function WebContextMenuRoot({ children }: ContextMenuProps) {
  return <View className="w-full">{children}</View>;
}

export const ContextMenu =
  Platform.OS === 'web'
    ? Object.assign(WebContextMenuRoot, { Trigger: ContextMenuTrigger })
    : NativeContextMenu;
