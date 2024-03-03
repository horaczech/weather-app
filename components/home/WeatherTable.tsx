import React, { useMemo } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  useColorScheme,
} from "react-native";
import { Text } from "@/components/Themed";
import { CurrentHour, LocationDetail } from "@/types/api";
import { useFetchDynamicUrl } from "@/api/weather";
import globalStyles from "@/constants/globalStyles";
import { Ionicons } from "@expo/vector-icons";

interface WeatherTableProps {
  location: LocationDetail | undefined;
  isLoading?: boolean;
}

const WeatherTable = ({ location, isLoading }: WeatherTableProps) => {
  const {
    data: currenthourData,
    isLoading: currenthourIsLoading,
    isFetching: currenthourIsFetching,
  } = useFetchDynamicUrl<CurrentHour>(location?._links?.currenthour?.href, {
    enabled: !!location?._links?.currenthour?.href,
  });
  const {
    data: forecastData,
    isLoading: forecastIsLoading,
    isFetching: forecastIsFetching,
  } = useFetchDynamicUrl(location?._links?.forecast?.href, {
    enabled: !!location?._links?.forecast?.href,
  });

  const theme = useColorScheme();

  const isSomeLoading = useMemo(() => {
    return (
      isLoading ||
      currenthourIsLoading ||
      currenthourIsFetching ||
      forecastIsLoading ||
      forecastIsFetching
    );
  }, [
    isLoading,
    currenthourIsLoading,
    currenthourIsFetching,
    forecastIsLoading,
    forecastIsFetching,
  ]);

  if (!location) {
    return null;
  }
  return (
    <View style={styles.container}>
      {isSomeLoading ? (
        <ActivityIndicator />
      ) : (
        <View style={styles.content}>
          {/*<Image*/}
          {/*  style={styles.icon}*/}
          {/*  source={{ uri: `https:${current.condition.icon}` }}*/}
          {/*/>*/}
          <Text style={styles.text}>
            Condition: {currenthourData?.symbolCode?.next1Hour}
          </Text>
          <Text style={styles.text}>
            Location: {location.name}, {location.region?.name},{" "}
            {location.country?.name}
          </Text>
          <Text style={styles.text}>
            Temperature: {currenthourData?.temperature?.value}°C (Feels like:{" "}
            {currenthourData?.temperature?.feelsLike}°C)
          </Text>
          {/*<Text style={styles.text}>Condition: {current.condition.text}</Text>*/}
          <View
            style={[globalStyles.row, globalStyles.alignCenter, styles.wind]}
          >
            <Text style={[styles.text, globalStyles.mt0]}>
              Wind: {currenthourData?.wind?.speed} kph
            </Text>
            <Ionicons
              name="arrow-up"
              size={20}
              color={theme === "light" ? "#0f1ebb" : "#848ac2"}
              style={{
                marginLeft: 10,
                transform: [
                  {
                    rotate: `${
                      (currenthourData?.wind?.direction ?? 0) + 180
                    }deg`,
                  },
                ],
              }}
            />
          </View>
          <Text style={styles.text}>
            Precipitation: {currenthourData?.precipitation.value} mm
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "75%",
  },
  wind: {
    marginTop: 30,
  },
  content: {
    alignItems: "flex-start",
  },
  text: {
    fontSize: 16,
    fontWeight: "500",
    marginTop: 30,
  },
  icon: {
    width: 64,
    height: 64,
    marginTop: 20,
  },
});

export default WeatherTable;
