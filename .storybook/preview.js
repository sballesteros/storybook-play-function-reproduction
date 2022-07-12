/** @jsx h */
import { h } from "preact";
import { useEffect, useRef } from "preact/hooks";

import { useAddonState } from "@storybook/client-api";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

function withEffect(Story, context) {
  const [{ selected: deviceType } = {}] = useAddonState("storybook/viewport");

  const ref = useRef(0);

  useEffect(() => {
    // Workaround: We keep track of the effects so that we can wait that all effect run before executing the `play` function
    // See `waitForDecoratorsEffects` for a way to use this
    document.documentElement.setAttribute("data-effect-count", ++ref.current);

    // Example of effect dependeng on a value accessed from `useAddonState`
    if (deviceType) {
      document.documentElement.setAttribute("data-device", deviceType);
    }

    console.log(
      `global decorator effect: ${deviceType}, count: ${ref.current}`
    );
  }, [deviceType]);

  return <Story {...context} />;
}

export const decorators = [withEffect];
