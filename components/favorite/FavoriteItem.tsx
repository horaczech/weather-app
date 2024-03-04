import { View } from "react-native";
import { FavoriteLocation } from "@/types/asyncStorage";
import { Text } from "@/components/Themed";

interface FavoriteItemProps {
  item: FavoriteLocation;
  onRemove: (item: FavoriteLocation) => void;
}

const FavoriteItem = ({ item, onRemove }: FavoriteItemProps) => {
  return (
    <View>
      <Text>{item.name}</Text>
    </View>
  );
};

export default FavoriteItem;
