// components/header.tsx
import Link from "next/link";
import MenuItems from "./menuItems";
import { useHeader } from "./HeaderContext";

export default function Header() {
  const menu = useHeader();

  if (!menu) return null;

  return (
    <div className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <h2 className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight">
        <Link href="/" className="hover:underline">
          Blog
        </Link>
        .
      </h2>
      <nav>
        {menu.menuItems.nodes.length > 0 && <MenuItems menuItems={menu.menuItems.nodes} />}
      </nav>
    </div>
  );
}
