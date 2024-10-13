import {
    IconMinus,
    IconPlus,
    IconCartWhite,
    IconNext,
    IconPrevious,
  } from "./icons";
  
  export const ButtonIncrement = ({ className, onClick }) => {
    return (
      <button
        className={className}
        onClick={onClick}
        role="button"
        type="button"
        aria-label="Increment quantity"
      >
        <IconPlus />
      </button>
    );
  };
  
  // Set attributes based on the usecase, Not required in this case but for practice
  export const ButtonDecrement = ({
    className,
    onClick,
    role,
    type,
    ariaLabel,
  }) => {
    return (
      <button
        className={className}
        onClick={onClick}
        role={role || "test"}
        type={type || "button"}
        aria-label={ariaLabel || "Test"}
      >
        <IconMinus />
      </button>
    );
  };
  
  export const ButtonAddToCart = ({ className, onClick }) => {
    return (
      <button
        className={className}
        onClick={onClick}
        role="button"
        type="button"
        aria-label="Add to cart"
      >
        <IconCartWhite />
        <p>Add to cart</p>
      </button>
    );
  };
  
  export const ButtonNext = ({ className, onClick }) => {
    return (
      <button
        className={className}
        onClick={onClick}
        role="button"
        type="button"
        aria-label="Next"
      >
        <IconNext />
      </button>
    );
  };
  
  export const ButtonPrevious = ({ className, onClick }) => {
    return (
      <button
        className={className}
        onClick={onClick}
        role="button"
        type="button"
        aria-label="Previous"
      >
        <IconPrevious />
      </button>
    );
  };
  
  export const ButtonIcon = ({
    className,
    onClick,
    role,
    type,
    ariaLabel,
    children,
  }) => {
    const btnAriaLabel = ariaLabel || children?.toString()?.trim();
  
    return (
      <button
        className={className}
        onClick={onClick}
        role={role || "button"}
        type={type || "button"}
        aria-label={btnAriaLabel}
      >
        {children}
      </button>
    );
  };