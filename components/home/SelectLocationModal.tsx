import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import LocationSelector from "@/components/home/LocationSelector";
import { useForm } from "react-hook-form";
import { LocationForm } from "@/types/forms";
import { useFetchSearchLocation } from "@/api/weather";
import { StyleSheet, useColorScheme } from "react-native";
import SearchResults from "@/components/home/SearchResults";
import { debounce } from "@/utils/debounce";
import { Location } from "@/types/api";

interface SelectLocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectLocation: (location: any) => void;
}

const SelectLocationModal = ({
  isOpen,
  onClose,
  selectLocation,
}: SelectLocationModalProps) => {
  const snapPoints = useMemo(() => ["95%"], []);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const theme = useColorScheme();
  const { control, watch, setValue } = useForm<LocationForm>();
  const [searchQuery, setSearchQuery] = useState("");

  const searchText = watch("searchText");
  const handleQueryChange = useCallback(
    debounce((newSearchText) => setSearchQuery(newSearchText), 300),
    [setSearchQuery],
  );

  useEffect(() => {
    handleQueryChange(searchText);
  }, [searchText, handleQueryChange]);

  const {
    data: searchData,
    isLoading,
    isFetching,
  } = useFetchSearchLocation(
    {
      text: searchQuery,
    },
    {
      enabled: !!searchQuery,
    },
  );

  useEffect(() => {
    if (isOpen) {
      bottomSheetModalRef.current?.present();
    } else {
      bottomSheetModalRef.current?.dismiss();
    }
  }, [isOpen]);

  const onDismiss = () => {
    onClose();
  };

  const onSelect = (location: Location) => {
    selectLocation(location);
    onClose();
    setValue("searchText", "");
  };

  return (
    <BottomSheetModal
      snapPoints={snapPoints}
      index={0}
      ref={bottomSheetModalRef}
      enableDismissOnClose
      onDismiss={onDismiss}
      backdropComponent={BottomSheetBackdrop}
      backgroundStyle={{
        backgroundColor: theme === "light" ? "#ffffff" : "#0e0e0e",
      }}
      handleIndicatorStyle={{
        backgroundColor: theme === "light" ? "#000000" : "#a4a4a4",
      }}
    >
      <BottomSheetView style={styles.container}>
        <LocationSelector control={control} inputValue={searchText} />
        <SearchResults
          data={searchData}
          isLoading={isLoading || isFetching}
          onSelectLocation={onSelect}
        />
      </BottomSheetView>
    </BottomSheetModal>
  );
};

export default SelectLocationModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});
