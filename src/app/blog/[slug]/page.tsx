import { blogArticle } from "@/app/lib/interface";
import { client } from "@/app/lib/sanity";
import Image from "next/image";
import { urlFor } from "../../lib/sanity";
import { PortableText } from "next-sanity";

async function getData(slug: string) {
  const query = `
        *[_type == "blog" && slug.current == '${slug}']{
        "currentSlug": slug.current,
        title,
        content,
        titleImage,
        }[0]
    `;

  const data = await client.fetch(query);
  return data;
}

export default async function BlogArticle({
  params,
}: {
  params: { slug: string };
}) {
  const data: blogArticle = await getData(params.slug);
  return (
    <div className="mt-8 flex flex-col justify-center items-center">
      <h1>
        <span className="block text-center text-blue-500 font-bold text-lg tracking-wide uppercase">
          Pratul Makar - Blog
        </span>
        <span className="mt-2 block text-3xl font-semibold text-center tracking-tight leading-8 sm:text-4xl">
          {data.title}
        </span>
      </h1>
      <Image
        src={urlFor(data.titleImage).url()}
        alt={data.title}
        width={500}
        height={500}
        priority
        className="rounded-lg mt-8 border"
      />
      <div className="mt-16 prose prose-blue prose-xl dark:prose-invert prose-headings:text-primary">
        <PortableText value={data.content} />
      </div>
    </div>
  );
}
