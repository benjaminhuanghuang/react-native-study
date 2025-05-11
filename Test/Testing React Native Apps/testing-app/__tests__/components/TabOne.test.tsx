import { render, screen, fireEvent } from "@testing-library/react-native";
// Component to test
import TabOneScreen from "../../app/(tabs)";

describe("TabOneScreen", () => {
  it("Show Text", () => {
    const { getByText } = render(<TabOneScreen />);
    const label = getByText("Feed");
    expect(label).toBeTruthy();
  });

  it("Show Text-using screen", () => {
    render(<TabOneScreen />);
    const label = screen.getByText("Feed");
    expect(label).toBeTruthy();
  });

  it("Show the logo-by role", () => {
    render(<TabOneScreen />);
    const logo = screen.getByRole("img");
    expect(logo.props.source.uri).toEqual(
      "https://galaxies.dev/img/logos/logo--blue.png"
    );
  });

  it("Show the separator-by testID", () => {
    render(<TabOneScreen />);
    const separator = screen.getByTestId("separator");
    expect(separator).toBeTruthy();
  });

  it("Show the search input-by getByDisplayValue and fireEvent", () => {
    render(<TabOneScreen />);
    const search = "My Search";
    fireEvent.changeText(screen.getByPlaceholderText("Search"), search);
    expect(screen.getByDisplayValue(search)).toBeTruthy();
  });
});
