
import { fetchAPI } from "../fetchAPI";
import { BLOCK_SECTION_IMAGE_TEXT, BLOCK_RELATION_LISTS, BLOCK_FEATURES_LISTS, BLOCK_SECTION_TEXT, BLOCK_SECTION_ACCORDION } from "./block/fragments";


export async function getPreviewProduct(id, idType = "DATABASE_ID") {
  const data = await fetchAPI(
    `
    query PreviewProduct($id: ID!, $idType: ProductIdType!) {
      product(id: $id, idType: $idType) {
        databaseId
        slug
        status
      }
    }
    `,
    {
      variables: { id, idType },
    }
  );
  return data?.product;
}


const GET_PRODUCTS_QUERY = `
  query GET_PRODUCTS {
    products {
      nodes {
        id
        title
        featuredImage {
          node {
            sourceUrl
          }
        }
        products {
          description
          price
        }
      }
    }
  }
`;

export async function getAllFilters() {
  const data = await fetchAPI(`
    {
      productTags(first: 100) {
        edges {
          node {
            id
            name
            slug
            parentId
            children {
              edges {
                node {
                  databaseId
                  id
                  name
                  slug
                }
              }
            }
          }
        }
      }
      brands {
        nodes {
          id
          name
          slug
        }
      }
      productCategories {
        edges {
            node {
              id
              name
              slug
          }
        }
      }
    }
  `);
  const filteredCategories = data.productCategories.edges.filter(
    (category) => category.node.slug !== "produits"
  );
  const extendedCategories = [
    { node: { slug: "", name: "Tout" } },
    ...filteredCategories,
  ];
  return {
    ...data,
    productCategories: {
      edges: extendedCategories,
    },
  };
  return data;
}

export async function getAllProducts() {
  const data = await fetchAPI(GET_PRODUCTS_QUERY);
  return data?.products;
}


export async function getAllProductsWithSlug() {
  const data = await fetchAPI(`
    {
      products(first: 10000) {
        edges {
          node {
            slug
          }
        }
      }
    }
  `);
  return data?.products;
}


export async function getProductAndMoreProducts(slug, preview, previewData) {
  const productPreview = preview && previewData?.product;
  // The slug may be the id of an unpublished product
  const isId = Number.isInteger(Number(slug));
  const isSameProduct = isId
    ? productPreview && Number(slug) === productPreview.id
    : productPreview && slug === productPreview.slug;
  const isDraft = isSameProduct && productPreview?.status === "draft";

  const data = await fetchAPI(
    `
    fragment ProductFields on Product {
      title
      slug
      date
      seo {
        title
        metaDesc
        fullHead
      }
      featuredImage {
        node {
          sourceUrl
        }
      }
      blocks {
        content {
          ${BLOCK_SECTION_TEXT}
          ${BLOCK_SECTION_IMAGE_TEXT}
          ${BLOCK_RELATION_LISTS}
          ${BLOCK_FEATURES_LISTS}
          ${BLOCK_SECTION_ACCORDION}
        }
      }
      products {
        gallery {
           nodes {
            id
            sourceUrl
            altText
          }
        }
        link
        description
        rating
        price
        details {
          title
          list {
            listItem
          }
        }
      }
      productCategories {
        edges {
          node {
            name
            slug
          }
        }
      }
      productTags {
        edges {
          node {
            name
          }
        }
      }
    }
    query ProductBySlug($id: ID!, $idType: ProductIdType!) {
      product(id: $id, idType: $idType) {
        ...ProductFields
        content
      }
      products(first: 3, where: { orderby: { field: DATE, order: DESC } }) {
        edges {
          node {
            ...ProductFields
          }
        }
      }
    }
    `,
    {
      variables: {
        id: isDraft ? productPreview.id : slug,
        idType: isDraft ? "DATABASE_ID" : "SLUG",
      },
    },
  );

  // Draft products may not have a slug
  if (isDraft) data.product.slug = productPreview.id;

  // Filter out the main product
  data.products.edges = data.products.edges.filter(({ node }) => node.slug !== slug);
  // If there are still 3 products, remove the last one
  if (data.products.edges.length > 2) data.products.edges.pop();

  return data;
}
