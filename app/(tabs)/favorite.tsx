import { ScrollView, StyleSheet } from "react-native";

import { useEffect, useState } from "react";
import {
  deleteFavoriteLocation,
  getFavoriteLocations,
} from "@/utils/asyncStorage";
import { FavoriteLocation } from "@/types/asyncStorage";
import FavoriteItem from "@/components/favorite/FavoriteItem";

export default function FavoriteScreen() {
  const [favorites, setFavorites] = useState<FavoriteLocation[]>([]);

  const removeFavorite = async (favorite: FavoriteLocation) => {
    const newFavorites = favorites.filter((f) => f.id !== favorite.id);
    setFavorites(newFavorites);
    await deleteFavoriteLocation(favorite);
  };

  useEffect(() => {
    (async () => {
      const savedFavorites = await getFavoriteLocations();
      if (savedFavorites) {
        setFavorites(savedFavorites);
      }
    })();
  }, []);

  return (
    <ScrollView>
      {favorites.map((favoriteLocation) => (
        <FavoriteItem
          key={favoriteLocation.id}
          item={favoriteLocation}
          onRemove={removeFavorite}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
