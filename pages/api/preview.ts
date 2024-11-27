import type { NextApiRequest, NextApiResponse } from "next";
import { getPreviewPost } from "../../lib/requests/post";
import { getPreviewProduct } from "../../lib/requests/product";
import { getPreviewPage } from "../../lib/requests/page";

export default async function preview(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { secret, id, slug, type } = req.query;

  // Check the secret and next parameters
  // This secret should only be known by this API route
  if (
    !process.env.WORDPRESS_PREVIEW_SECRET ||
    secret !== process.env.WORDPRESS_PREVIEW_SECRET ||
    (!id && !slug) ||
    !type
  ) {
    return res.status(401).json({ message: "Invalid token" });
  }

  let item;
  if (type === "post") {
    item = await getPreviewPost(id || slug, id ? "DATABASE_ID" : "SLUG");
  } else if (type === "produit") {
    item = await getPreviewProduct(id || slug, id ? "DATABASE_ID" : "SLUG");
  } else if (type === "page") {
    item = await getPreviewPage(id || slug, id ? "DATABASE_ID" : "SLUG");
  } else {
    return res.status(400).json({ message: "Invalid type" });
  }

  if (!item) {
    return res.status(401).json({ message: `${type.charAt(0).toUpperCase() + type.slice(1)} not found` });
  }
  
  res.setPreviewData({
    [type]: {
      id: item.databaseId,
      slug: item.slug,
      status: item.status,
    },
  });

  const redirectUrl = type === "page" ? `/${item.slug || item.databaseId}` : `/${type}/${item.slug || item.databaseId}`;
  
  res.writeHead(307, { Location: redirectUrl });
  res.end();
}
