
import { fetchAPI } from "../../fetchAPI";
import { BLOCK_SECTION_IMAGE_TEXTE, BLOCK_RELATION_LISTS, BLOCK_FEATURES_LISTS } from "../block/fragments";



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
    ? Number(slug) === productPreview.id
    : slug === productPreview.slug;
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
          ${BLOCK_SECTION_IMAGE_TEXTE}
          ${BLOCK_RELATION_LISTS}
          ${BLOCK_FEATURES_LISTS}
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
      categories {
        edges {
          node {
            name
          }
        }
      }
      tags {
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
