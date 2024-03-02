import {
  Pressable as DefaultPressable,
  PressableProps as DefaultPressableProps,
  ViewProps,
} from "react-native";

interface PressableProps
  extends Omit<DefaultPressableProps, "style">,
    Pick<ViewProps, "style"> {
  pressedOpacity?: number;
}

const Pressable = ({
  style,
  pressedOpacity,
  ...otherProps
}: PressableProps) => {
  return (
    <DefaultPressable
      style={({ pressed }) => [
        { opacity: pressed ? pressedOpacity ?? 0.65 : 1 },
        style,
      ]}
      {...otherProps}
    />
  );
};

export default Pressable;
