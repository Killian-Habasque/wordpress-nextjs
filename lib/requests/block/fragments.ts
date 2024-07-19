export const BLOCK_SECTION_IMAGE_TEXTE = `
  ... on BlocksContentSectionImageTexteLayout {
    __typename
    direction
    text
    image {
      node {
        altText
        sourceUrl
      }
    }
  }
`;

export const BLOCK_RELATION_LISTS = `
  ... on BlocksContentRelationListsLayout {
    __typename
    text
    postType {
      nodes {
        ... on Product {
          id
          title
        }
      }
    }
  }
`;