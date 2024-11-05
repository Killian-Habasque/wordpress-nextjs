
import { fetchAPI } from "../../fetchAPI";

export async function getAllProductCategoriesWithSlug() {
    const data = await fetchAPI(`
      {
        productCategories(first: 10000) {
          edges {
            node {
              slug
            }
          }
        }
      }
    `);
    return data?.productCategories;
}


export async function getProductCategory(slug) {

    const data = await fetchAPI(
        `
      fragment productCategoryFields on Product_category {
        slug
        name
        description
        seo {
            title
            metaDesc
            fullHead
        }
        products(first: 100) { 
          nodes {
            id
            title
            slug
            featuredImage {
              node {
                sourceUrl
              }
            }
          }
        }
      }
      query CategoryBySlug($id: ID!, $idType: Product_categoryIdType!) {
        productCategory(id: $id, idType: $idType) {
          ...productCategoryFields
        }
      }
      `,
        {
            variables: {
                id: slug,
                idType: "SLUG",
            },
        },
    );

    return data;
}
