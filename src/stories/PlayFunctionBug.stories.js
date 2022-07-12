/* eslint-disable jest/no-standalone-expect */
/** @jsx h */
import { h } from "preact";
import PlayFunctionBug from "./PlayFunctionBug";
import { within, userEvent } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

// More on default export: https://storybook.js.org/docs/preact/writing-stories/introduction#default-export
export default {
  title: "Example/PlayFunctionBug",
  component: PlayFunctionBug,
  argTypes: {
    onIncrement: { action: "on increment" },
  },
  decorators: [
    (Story) => (
      <div style={{ marginLeft: "200px" }}>
        <Story />
      </div>
    ),
  ],
};

// More on component templates: https://storybook.js.org/docs/preact/writing-stories/introduction#using-args
const Template = (args) => <PlayFunctionBug {...args} />;

export const StepWithBug = Template.bind({});
StepWithBug.play = async function ({ canvasElement }) {
  console.log("play: starts");

  const canvas = within(canvasElement);

  const increment = canvas.getByRole("button", { name: /increment/i });
  await userEvent.click(increment);

  expect(canvas.getByTestId("step")).toHaveTextContent("1");

  console.log("play: ends");
};

export const StepWithWorkaround = Template.bind({});
StepWithWorkaround.play = async function ({ canvasElement }) {
  await waitForDecoratorsEffects(canvasElement); // workaround
  await StepWithBug.play({ canvasElement });
};

/**
 * Consider the wait over when there are no more reported effects for at least `timeout` ms
 */
function waitForDecoratorsEffects(canvasElement, timeout = 200) {
  const root = canvasElement.ownerDocument.documentElement;

  let prevValue = root.getAttribute("data-effect-count");

  return new Promise((resolve) => {
    let timeoutId;
    function check() {
      timeoutId = setTimeout(() => {
        const value = root.getAttribute("data-effect-count");
        if (value !== prevValue) {
          prevValue = value;
          clearTimeout(timeoutId);
          check();
        } else {
          resolve();
        }
      }, timeout);
    }

    check();
  });
}
