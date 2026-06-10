/* Quantity stepper — bordered pill, −/＋ + center number input.
   Mirrors the handoff `.stepper` behaviour (min clamp, change event). */
interface StepperProps {
  value: number
  min?: number
  onChange: (v: number) => void
}

export function Stepper({ value, min = 1, onChange }: StepperProps) {
  const clamp = (v: number) => Math.max(min, isNaN(v) ? min : v)
  return (
    <div className="stepper">
      <button type="button" aria-label="Decrease" onClick={() => onChange(clamp(value - 1))}>
        −
      </button>
      <input
        type="number"
        value={value}
        min={min}
        onChange={(e) => onChange(clamp(parseInt(e.target.value, 10)))}
      />
      <button type="button" aria-label="Increase" onClick={() => onChange(clamp(value + 1))}>
        +
      </button>
    </div>
  )
}
