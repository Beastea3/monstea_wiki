import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";

type MarkdownContentProps = {
  source: string;
};

export async function MarkdownContent({ source }: MarkdownContentProps) {
  const { content } = await compileMDX({
    source,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            {
              behavior: "wrap",
              properties: {
                className: "wiki-heading-anchor",
              },
            },
          ],
          [
            rehypePrettyCode,
            {
              theme: {
                dark: "github-dark",
                light: "github-light",
              },
            },
          ],
        ],
      },
    },
  });

  return <div className="wiki-prose">{content}</div>;
}
