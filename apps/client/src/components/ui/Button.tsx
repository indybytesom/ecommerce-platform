// import clsx from "clsx";

// type ButtonProps = {
//   children: React.ReactNode;
//   variant?: "primary" | "secondary";
//   className?: string;
// };

// export default function Button({
//   children,
//   variant = "primary",
//   className,
// }: ButtonProps) {
//   return (
//     <button
//       className={clsx(
//         "rounded-md px-5 py-3 text-sm font-medium transition",
//         {
//           "bg-black text-white hover:opacity-90":
//             variant === "primary",

//           "border hover:bg-black hover:text-white":
//             variant === "secondary",
//         },
//         className
//       )}
//     >
//       {children}
//     </button>
//   );
// }

import clsx from "clsx";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
};

export default function Button({
  children,
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "rounded-md px-5 py-3 text-sm font-medium transition",
        {
          "bg-black text-white hover:opacity-90": variant === "primary",

          "border hover:bg-black hover:text-white": variant === "secondary",
        },
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
