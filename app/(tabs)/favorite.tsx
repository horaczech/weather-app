import { ScrollView, StyleSheet } from "react-native";
import FavoriteItem from "@/components/favorite/FavoriteItem";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import {
  removeFavorite,
  setCurrentLocation,
} from "@/features/favorite/favoriteSlice";
import { FavoriteLocation } from "@/types/asyncStorage";
import { useRouter } from "expo-router";

export default function FavoriteScreen() {
  const { favoriteLocations } = useSelector(
    (state: RootState) => state.favorite,
  );

  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();

  const selectHandler = (location: FavoriteLocation) => {
    dispatch(setCurrentLocation(location));
    router.navigate("./");
  };

  return (
    <ScrollView contentContainerStyle={styles.content}>
      {favoriteLocations.map((favoriteLocation) => (
        <FavoriteItem
          key={favoriteLocation.id}
          item={favoriteLocation}
          onRemove={() => dispatch(removeFavorite(favoriteLocation))}
          onSelect={() => selectHandler(favoriteLocation)}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    marginTop: 30,
  },
});
