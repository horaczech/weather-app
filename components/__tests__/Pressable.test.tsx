import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Pressable from "../Pressable";

describe("Pressable", () => {
  it("renders correctly", () => {
    const { getByTestId } = render(<Pressable testID="pressable" />);
    expect(getByTestId("pressable")).toBeTruthy();
  });

  it("responds to press events", () => {
    const onPress = jest.fn();
    const { getByTestId } = render(
      <Pressable testID="pressable" onPress={onPress} />,
    );
    fireEvent.press(getByTestId("pressable"));
    expect(onPress).toHaveBeenCalled();
  });
});
