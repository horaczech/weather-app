import React from "react";
import { render } from "@testing-library/react-native";
import { Text, View, TextInput, ModalTextInput } from "../Themed";

describe("Themed Components", () => {
  it("renders Text correctly", () => {
    const { getByTestId } = render(<Text testID="text" />);
    expect(getByTestId("text")).toBeTruthy();
  });

  it("renders View correctly", () => {
    const { getByTestId } = render(<View testID="view" />);
    expect(getByTestId("view")).toBeTruthy();
  });

  it("renders TextInput correctly", () => {
    const { getByTestId } = render(<TextInput testID="textInput" />);
    expect(getByTestId("textInput")).toBeTruthy();
  });

  it("renders ModalTextInput correctly", () => {
    const { getByTestId } = render(<ModalTextInput testID="modalTextInput" />);
    expect(getByTestId("modalTextInput")).toBeTruthy();
  });
});
