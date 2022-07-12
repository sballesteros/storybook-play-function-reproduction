# Reproduction for https://github.com/storybookjs/storybook/issues/18697

Look at the `PlayFunctionBug` stories. Those stories use a simple counter as an example. The counter starts at 0 and clicking on the "increment" button increments the value.

- The `Step With Bug` story shows an example with the bug. Here the storybook canvas shows the initial story state ("step: 0") instead of the state resulting from having run the `play` function (the play function emulates a user click on the increment button so the storybook canvas should be "step: 1" and not "step: 0"). The bug is due to the fact that we added a global decorator relying on the `useAddonState` API in `preview.js`. So:
  - The `play` function work as expected
  - But at the end, the story re-renders (without re-running the play function) and so the Storybook canvas reflects the story's initial state
- The `Step With Workaround` story shows a workaround preventing the bug (delaying the play function execution until all the effects of the global decorator have been executed).
