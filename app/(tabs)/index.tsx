import { ScrollView, StyleSheet, useColorScheme, View } from "react-native";
import { Text } from "@/components/Themed";
import WeatherTable from "@/components/home/WeatherTable";
import globalStyles from "@/constants/globalStyles";
import { useState } from "react";
import SelectLocationModal from "@/components/home/SelectLocationModal";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { useFetchLocationDetail } from "@/api/weather";
import { Feather, Ionicons } from "@expo/vector-icons";
import { Location } from "@/types/api";
import { defaultLocation } from "@/constants/data";
import Pressable from "@/components/Pressable";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen() {
  const [openResultsModal, setOpenResultsModal] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const theme = useColorScheme();
  // defaults to London
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    defaultLocation,
  );

  const { data: weatherData } = useFetchLocationDetail(selectedLocation?.id, {
    enabled: !!selectedLocation?.id,
  });

  const onLocationSelect = async (location: any) => {
    setSelectedLocation(location);
    try {
      const favoriteLocations =
        await AsyncStorage.getItem("@favoriteLocations");
      const parsedLocations = JSON.parse(favoriteLocations || "[]");
      if (parsedLocations.some(location?.id)) {
        setIsFavorite(true);
      } else {
        setIsFavorite(false);
      }
    } catch {
      //
    }
  };

  const toggleFavorite = async () => {
    try {
      const favoriteLocations =
        await AsyncStorage.getItem("@favoriteLocations");
      const parsedLocations = JSON.parse(favoriteLocations || "[]");

      if (parsedLocations.includes(selectedLocation?.id)) {
        const newLocations = [...parsedLocations].filter((locationId: any) => {
          return locationId !== selectedLocation?.id;
        });

        await AsyncStorage.setItem(
          "@favoriteLocations",
          JSON.stringify(newLocations),
        );
        setIsFavorite(false);
      } else {
        await AsyncStorage.setItem(
          "@favoriteLocations",
          JSON.stringify([...parsedLocations, selectedLocation?.id]),
        );
        setIsFavorite(true);
      }
    } catch (e) {
      //
    }
  };

  return (
    <BottomSheetModalProvider>
      <ScrollView
        style={globalStyles.f1}
        contentContainerStyle={styles.container}
      >
        <View
          style={[
            styles.actionContainer,
            globalStyles.row,
            globalStyles.alignCenter,
            globalStyles.justifySpaceBetween,
          ]}
        >
          <Pressable style={styles.favoriteButton} onPress={toggleFavorite}>
            <Ionicons
              name={isFavorite ? "star" : "star-outline"}
              color={theme === "dark" ? "#c9600f" : "#000000"}
              size={28}
            />
          </Pressable>
          <Text style={styles.currentLocationText} numberOfLines={1}>
            {weatherData?.name}
            {weatherData?.name}
          </Text>
          <Pressable
            style={[
              styles.changeLocationButton,
              { backgroundColor: theme === "light" ? "#FFFFFF" : "#07126e" },
            ]}
            onPress={() => setOpenResultsModal(true)}
          >
            <Feather
              name="edit"
              size={18}
              color={theme === "dark" ? "#FFFFFF" : "#000000"}
            />
          </Pressable>
        </View>
        <WeatherTable location={weatherData} />
      </ScrollView>
      <SelectLocationModal
        isOpen={openResultsModal}
        onClose={() => setOpenResultsModal(false)}
        selectLocation={onLocationSelect}
      />
    </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
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
    marginLeft: "7.5%",
  },
  actionContainer: {
    marginTop: 30,
    marginBottom: 20,
    width: "100%",
  },
  changeLocationButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 35,
    height: 35,
    borderRadius: 10,
    marginRight: 20,
  },
  currentLocationText: {
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 30,
    marginHorizontal: 5,
    maxWidth: "50%",
  },
  favoriteButton: {
    width: 30,
    height: 30,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 20,
  },
});
