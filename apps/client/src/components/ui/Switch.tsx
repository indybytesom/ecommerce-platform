interface SwitchProps {
  checked: boolean;
  onChange: () => void;
}

export default function Switch({ checked, onChange }: SwitchProps) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`
        relative h-6 w-11 rounded-full transition-colors duration-300
        ${checked ? "bg-black" : "bg-gray-300"}
      `}
    >
      <span
        className={`
          absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white
          transition-transform duration-300 ease-in-out
          ${checked ? "translate-x-5" : "translate-x-0"}
        `}
      />
    </button>
  );
}
