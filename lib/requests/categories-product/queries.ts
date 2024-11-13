
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

  const filteredCategories = data.productCategories.edges.filter(
    (category) => category.node.slug !== "produits"
  );
  return {
    edges: filteredCategories,
  };
}

export async function refetchProductCategory(slug, cursor, perPage, search, tagIds) {

  if (!slug) {
    throw new Error('Slug manquant pour la requête de catégorie');
  }

  const data = await fetchAPI(
    `
    query CategoryProductsBySlugAndTags($id: ID!, $idType: Product_categoryIdType!, $first: Int!, $after: String, $tagIds: [ID!], $search: String) {
      productCategory(id: $id, idType: $idType) {
        slug
        products(first: $first, after: $after, where: {productTagId: $tagIds, search: $search}) {
          nodes {
            id
            title
            slug
            uri
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
        first: perPage || 12,
        after: cursor,
        search: search,
        tagIds: tagIds || null,
      },
    },
  );

  return data;
}




export async function getProducts(cursor, perPage, search, tagIds) {

  const data = await fetchAPI(
    `
    query getAllProducts($first: Int!, $after: String, $tagIds: [ID!], $search: String) {
      products(first: $first, after: $after, where: {productTagId: $tagIds, search: $search}) {
        nodes {
          id
          title
          slug
          uri
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
      `,
    {
      variables: {
        first: perPage || 12,
        after: cursor,
        search: search,
        tagIds: tagIds || null,
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
            uri
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
        first: perPage || 12,
      },
    },
  );

  return data;
}
