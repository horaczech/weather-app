import { LocationDetail } from "@/types/api";
import { Dimensions, ScrollView } from "react-native";
import WeatherTable from "@/components/home/WeatherTable";
import { useRef } from "react";
import WeatherForecast from "@/components/home/WeatherForecast";

interface HomeContentProps {
  location: LocationDetail | undefined;
  isLoading?: boolean;
}

const HomeContent = ({ location }: HomeContentProps) => {
  const scrollRef = useRef<ScrollView>(null);

  const onNextSlide = (direction: "right" | "left") => {
    scrollRef.current?.scrollTo({
      x: direction === "right" ? Dimensions.get("window").width : 0,
      animated: true,
    });
  };

  return (
    <ScrollView
      ref={scrollRef}
      showsHorizontalScrollIndicator={false}
      horizontal
      snapToInterval={Dimensions.get("window").width}
    >
      <WeatherTable
        location={location}
        onNextSlide={() => onNextSlide("right")}
      />
      <WeatherForecast
        location={location}
        onNextSlide={() => onNextSlide("left")}
      />
    </ScrollView>
  );
};

export default HomeContent;
