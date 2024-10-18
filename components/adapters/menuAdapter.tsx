export default function menuAdapter(menu) {
    const buildMenuStructure = () => {
        const menuItems = menu.menu.menuItems.edges;
        const menuTree = [];

        const itemMap = {};

        menuItems.forEach((menuItem) => {
            const item = { ...menuItem, children: [] };
            itemMap[menuItem.node.id] = item;

            if (!menuItem.node.parentId) {
                menuTree.push(item);
            }
        });

        menuItems.forEach((menuItem) => {
            const parentId = menuItem.node.parentId;
            if (parentId && itemMap[parentId]) {
                itemMap[parentId].children.push(itemMap[menuItem.node.id]);
            }
        });

        return menuTree;
    };

    return {
        buildMenuStructure
    };
}
