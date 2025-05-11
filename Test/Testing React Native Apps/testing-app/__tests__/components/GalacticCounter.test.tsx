import { render, screen, userEvent } from "@testing-library/react-native";
// Component to test
import GalacticCounter from "../../components/GalacticCounter";

describe("GalacticCounter", () => {
  it("Updates the content", async () => {
    render(<GalacticCounter />);
    const addStarButton = screen.getByText("Add Star");
    const decreaseStarButton = screen.getByText("Decrease Star");
    const title = screen.getByText("Galactic Counter");

    expect(title).toBeTruthy();
    expect(addStarButton).toBeTruthy();
    expect(decreaseStarButton).toBeTruthy();

    await userEvent.press(addStarButton);
    const starsAfterAdd = screen.getByText("1");
    expect(starsAfterAdd).toBeTruthy();
    await userEvent.press(decreaseStarButton);
    const starsAfterDecrease = screen.getByText("0");
    expect(starsAfterDecrease).toBeTruthy();
    await userEvent.press(decreaseStarButton);
    const starsAfterDecrease2 = screen.getByText("-1");
    expect(starsAfterDecrease2).toBeTruthy();
  });
});
