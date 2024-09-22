import Link from "next/link";
import { useState, useEffect } from "react";

export default function Header(menu) {
  const [menuStructure, setMenuStructure] = useState([]);

  useEffect(() => {
    const buildMenuStructure = () => {
      const menuItems = menu.menu.menuItems.edges;
      const menuTree = [];

      menuItems.forEach((menuItem) => {
        const parentId = menuItem.node.parentId;
        if (!parentId) {
          menuTree.push({ ...menuItem, children: [] });
        } else {
          const parentIndex = menuTree.findIndex(item => item.node.id === parentId);
          if (parentIndex !== -1) {
            menuTree[parentIndex].children.push(menuItem);
          }
        }
      });
      setMenuStructure(menuTree);
    };

    buildMenuStructure();
  }, [menu]);

  return (
    <>
      <h2 className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight mb-20 mt-8">
        <Link href="/" className="hover:underline">
          Blog
        </Link>
        .

        <div>
          <img width={55} src={menu.menu.menu.logo.node.sourceUrl} alt={menu.menu.menu.logo.node.altText} />
        </div>

        <ul>
          {menuStructure.map((menuItem, index) => (
            <li key={index}>
              <a>{menuItem.node.label}</a>

              {menuItem.children.length > 0 && (
                <ul>
                  {menuItem.children.map((child, childIndex) => (
                    <li key={childIndex}>
                      <a>{child.node.label}</a>
                      {child.node.menuItem?.image && (
                        <img width={55} src={child.node.menuItem.image.node.sourceUrl} alt={child.node.menuItem.image.node.altText} />
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </h2>
    </>
  );
}
