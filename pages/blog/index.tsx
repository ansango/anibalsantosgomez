import SwitchLang from "components/SwitchLang";
import { pick } from "contentlayer/client";
import { allBlogs } from "contentlayer/generated";
import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import Link from "next/link";

export const getStaticProps: GetStaticProps = ({ locale }) => {
  const posts = allBlogs
    .filter(({ lang }) => lang === locale)
    .map((post) => pick(post, ["slug", "title", "summary", "publishedAt"]))
    .sort(
      (a, b) =>
        Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt))
    );

  return { props: { posts } };
};

const Blog: NextPage = ({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div>
      <SwitchLang />
      {posts.map(({ slug, title, summary, publishedAt, lang }) => (
        <div key={slug}>
          <h1>{title}</h1>
          <p>{summary}</p>
          <p>{publishedAt}</p>
          <Link href={`blog/${slug}`} locale={lang}>
            <a>Read more</a>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Blog;
