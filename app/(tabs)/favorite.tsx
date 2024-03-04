import { ScrollView, StyleSheet, View } from "react-native";
import FavoriteItem from "@/components/favorite/FavoriteItem";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import {
  removeFavorite,
  setCurrentLocation,
} from "@/features/favorite/favoriteSlice";
import { FavoriteLocation } from "@/types/asyncStorage";
import { Link, useRouter } from "expo-router";
import { Text } from "@/components/Themed";
import Pressable from "@/components/Pressable";
import { blueColor } from "@/constants/Colors";

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
      {favoriteLocations?.length ? (
        favoriteLocations.map((favoriteLocation) => (
          <FavoriteItem
            key={favoriteLocation.id}
            item={favoriteLocation}
            onRemove={() => dispatch(removeFavorite(favoriteLocation))}
            onSelect={() => selectHandler(favoriteLocation)}
          />
        ))
      ) : (
        <View style={styles.noItemsContainer}>
          <Text style={styles.noItemsText}>No Favorite Items</Text>
          <Link href="./" asChild>
            <Pressable style={styles.homeButton}>
              <Text style={styles.homeText}>Home</Text>
            </Pressable>
          </Link>
        </View>
      )}
    </ScrollView>
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
  noItemsContainer: {},
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
