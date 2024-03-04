import { Pressable, StyleSheet, useColorScheme, View } from "react-native";
import { ModalTextInput } from "@/components/Themed";
import { useEffect } from "react";
import globalStyles from "@/constants/globalStyles";
import { Feather } from "@expo/vector-icons";
import { Controller } from "react-hook-form";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

interface LocationSelectorProps {
  control: any;
  inputValue: string;
}

const LocationSelector = ({ control, inputValue }: LocationSelectorProps) => {
  const theme = useColorScheme();

  const scaleAnimation = useSharedValue(0);

  const scaleHandler = (show: boolean) => {
    "worklet";
    scaleAnimation.value = withSpring(show ? 1 : 0, {
      duration: 250,
    });
  };

  useEffect(() => {
    scaleHandler(!!inputValue);
  }, [scaleHandler, inputValue]);

  const cancelButtonStyle = useAnimatedStyle(
    () => ({
      transform: [{ scale: scaleAnimation.value }],
      position: "absolute",
      right: 10,
      top: 12,
    }),
    [scaleAnimation],
  );

  return (
    <View style={styles.container}>
      <View style={[globalStyles.row, globalStyles.f1]}>
        <Controller
          render={({ field: { onChange, value } }) => (
            <ModalTextInput
              value={value}
              onChangeText={onChange}
              darkColor="#1a1a1a"
              lightColor="#ffffff"
              style={styles.input}
              placeholder="Search for location"
              autoFocus
            />
          )}
          name="searchText"
          control={control}
        />
        <Controller
          render={({ field: { onChange } }) => (
            <Animated.View
              style={[cancelButtonStyle, { transformOrigin: "center" }]}
            >
              <Pressable
                style={({ pressed }) => [
                  styles.cancelButton,
                  {
                    opacity: pressed ? 0.6 : 1,
                    backgroundColor:
                      theme === "light" ? "#EAEAEAFF" : "#00008B",
                  },
                ]}
                onPress={() => onChange("")}
              >
                <Feather
                  name="x"
                  color={theme === "light" ? "#000000" : "#ffffff"}
                  size={20}
                />
              </Pressable>
            </Animated.View>
          )}
          name="searchText"
          control={control}
        />
      </View>
    </View>
  );
};

export default LocationSelector;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    width: "85%",
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    height: 54,
    fontSize: 20,
    paddingHorizontal: 15,
    flex: 1,
  },
  submitButton: {
    backgroundColor: "#00008B",
    borderRadius: 10,
    marginTop: 2,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    flexShrink: 0,
    marginLeft: 10,
  },
  cancelButton: {
    borderRadius: 10,
    height: 30,
    width: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "500",
    textAlign: "center",
    fontSize: 16,
  },
});
