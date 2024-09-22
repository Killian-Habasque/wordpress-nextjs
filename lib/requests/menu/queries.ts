const GET_MENU_ITEM = `
 label
 uri
 menuItem {
    image {
        node {
            altText
            uri
            link
        }
    }
 }
`;

const GET_MENU_QUERY = `
  query GET_MENU {
    menu(id: "Header", idType: NAME) {
        header {
            logo {
                node {
                    sourceUrl
                    altText
                }
            }
        }
        menuItems {
            edges {
                node {
                    ${GET_MENU_ITEM}
                    childItems {
                        edges {
                            node {
                                ${GET_MENU_ITEM}
                                childItems {
                                    nodes {
                                    ${GET_MENU_ITEM}
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
  }
`;
