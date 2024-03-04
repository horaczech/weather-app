import { StyleSheet, useColorScheme, View } from "react-native";
import { FavoriteLocation } from "@/types/asyncStorage";
import { Text } from "@/components/Themed";
import Pressable from "@/components/Pressable";
import { Ionicons } from "@expo/vector-icons";

interface FavoriteItemProps {
  item: FavoriteLocation;
  onRemove: () => void;
}

const FavoriteItem = ({ item, onRemove }: FavoriteItemProps) => {
  const theme = useColorScheme();
  return (
    <View
      style={[
        styles.container,
        { borderColor: theme === "light" ? "#000000" : "#FFFFFF" },
      ]}
    >
      <Text>{item.name}</Text>
      <Pressable onPress={onRemove}>
        <Ionicons name="star" color="#c9600f" size={20} />
      </Pressable>
    </View>
  );
};

export default FavoriteItem;

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 20,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
