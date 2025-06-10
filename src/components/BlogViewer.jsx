import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
export default function BlogViewer({ posts, postContents }) {
  const [currentSlug, setCurrentSlug] = useState(posts.length > 0 ? posts[0].id : null);
  const currentPost = currentSlug ? posts.find(post => post.id === currentSlug) : null;
  const markdown = currentPost ? postContents[currentPost.id] : '';

  // Helper function to format the date and time
  const formatDateTimeString = dateString => {
    const displayDate = new Date(dateString);
    return displayDate
      .toLocaleDateString('de-DE', {
        timeZone: 'Europe/Berlin',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
      .replace(' um', ' |');
  };

  return (
    <>
      <aside className="overflow-y-auto lg:col-span-1">
        <ul className="space-y-1 pr-4">
          {posts.map(post => {
            const listItemDate = post.updatedDate || post.pubDate;

            return (
              <li key={post.id}>
                <button
                  className={`font-merri my-1 block w-full rounded-lg p-4 text-left transition-colors hover:bg-amber-100 ${
                    currentSlug === post.id ? 'bg-amber-100' : 'bg-amber-50'
                  }`}
                  onClick={() => setCurrentSlug(post.id)}
                >
                  <time className="text-sm text-gray-500">
                    {/* {post.updatedDate ? 'date: ' : ''} */}
                    {formatDateTimeString(listItemDate)}
                  </time>
                  <h3 className="mt-2 text-xl font-bold">{post.title}</h3>
                </button>
              </li>
            );
          })}
        </ul>
      </aside>

      <main className="overflow-y-auto lg:col-span-2">
        {currentPost && (
          <article className="prose prose-stone font-merri max-w-none p-6">
            <time className="text-md flex justify-end text-lg text-gray-500 md:pr-7">
              {/* {currentPost.updatedDate ? 'date: ' : ''} */}
              {formatDateTimeString(currentPost.updatedDate || currentPost.pubDate)}
            </time>
            <h1 className="prose-stone font-merri mb-6 text-2xl font-semibold">
              {currentPost.title}
            </h1>

            <div className="markdown-content prose prose-stone font-merri dark:prose-invert prose-p:text-pretty prose-img:rounded-xl mx-auto my-10 text-lg leading-loose font-normal tracking-normal">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
            </div>
          </article>
        )}
      </main>
    </>
  );
}
