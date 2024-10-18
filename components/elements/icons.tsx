import Image from "next/image";

export const IconCart = ({ className }) => {
  return (
    <Image
      src="/icon-cart.svg"
      width={22}
      height={20}
      alt="shoping cart icon"
      className={className}
    />
  );
};

export const IconCartWhite = () => {
  return (
    <Image
      src="/icon-cart-white.svg"
      width={22}
      height={20}
      alt="shoping cart icon"
      className="stroke-green-600"
    />
  );
};

export const IconClose = () => {
  return (
    <Image
      src="/icon-close.svg"
      width={13.44}
      height={13.44}
      alt="menu close icon"
      className=" transition-all duration-1000 ease-in-out"
    />
  );
};

export const IconMenu = () => {
  return (
    <Image
      src="/icon-menu.svg"
      width={16}
      height={15}
      alt="menu icon"
      className=" transition-all duration-1000 ease-in-out"
    />
  );
};

export const IconDelete = () => {
  return (
    <Image
      src="/icon-delete.svg"
      width={14}
      height={16}
      alt="delete icon"
      className=""
    />
  );
};

export const IconMinus = () => {
  return (
    <Image
      src="/icon-minus.svg"
      width={12}
      height={3.33}
      alt="minus icon"
      className=""
    />
  );
};

export const IconPlus = () => {
  return (
    <Image
      src="/icon-plus.svg"
      width={12}
      height={12}
      alt="plus icon"
      className=""
    />
  );
};

export const IconNext = () => {
  return (
    <>
      <Image
        src="/icon-next.svg"
        width={5.71}
        height={11.43}
        alt="next icon"
        className="block md:hidden"
      />
      <Image
        src="/icon-next.svg"
        width={8}
        height={16}
        alt="next icon"
        className="hidden md:block"
      />
    </>
  );
};

export const IconPrevious = () => {
  return (
    <>
      <Image
        src="/icon-previous.svg"
        width={5.71}
        height={11.43}
        alt="previous icon"
        className="block md:hidden"
      />
      <Image
        src="/icon-previous.svg"
        width={8}
        height={16}
        alt="previous icon"
        className="hidden md:block"
      />
    </>
  );
};

export const Avatar = ({ className }) => {
  return (
    <div className={className}>
      <Image
        src="/image-avatar.png"
        width={24}
        height={24}
        alt="user avatar photo"
        className="block md:hidden"
      />
      <Image
        src="/image-avatar.png"
        width={50}
        height={50}
        alt="user avatar photo"
        className="hidden md:block"
      />
    </div>
  );
};

export const Logo = ({ className }) => {
  return (
    <Image
      src="/logo.svg"
      width={137.5}
      height={20}
      alt="logo img"
      className={className}
    />
  );
};

export const SvgClose = ({ className }) => {
  return (
    <svg
      width="14"
      height="15"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m11.596.782 2.122 2.122L9.12 7.499l4.597 4.597-2.122 2.122L7 9.62l-4.595 4.597-2.122-2.122L4.878 7.5.282 2.904 2.404.782l4.595 4.596L11.596.782Z"
        fillRule="evenodd"
      />
    </svg>
  );
};