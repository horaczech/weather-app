import { StyleSheet, useColorScheme, View } from "react-native";
import { FavoriteLocation } from "@/types/asyncStorage";
import { Text } from "@/components/Themed";
import Pressable from "@/components/Pressable";
import { Ionicons } from "@expo/vector-icons";

interface FavoriteItemProps {
  item: FavoriteLocation;
  onRemove: () => void;
  onSelect: () => void;
}

const FavoriteItem = ({ item, onRemove, onSelect }: FavoriteItemProps) => {
  const theme = useColorScheme();
  return (
    <View
      style={[
        styles.container,
        { borderColor: theme === "light" ? "#000000" : "#FFFFFF" },
      ]}
    >
      <Pressable onPress={onSelect} style={styles.selectContainer}>
        <Text>{item.name}</Text>
      </Pressable>
      <Pressable onPress={onRemove} style={styles.starContainer}>
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
    paddingRight: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectContainer: {
    height: "100%",
    paddingLeft: 20,
    marginRight: 10,
    paddingVertical: 10,
    flex: 1,
  },
  starContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
