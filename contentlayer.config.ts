/* eslint-disable @typescript-eslint/no-explicit-any */
// contentlayer.config.ts
import { defineDocumentType, makeSource, ComputedFields } from "contentlayer2/source-files";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { visit } from 'unist-util-visit';
import { transformerCopyButton } from '@rehype-pretty/transformers'
import { codeToHtml } from 'shiki'
// import { getSingletonHighlighter } from "shiki";

/** @type {import('contentlayer/source-files').ComputedFields} */
const computedFields: ComputedFields = {
  slug: {
    type: "string",
    resolve: (doc) => `/${doc._raw.flattenedPath}`,
  },
  slugAsParams: {
    type: "string",
    resolve: (doc) => doc._raw.flattenedPath.split("/").slice(1).join("/"),
  },
}

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `blog/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
    },
    date: {
      type: "date",
      required: true,
    },
    published: {
      type: "boolean",
      default: true,
    },
    image: {
      type: "string",
      required: true,
    },
    authors: {
      // Reference types are not embedded.
      // Until this is fixed, we can use a simple list.
      // type: "reference",
      // of: Author,
      type: "list",
      of: { type: "string" },
      required: true,
    },
  },
  computedFields,
}))

export const Page = defineDocumentType(() => ({
  name: "Page",
  filePathPattern: `pages/*.md`,
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    summary: { type: 'string', required: true },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (page) => `/${page._raw.flattenedPath}`,
    },
    slug: {
      type: "string",
      resolve: (page) => page._raw.flattenedPath.replace("pages/", ""),
    },
  },
}));

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Post, Page],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      () => (tree) => {
        visit(tree, (node) => {
          if (node?.type === 'element' && node?.tagName === 'pre') {
            const [codeEl] = node.children;

            if (codeEl.tagName !== 'code') return;

            node.taw = codeEl?.children?.[0]?.value;
          }
        });
      },
      rehypeSlug,
      [
        rehypePrettyCode as any,
        {
          theme: 'andromeeda',
          transformers: [
            transformerCopyButton({
              visibility: 'always',
              feedbackDuration: 3_000,
            }),
          ],
        },
      ],
      [
        rehypeAutolinkHeadings,
        {
          content: {
            type: 'element',
            tagName: 'span',
            properties: {
              className: ['icon-link'],
              children: ['#'],
            },
          },
          properties: {
            ariaLabel: 'Link to heading',
          },
          behavior: 'append',
        },
      ],
    ],
  },
});
