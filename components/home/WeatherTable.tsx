import React, { useMemo } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  useColorScheme,
  Dimensions,
} from "react-native";
import { Text } from "@/components/Themed";
import { CurrentHour, LocationDetail } from "@/types/api";
import { useFetchDynamicUrl } from "@/api/weather";
import globalStyles from "@/constants/globalStyles";
import { Ionicons } from "@expo/vector-icons";
import Pressable from "@/components/Pressable";
import Octicons from "@expo/vector-icons/Octicons";
import Colors from "@/constants/Colors";

interface WeatherTableProps {
  location: LocationDetail | undefined;
  onNextSlide: () => void;
}

const WeatherTable = ({ location, onNextSlide }: WeatherTableProps) => {
  const {
    data: currenthourData,
    isLoading: currenthourIsLoading,
    isFetching: currenthourIsFetching,
  } = useFetchDynamicUrl<CurrentHour>(location?._links?.currenthour?.href, {
    enabled: !!location?._links?.currenthour?.href,
  });

  const theme = useColorScheme();

  const isSomeLoading = useMemo(() => {
    return currenthourIsLoading || currenthourIsFetching;
  }, [currenthourIsLoading, currenthourIsFetching]);

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
      <Pressable
        style={[
          styles.nextSlide,
          {
            backgroundColor:
              theme === "light"
                ? `rgba(20, 20, 20, 0.3)`
                : `rgba(255, 255, 255, 0.1)`,
          },
        ]}
        onPress={onNextSlide}
      >
        <Octicons name="chevron-right" color={Colors.dark.text} size={26} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: Dimensions.get("window").width * 0.125,
    width: Dimensions.get("window").width,
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
  nextSlide: {
    position: "absolute",
    right: 0,
    top: 100,
    height: 100,
    justifyContent: "center",
    padding: 10,
    paddingRight: 12,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
});

export default WeatherTable;
