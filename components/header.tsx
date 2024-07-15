import Link from "next/link";
import MenuItems from "./menuItems";

export default function Header(menu) {
  console.log(menu.menu.menuItems.nodes)
  return (
    <div>
      <h2 className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight mb-20 mt-8">
        <Link href="/" className="hover:underline">
          Blog
        </Link>
        .
      </h2>
      <nav>
           {menu.menu.menuItems.nodes.length > 0 && <MenuItems menuItems={menu.menu.menuItems} />}
      </nav>
    </div>
  );
}
