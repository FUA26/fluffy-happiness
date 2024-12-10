import { allPosts, Post, Page, allPages } from 'contentlayer/generated';
import { compareDesc, format, parseISO } from 'date-fns';
import Link from 'next/link';

function PostCard(post: Post) {
  return (
    <div className='mb-8'>
      <h2 className='mb-1 text-xl'>
        <Link href={post.url} className='text-blue-700 hover:text-blue-900'>
          {post.title}
        </Link>
      </h2>
      <time dateTime={post.date}>
        {format(parseISO(post.date), 'LLLL d, yyyy')}
      </time>
      <p>{post.summary}</p>
    </div>
  );
}

function PageCard(post: Page) {
  return (
    <div className='mb-8'>
      <h2 className='mb-1 text-xl'>
        <Link href={post.url} className='text-blue-700 hover:text-blue-900'>
          {post.title}
        </Link>
      </h2>
      <time dateTime={post.date}>
        {format(parseISO(post.date), 'LLLL d, yyyy')}
      </time>
      <p>{post.summary}</p>
    </div>
  );
}
export default function Home() {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );

  const pages = allPages.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );
  return (
    <div className='max-w-xl mx-auto my-8'>
      <h1 className='text-center'>My Markdown Blog</h1>
      {posts.map((post) => (
        <PostCard {...post} key={post._id} />
      ))}

      <h1 className='text-center'>Pagessss</h1>
      {pages.map((page) => (
        <PageCard {...page} key={page._id} />
      ))}
    </div>
  );
}