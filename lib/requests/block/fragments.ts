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
          contentTypeName
          slug
          title
          featuredImage {
            node {
              altText
              sourceUrl
            }
          }
        }
        ... on Post {
          id
          title
          slug
          contentTypeName
          featuredImage {
            node {
              altText
              sourceUrl
            }
          }
        }
        ... on Page {
          id
          title
          slug
          contentTypeName
          featuredImage {
            node {
              altText
              sourceUrl
            }
          }
        }
      }
    }
  }
`;



export const BLOCK_FEATURES_LISTS = `
  ... on BlocksContentFeaturesListsLayout {
  __typename
    direction
    text
    listImage {
      image {
        node {
          altText
          sourceUrl
        }
      }
    }
    listText {
      text
    }
  }
`;
