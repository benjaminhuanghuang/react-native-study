import TabOneScreen from "../../app/(tabs)/index";
import Two from "../../app/(tabs)/two";

import renderer from "react-test-renderer";

describe("App test", () => {
  test("Renders tab 1 correctly", () => {
    const tree = renderer.create(<TabOneScreen />).toJSON();
    // Check if it matches the snapshot
    expect(tree).toMatchSnapshot();
  });

  test("Renders tab 2 correctly", () => {
    const tree = renderer.create(<Two />).toJSON();
    // Check if it matches the snapshot
    expect(tree).toMatchSnapshot();
  });
});
