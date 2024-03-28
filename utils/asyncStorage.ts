import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncStorageKeys, FavoriteLocation } from "@/types/asyncStorage";

export const getItem = async (key: AsyncStorageKeys) => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {
    return null;
  }
};

export const setItem = async (
  key: AsyncStorageKeys,
  value: string | object,
) => {
  const finalValue = typeof value === "string" ? value : JSON.stringify(value);
  try {
    await AsyncStorage.setItem(key, finalValue);
  } catch (error) {
    return null;
  }
};

export const removeItem = async (key: AsyncStorageKeys) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    return null;
  }
};

export const getFavoriteLocations = async (): Promise<
  FavoriteLocation[] | undefined
> => {
  const favoriteLocations = await getItem(AsyncStorageKeys.Favorites);
  if (favoriteLocations) {
    return JSON.parse(favoriteLocations);
  }
};

export const saveFavoriteLocation = async (location: FavoriteLocation) => {
  const favoriteLocations = await getFavoriteLocations();
  if (favoriteLocations) {
    const newLocations = [...favoriteLocations, location];
    await setItem(AsyncStorageKeys.Favorites, newLocations);
  } else {
    await setItem(AsyncStorageKeys.Favorites, [location]);
  }
};

export const deleteFavoriteLocation = async (location: FavoriteLocation) => {
  const favoriteLocations = await getFavoriteLocations();
  if (favoriteLocations) {
    const newLocations = favoriteLocations.filter(
      (loc) => loc.id !== location.id,
    );
    await setItem(AsyncStorageKeys.Favorites, newLocations);
  }
};

export const saveBulkFavoriteLocations = async (
  locations: FavoriteLocation[],
) => {
  await setItem(AsyncStorageKeys.Favorites, locations);
};
