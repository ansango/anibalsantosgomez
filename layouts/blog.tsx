import Container from "components/Container";
import { Blog } from "contentlayer/generated";
import Image from "next/image";
import { PropsWithChildren } from "react";
import { parseISO, format } from "date-fns";
import seoConfig from "lib/seoConfig";
import Structure from "components/Structure";
const BlogLayout = ({ children, post }: PropsWithChildren<{ post: Blog }>) => {
  return (
    <Container
      SeoProps={{
        type: "article",
        title: `${post.title} - ${seoConfig.author}`,
        date: `${new Date(post.publishedAt).toISOString()}`,
        description: post.summary,
        image: post.image,
      }}
    ><Structure>
      <article className="flex flex-col items-start justify-center mx-auto mb-16">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
          {post.title}
        </h1>
        <div className="flex flex-col items-start justify-between w-full mt-2 md:flex-row md:items-center">
          <div className="flex items-center">
            <Image
              alt={seoConfig.author}
              height={24}
              width={24}
              src="/avatar.jpeg"
              className="rounded-full"
            />
            <p className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              {seoConfig.author} /
              {format(parseISO(post.publishedAt), "MMMM dd, yyyy")}
            </p>
          </div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 min-w-32 md:mt-0">
            {post.readingTime.text}
          </p>
        </div>
        <div className="w-full mt-4 prose dark:prose-dark max-w-none">
          {children}
        </div>
      </article></Structure>
    </Container>
  );
};

export default BlogLayout;