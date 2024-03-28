import { StyleSheet, useColorScheme } from "react-native";
import { FavoriteLocation } from "@/types/asyncStorage";
import { Text } from "@/components/Themed";
import Pressable, { PressableProps } from "@/components/Pressable";
import Octicons from "@expo/vector-icons/Octicons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { memo, useEffect } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Colors from "@/constants/Colors";

interface FavoriteItemProps {
  item: FavoriteLocation;
  onRemove: () => void;
  onSelect: () => void;
  onPressIn?: PressableProps["onPressIn"];
  onPressOut?: PressableProps["onPressOut"];
  isDragging?: boolean;
}

const draggingAnimationDuration = 100;

const FavoriteItem = memo(
  ({
    item,
    onRemove,
    onSelect,
    onPressIn,
    onPressOut,
    isDragging,
  }: FavoriteItemProps) => {
    const theme = useColorScheme();
    const scaleAnimation = useSharedValue(0);
    const backgroundColorOpacity = useSharedValue(0);

    const scaleHandler = (isActive?: boolean) => {
      "worklet";

      scaleAnimation.value = withTiming(isActive ? 1.03 : 1, {
        duration: draggingAnimationDuration,
      });

      backgroundColorOpacity.value = withTiming(isActive ? 0.1 : 0, {
        duration: draggingAnimationDuration,
      });
    };

    useEffect(() => {
      scaleHandler(isDragging);
    }, [isDragging]);

    const containerAnimationStyle = useAnimatedStyle(
      () => ({
        transform: [{ scale: scaleAnimation.value }],
        backgroundColor: `rgba(255, 255, 255, ${backgroundColorOpacity.value})`,
      }),
      [scaleAnimation, backgroundColorOpacity],
    );

    return (
      <Animated.View
        style={[
          styles.container,
          { borderColor: theme === "light" ? "#000000" : "#FFFFFF" },
          containerAnimationStyle,
        ]}
      >
        <Pressable
          onPressIn={onPressIn}
          onPressOut={onPressOut}
          style={styles.reorderButton}
        >
          <Ionicons
            name="reorder-two"
            size={22}
            color={Colors[theme ?? "light"].text}
          />
        </Pressable>
        <Pressable onPress={onSelect} style={styles.selectContainer}>
          <Text style={styles.name}>{item.name}</Text>
        </Pressable>
        <Pressable onPress={onRemove} style={styles.starContainer}>
          <Octicons name="star-fill" color="#c9600f" size={20} />
        </Pressable>
      </Animated.View>
    );
  },
);

export default FavoriteItem;

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    paddingRight: 20,
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    transformOrigin: "center",
  },
  reorderButton: {
    paddingLeft: 10,
    width: 52,
    height: "100%",
    justifyContent: "center",
  },
  selectContainer: {
    justifyContent: "center",
    paddingLeft: 5,
    alignSelf: "stretch",
    marginRight: "auto",
    minWidth: 120,
    flex: 1,
  },
  starContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
  },
});
