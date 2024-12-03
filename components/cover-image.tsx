import cn from "classnames";
import Image from "next/image";
import Link from "next/link";

interface Props {
  title: string;
  coverImage: {
    node: {
      sourceUrl: string;
    };
  };
  slug?: string;
}

export default function CoverImage({ title, coverImage, slug }: Props) {
  const image = (
    <Image
      width={2000}
      height={1000}
      alt={`Cover Image for ${title}`}
      src={coverImage?.node.sourceUrl}
      className="w-full h-60 object-cover shadow-small" 
    />
  );
  
  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link href={`/post/${slug}`} aria-label={title}>
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  );
}
