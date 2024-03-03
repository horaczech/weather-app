import {
  ActivityIndicator,
  PixelRatio,
  StyleSheet,
  useColorScheme,
  View,
} from "react-native";
import { Location, LocationSearchRes } from "@/types/api";
import { Text } from "@/components/Themed";
import Pressable from "@/components/Pressable";

interface SearchResultsProps {
  data: LocationSearchRes | undefined;
  isLoading: boolean;
  onSelectLocation: (location: Location) => void;
}

const SearchResults = ({
  data,
  isLoading,
  onSelectLocation,
}: SearchResultsProps) => {
  const theme = useColorScheme();

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : data?._embedded?.location ? (
        data?._embedded?.location.map((searchResult, index, array) => (
          <Pressable
            key={searchResult.id}
            style={[
              styles.searchItem,
              {
                borderBottomColor: theme === "light" ? "#9d9d9d" : "#ffffff",
                borderBottomWidth:
                  index !== array.length - 1
                    ? PixelRatio.roundToNearestPixel(2)
                    : 0,
              },
            ]}
            onPress={() => onSelectLocation(searchResult)}
          >
            <Text style={styles.name}>{searchResult.name}</Text>
            <Text style={styles.region}>{searchResult.region?.name}</Text>
          </Pressable>
        ))
      ) : null}
    </View>
  );
};

export default SearchResults;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 80,
    width: "100%",
  },
  searchItem: {
    minHeight: 60,
    paddingHorizontal: "7.5%",
    justifyContent: "center",
  },
  name: {
    fontSize: 20,
  },
  region: {
    fontSize: 16,
  },
});
