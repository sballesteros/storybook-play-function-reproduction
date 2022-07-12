/** @jsx h */
import { h } from "preact";
import { useState } from "preact/hooks";

/**
 * Primary UI component for user interaction
 */
export default function PlayFunctionBug({ onIncrement }) {
  const [step, setStep] = useState(0);

  return (
    <div>
      step <span data-testid="step">{step}</span>
      <button
        onClick={() => {
          onIncrement?.();
          setStep(step + 1);
        }}
      >
        increment
      </button>
    </div>
  );
}
