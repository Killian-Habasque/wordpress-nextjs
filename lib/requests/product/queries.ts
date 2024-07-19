
import { fetchAPI } from "../../fetchAPI";
import { BLOCK_SECTION_IMAGE_TEXTE, BLOCK_RELATION_LISTS } from "../block/fragments";



const GET_PRODUCTS_QUERY = `
  query GET_PRODUCTS {
    products {
      nodes {
        title
        blocks {
          content {
            ${BLOCK_SECTION_IMAGE_TEXTE}
            ${BLOCK_RELATION_LISTS}
          }
        }
      }
    }
  }
`;

export async function getAllProducts() {
    const data = await fetchAPI(GET_PRODUCTS_QUERY);
    return data?.products;
}
