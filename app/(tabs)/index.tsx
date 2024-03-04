import { ScrollView, StyleSheet, View } from "react-native";
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

import {
  deleteFavoriteLocation,
  saveFavoriteLocation,
} from "@/utils/asyncStorage";

export default function HomeScreen() {
  const [openResultsModal, setOpenResultsModal] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  // defaults to London
  const [selectedLocation, setSelectedLocation] =
    useState<Location>(defaultLocation);

  const { data: weatherData } = useFetchLocationDetail(selectedLocation?.id, {
    enabled: !!selectedLocation?.id,
  });

  const onLocationSelect = async (location: any) => {
    setSelectedLocation(location);
  };

  const toggleFavorite = async () => {
    if (isFavorite) {
      setIsFavorite(false);
      await deleteFavoriteLocation(selectedLocation);
    } else {
      setIsFavorite(true);
      await saveFavoriteLocation(selectedLocation);
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
              color="#c9600f"
              size={28}
            />
          </Pressable>
          <Text style={styles.currentLocationText} numberOfLines={1}>
            {weatherData?.name}
          </Text>
          <Pressable
            style={styles.changeLocationButton}
            onPress={() => setOpenResultsModal(true)}
          >
            <Feather name="edit" size={18} color="#FFFFFF" />
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
    backgroundColor: "#07126e",
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
