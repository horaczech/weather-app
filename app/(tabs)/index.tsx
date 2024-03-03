import { ScrollView, StyleSheet, useColorScheme } from "react-native";
import { Text } from "@/components/Themed";
import WeatherTable from "@/components/home/WeatherTable";
import globalStyles from "@/constants/globalStyles";
import { useState } from "react";
import SelectLocationModal from "@/components/home/SelectLocationModal";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { useFetchLocationDetail } from "@/api/weather";
import { Feather } from "@expo/vector-icons";
import { Location } from "@/types/api";
import { defaultLocation } from "@/constants/data";
import Pressable from "@/components/Pressable";

export default function HomeScreen() {
  const [openResultsModal, setOpenResultsModal] = useState(false);
  const theme = useColorScheme();
  // defaults to London
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    defaultLocation,
  );

  const { data: weatherData } = useFetchLocationDetail(selectedLocation?.id, {
    enabled: !!selectedLocation?.id,
  });

  const onLocationSelect = (location: any) => {
    setSelectedLocation(location);
  };

  return (
    <BottomSheetModalProvider>
      <ScrollView
        style={globalStyles.f1}
        contentContainerStyle={styles.container}
      >
        <Pressable
          style={[
            styles.currentLocationContainer,
            { backgroundColor: theme === "light" ? "#FFFFFF" : "#07126e" },
          ]}
          onPress={() => setOpenResultsModal(true)}
        >
          <Text style={styles.currentLocationText} numberOfLines={1}>
            {weatherData?.name}
          </Text>
          <Feather
            name="search"
            size={18}
            color={theme === "dark" ? "#FFFFFF" : "#000000"}
          />
        </Pressable>
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
  },
  currentLocationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 30,
    paddingHorizontal: 40,
    maxWidth: "100%",
    paddingVertical: 10,
    borderRadius: 10,
  },
  currentLocationText: {
    fontSize: 20,
    lineHeight: 30,
    marginRight: 10,
  },
});
