import { Platform, StyleSheet, View } from "react-native";
import FavoriteItem from "@/components/favorite/FavoriteItem";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import {
  removeFavorite,
  reorderFavorites,
  setCurrentLocation,
} from "@/features/favorite/favoriteSlice";
import { FavoriteLocation } from "@/types/asyncStorage";
import { Link, useRouter } from "expo-router";
import { Text } from "@/components/Themed";
import Pressable from "@/components/Pressable";
import { blueColor } from "@/constants/Colors";
import DragList, { DragListRenderItemInfo } from "react-native-draglist";
import globalStyles from "@/constants/globalStyles";
import { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// TODO: fix drag position for iOS
export default function FavoriteScreen() {
  const insets = useSafeAreaInsets();
  const draggableOffset = insets.top + (Platform.OS === "ios" ? 40 : 55);

  const { favoriteLocations } = useSelector(
    (state: RootState) => state.favorite,
  );
  const [currentLocations, setCurrentLocations] = useState<FavoriteLocation[]>(
    [],
  );

  useEffect(() => {
    if (!currentLocations && favoriteLocations) {
      setCurrentLocations(favoriteLocations);
    }
  }, [currentLocations, favoriteLocations]);

  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();

  const selectHandler = (location: FavoriteLocation) => {
    dispatch(setCurrentLocation(location));
    router.navigate("./");
  };

  const keyExtractor = (item: FavoriteLocation) => item.id;

  const renderItem = (info: DragListRenderItemInfo<FavoriteLocation>) => {
    const { item, onDragStart, onDragEnd, isActive } = info;

    return (
      <View>
        <FavoriteItem
          key={item.id}
          item={item}
          onRemove={() => dispatch(removeFavorite(item))}
          onSelect={() => selectHandler(item)}
          onPressIn={onDragStart}
          onPressOut={onDragEnd}
          isDragging={isActive}
        />
      </View>
    );
  };

  const onReordered = async (fromIndex: number, toIndex: number) => {
    const copy = [...favoriteLocations];
    const removed = copy.splice(fromIndex, 1);

    copy.splice(toIndex, 0, removed[0]);
    setCurrentLocations(copy);
    dispatch(reorderFavorites(copy));
  };

  if (!favoriteLocations?.length) {
    return (
      <View style={styles.noItemsContainer}>
        <Text style={styles.noItemsText}>No Favorite Items</Text>
        <Link href="./" asChild>
          <Pressable style={styles.homeButton}>
            <Text style={styles.homeText}>Home</Text>
          </Pressable>
        </Link>
      </View>
    );
  }

  return (
    <DragList
      containerStyle={[globalStyles.f1, { marginTop: -draggableOffset }]}
      contentContainerStyle={[globalStyles.f1, { paddingTop: draggableOffset }]}
      data={favoriteLocations}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      onReordered={onReordered}
    />
  );
}

const styles = StyleSheet.create({
  content: {
    marginTop: 30,
  },
  noItemsText: {
    fontSize: 18,
    textAlign: "center",
  },
  noItemsContainer: {
    flex: 1,
    justifyContent: "center",
  },
  homeButton: {
    marginTop: 20,
    backgroundColor: blueColor,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    width: 120,
    marginLeft: "auto",
    marginRight: "auto",
  },
  homeText: {
    fontSize: 20,
  },
});
