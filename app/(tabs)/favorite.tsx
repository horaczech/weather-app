import { ScrollView, StyleSheet } from "react-native";
import FavoriteItem from "@/components/favorite/FavoriteItem";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { removeFavorite } from "@/features/favorite/favoriteSlice";

export default function FavoriteScreen() {
  const { favoriteLocations } = useSelector(
    (state: RootState) => state.favorite,
  );

  const dispatch = useDispatch<AppDispatch>();

  return (
    <ScrollView contentContainerStyle={styles.content}>
      {favoriteLocations.map((favoriteLocation) => (
        <FavoriteItem
          key={favoriteLocation.id}
          item={favoriteLocation}
          onRemove={() => dispatch(removeFavorite(favoriteLocation))}
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
