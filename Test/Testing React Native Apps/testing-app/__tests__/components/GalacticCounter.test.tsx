import { render, screen, userEvent } from "@testing-library/react-native";
// Component to test
import GalacticCounter from "../../components/GalacticCounter";

describe("GalacticCounter", () => {
  it("Updates the content", async () => {
    render(<GalacticCounter />);
    const user = userEvent.setup({
      advanceTimers: jest.advanceTimersByTime,
    });
    jest.useFakeTimers();

    const addStarButton = screen.getByText("Add Star");
    const decreaseStarButton = screen.getByText("Decrease Star");

    await user.press(addStarButton);
    await user.press(addStarButton);

    expect(screen.getByText("Stars: 2")).toBeTruthy();

    await user.press(decreaseStarButton);
    await user.press(decreaseStarButton);
    await user.press(decreaseStarButton);
    expect(screen.getByText("Stars: -1")).toBeTruthy();
  });
});
