import { Text } from "@/components/Themed";
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  useColorScheme,
  View,
} from "react-native";
import { useFetchDynamicUrl } from "@/api/weather";
import { Forecast, LocationDetail } from "@/types/api";
import React, { useMemo } from "react";
import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import weekday from "dayjs/plugin/weekday";
import { DATE_FORMAT, dayNames } from "@/constants/dateFormats";
import Pressable from "@/components/Pressable";
import Octicons from "@expo/vector-icons/Octicons";
import Colors from "@/constants/Colors";

dayjs.extend(isToday);
dayjs.extend(weekday);

interface WeatherForecastProps {
  location: LocationDetail | undefined;
  onNextSlide: () => void;
}

const WeatherForecast = ({ location, onNextSlide }: WeatherForecastProps) => {
  const theme = useColorScheme();
  const {
    data: forecastData,
    isLoading: forecastIsLoading,
    isFetching: forecastIsFetching,
  } = useFetchDynamicUrl<Forecast>(location?._links?.forecast?.href, {
    enabled: !!location?._links?.forecast?.href,
  });

  const isSomeLoading = useMemo(() => {
    return forecastIsLoading || forecastIsFetching;
  }, [forecastIsLoading, forecastIsFetching]);

  const dayName = (date: string) => {
    if (dayjs(date).isToday()) {
      return "Today";
    }
    return dayNames[dayjs(date).weekday()];
  };

  if (!location) {
    return null;
  }

  return (
    <View style={styles.container}>
      {isSomeLoading ? (
        <ActivityIndicator />
      ) : (
        <View style={styles.content}>
          {forecastData?.dayIntervals?.map((forecast, index) => (
            <View
              key={index}
              style={[
                styles.dayContainer,
                { borderColor: Colors[theme ?? "light"].text },
              ]}
            >
              <Text style={styles.text}>
                {dayjs(forecast.start).format(DATE_FORMAT)} (
                {dayName(forecast.start)})
              </Text>
              <Text
                style={[
                  styles.subText,
                  { color: theme === "light" ? "#8a4305" : "#d08b71" },
                ]}
              >
                {forecast.temperature?.max}°C / {forecast.temperature?.min}°C
              </Text>
              <Text
                style={[
                  styles.subText,
                  { color: theme === "light" ? "#0A56B9FF" : "#86a2c0" },
                ]}
              >
                {forecast.precipitation.value} mm
              </Text>
              <Text
                style={[
                  styles.subText,
                  { color: theme === "light" ? "#2d2d2d" : "#b6b6b6" },
                ]}
              >
                {Math.round(forecast.wind.min)} kph /{" "}
                {Math.round(forecast.wind.max)} kph
              </Text>
            </View>
          ))}
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
        <Octicons name="chevron-left" color={Colors.dark.text} size={26} />
      </Pressable>
    </View>
  );
};

export default WeatherForecast;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: Dimensions.get("window").width,
  },
  content: {
    alignItems: "flex-start",
    width: "100%",
  },
  nextSlide: {
    position: "absolute",
    left: 0,
    top: 100,
    height: 100,
    justifyContent: "center",
    padding: 10,
    paddingRight: 12,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 2,
  },
  subText: {
    fontSize: 16,
    lineHeight: 20,
  },
  dayContainer: {
    width: "100%",
    borderBottomWidth: 1,
    justifyContent: "center",
    height: 105,
    paddingHorizontal: Dimensions.get("window").width * 0.125,
  },
});
