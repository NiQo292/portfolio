import { ReactNode } from "react";
import { tv, VariantProps } from "tailwind-variants";

const buttonStyles = tv({
  base: "w-24 p-2 rounded-lg hover:cursor-pointer flex items-center justify-center",
  variants: {
    type: {
      confirm: "bg-[#00ffff] text-[#171717]",
      ghost: "bg-transparent border border-gray-500",
      caution: "bg-yellow-500",
      danger: "bg-red-500",
    },
  },
});

type ButtonVariants = VariantProps<typeof buttonStyles>;
type ButtonProps = ButtonVariants & { children: ReactNode };

const Button = (props: ButtonProps) => {
  return <button className={buttonStyles(props)}>{props.children}</button>;
};

export default Button;
