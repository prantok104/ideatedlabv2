"use client";

// Define new button sizes
const buttonSizes = {
  xlarge: "px-3 py-2 text-xs md:px-6 md:py-3.5 md:text-base ",
  large: "px-3 py-2 text-xs md:px-4 md:py-3 md:text-base",
  medium: "px-3 py-2 text-xs md:px-5 md:py-2.5 md:text-sm",
  small: "px-3 py-2 text-sm",
  xsmall: "px-3 py-2 text-xs",
  iconXlarge: "p-4 h-14 w-14", // Sizes for icon buttons
  iconLarge: "p-3.5 h-12 w-12",
  iconMedium: "p-2.5 h-10 w-10",
  iconSmall: "p-2.5 h-9 w-9",
  iconXsmall: "p-2 h-7 w-7",
};

// Define new button variants
const buttonVariant = {
  base: "button-base",
  disabled: "button-disabled",
  stroke: "button-stroke",
  strokeOrange : "button-stroke-orange",
  text: "button-text",
  textDisabled: "button-text-disabled",
  icon: "fill-icon-button", // Variants for icon buttons
  iconDisabled: "fill-icon-button-disabled",
  iconStroke: "stroke-icon-button",
  iconStrokeDisabled: "fill-icon-button-disabled",
  rectangleFill: "reactangle-fill-icon-button",
  rectangleFillDisabled: "reactangle-fill-icon-button-disabled",
  reactangleStroke: "reactangle-stroke-icon-button",
  reactangleStrokeDisabled: "reactangle-stroke-icon-button-disabled",
  printBtn: "print-btn",
  removeBtn: "remove-btn",
};

export default function Button({
  size = "",
  variant = "",
  children,
  iconLeft,
  iconRight,
  iconMiddle,
  ...rest
}) {
  const sizeClass = buttonSizes[size] || buttonSizes.medium; // Default to medium if size not found
  const variantClass = buttonVariant[variant] || buttonVariant.base; // Default to base if variant not found
  // console.log(rest?.type);
  return (
    <button
      type={rest?.type}
      className={`${variantClass} ${sizeClass} w-full flex items-center justify-center gap-1 text-nowrap`} //text-nowrap is used not to wrap when flex is using
      {...rest}
    >
      {iconLeft && <span className="icon-left">{iconLeft}</span>}
      {iconMiddle && <span className="icon-middle">{iconMiddle}</span>}
      {children}
      {iconRight && <span className="icon-right">{iconRight}</span>}
    </button>
  );
}
