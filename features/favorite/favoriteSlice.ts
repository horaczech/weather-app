import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FavoriteLocation } from "@/types/asyncStorage";
import {
  deleteFavoriteLocation,
  getFavoriteLocations,
  saveFavoriteLocation,
} from "@/utils/asyncStorage";
import { Location } from "@/types/api";
import { defaultLocation } from "@/constants/data";

export interface FavoriteState {
  favoriteLocations: FavoriteLocation[];
  currentLocation: Pick<Location, "id" | "name">;
  showSelectLocationModal: boolean;
}

const initialState: FavoriteState = {
  favoriteLocations: [],
  // defaults to London
  currentLocation: defaultLocation,
  showSelectLocationModal: false,
};

export const initFavorite = createAsyncThunk(
  "favorite/initFavorite",
  async () => {
    return await getFavoriteLocations();
  },
);

export const removeFavorite = createAsyncThunk(
  "favorite/removeFavorite",
  async (location: FavoriteLocation) => {
    await deleteFavoriteLocation(location);
    return location;
  },
);

export const addFavorite = createAsyncThunk(
  "favorite/addFavorite",
  async (location: FavoriteLocation) => {
    await saveFavoriteLocation(location);
    return location;
  },
);

export const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    setCurrentLocation: (
      state,
      action: PayloadAction<FavoriteState["currentLocation"]>,
    ) => {
      if (action.payload) {
        state.currentLocation = action.payload;
      }
    },
    setShowSelectLocationModal: (
      state,
      action: PayloadAction<FavoriteState["showSelectLocationModal"]>,
    ) => {
      state.showSelectLocationModal = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initFavorite.fulfilled, (state, action) => {
        if (action.payload) {
          state.favoriteLocations = action.payload;
        }
      })
      .addCase(addFavorite.fulfilled, (state, action) => {
        state.favoriteLocations = [
          ...state.favoriteLocations,
          action.payload,
        ].filter(
          (loc1, index, array) =>
            array.findIndex((loc2) => loc2.id === loc1.id) === index,
        );
      })
      .addCase(removeFavorite.fulfilled, (state, action) => {
        const newLocations = [...state.favoriteLocations];
        const indexToRemove = newLocations.findIndex(
          (location) => location.id === action.payload?.id,
        );
        if (indexToRemove > -1) {
          newLocations.splice(indexToRemove, 1);
        }
        state.favoriteLocations = newLocations;
      });
  },
});

export const { setCurrentLocation, setShowSelectLocationModal } =
  favoriteSlice.actions;

export default favoriteSlice.reducer;
