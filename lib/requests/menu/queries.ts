
import { fetchAPI } from "../../fetchAPI";

export async function getHeader() {
    const data = await fetchAPI(GET_MENU_QUERY);
    return data?.menu;
  }

const GET_MENU_QUERY = `
  query GET_MENU {
    menu(id: "Header", idType: NAME) {
        menu {
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
                    id
                    parentId
                    label
                    uri
                    menuItem {
                        image {
                            node {
                                altText
                                sourceUrl
                            }
                        }
                    }
                }
            }
        }
    }
  }
`;
