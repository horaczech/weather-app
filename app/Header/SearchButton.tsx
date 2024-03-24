import Ionicons from "@expo/vector-icons/Ionicons";
import Pressable from "@/components/Pressable";
import React from "react";
import { StyleSheet, useColorScheme } from "react-native";
import { Link } from "expo-router";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store";
import { setShowSelectLocationModal } from "@/features/favorite/favoriteSlice";

const SearchButton = () => {
  const theme = useColorScheme();
  const dispatch = useDispatch<AppDispatch>();

  return (
    <Link
      href={{
        pathname: "./",
      }}
      asChild
    >
      <Pressable
        style={styles.button}
        onPress={() => dispatch(setShowSelectLocationModal(true))}
      >
        <Ionicons
          name="search"
          size={22}
          color={theme === "light" ? "#000" : "#FFF"}
        />
      </Pressable>
    </Link>
  );
};

export default SearchButton;

const styles = StyleSheet.create({
  button: {
    padding: 10,
  },
});
