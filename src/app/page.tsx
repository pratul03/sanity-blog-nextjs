import { Card, CardContent } from "@/components/ui/card";
import { simpleBlogCard } from "./lib/interface";
import { client, urlFor } from "./lib/sanity";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

async function getPosts() {
  const query = `
    *[_type == "blog"] | order(_createdAt desc){
    title,
      smallDescription,
      "currentSlug": slug.current,
      titleImage
    }`;
  const data = await client.fetch(query);
  return data;
}

export default async function Home() {
  const data: simpleBlogCard[] = await getPosts();

  console.log(data);
  return (
    <main>
      <div className="grid grid-cols-1 md:grid-cols-2 mt-5 gap-4">
        {data.map((post, index) => (
          <Card key={index} className="border-4 border-black border-opacity-30 rounded-lg dark:border-white dark:border-opacity-25">
            <Image
              src={urlFor(post.titleImage).url()}
              alt={post.title}
              width={500}
              height={200}
              className="rounded-t-sm h-[200px] object-cover"
            />
            <CardContent className="mt-5">
              <h3 className="text-lg line-clamp-2 font-bold dark:text-gray-500">{post.title}</h3>
              <p className="line-clamp-3 text-sm mt-2 text-gray-700 dark:text-gray-400">{post.smallDescription}</p>
              <Button asChild className="w-full mt-7">
                <Link href={`/blog/${post.currentSlug}`}>
                  Read More
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
