
import { fetchAPI } from "../../fetchAPI";

export async function getAllPagesWithSlug() {
    const data = await fetchAPI(`
      {
        pages(first: 10000) {
          edges {
            node {
              slug
            }
          }
        }
      }
    `);
    return data?.pages;
}


export async function getPage(slug, preview, previewData) {
    const pagePreview = preview && previewData?.page;

    const isId = Number.isInteger(Number(slug));
    const isSamePage = isId
      ? pagePreview && Number(slug) === pagePreview.id
      : pagePreview && slug === pagePreview.slug;
    const isDraft = isSamePage && pagePreview?.status === "draft";
  
    const data = await fetchAPI(
      `
      fragment PageFields on Page {
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
      }
      query PageBySlug($id: ID!, $idType: PageIdType!) {
        page(id: $id, idType: $idType) {
          ...PageFields
        }
      }
      `,
      {
        variables: {
          id: isDraft ? pagePreview.id : slug,
          idType: isDraft ? "DATABASE_ID" : "URI",
        },
      },
    );
  
    if (isDraft) data.page.slug = pagePreview.id;

    return data;
  }
  