import {
  Pressable as DefaultPressable,
  PressableProps as DefaultPressableProps,
  View,
  ViewProps,
} from "react-native";
import { forwardRef } from "react";

export interface PressableProps
  extends Omit<DefaultPressableProps, "style">,
    Pick<ViewProps, "style"> {
  pressedOpacity?: number;
}

const Pressable1 = forwardRef<View, PressableProps>(
  ({ style, pressedOpacity, ...otherProps }, ref) => {
    return (
      <DefaultPressable
        ref={ref}
        style={({ pressed }) => [
          { opacity: pressed ? pressedOpacity ?? 0.65 : 1 },
          style,
        ]}
        {...otherProps}
      />
    );
  },
);

export default Pressable1;
