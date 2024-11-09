
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

export async function refetchProductCategory(slug, cursor, perPage) {

  if (!slug) {
    throw new Error('Slug manquant pour la requête de catégorie');
  }

  const data = await fetchAPI(
    `
    query CategoryProductsBySlug($id: ID!, $idType: Product_categoryIdType!, $first: Int!, $after: String) {
      productCategory(id: $id, idType: $idType) {
        products(first: $first, after: $after) { 
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
          pageInfo {
            endCursor
            hasNextPage
          }
        }
      }
    }
    `,
    {
      variables: {
        id: slug,
        idType: "SLUG",
        first: perPage ?? 10, 
        after: cursor
      },
    },
  );

  return data;
}

export async function getProductCategory(slug, perPage) {

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
        products(first: $first) { 
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
          pageInfo {
            endCursor
            hasNextPage
          }
        }
      }
      query CategoryBySlug($id: ID!, $idType: Product_categoryIdType!, $first: Int!) {
        productCategory(id: $id, idType: $idType) {
          ...productCategoryFields
        }
      }
      `,
    {
      variables: {
        id: slug,
        idType: "SLUG",
        first: perPage ?? 10, 
      },
    },
  );

  return data;
}
