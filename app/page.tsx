'use client';

import { useState } from 'react';
import { PlusIcon, EyeIcon } from '@heroicons/react/24/outline';
import PostModal from '@/components/PostModal';

interface Post {
  id: string;
  title: string;
  type: 'link' | 'text';
  content?: string;
  url?: string;
  createdAt: Date;
  views: number;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddPost = (post: Omit<Post, 'id' | 'createdAt' | 'views'>) => {
    const newPost: Post = {
      ...post,
      id: Date.now().toString(),
      createdAt: new Date(),
      views: 0,
    };
    setPosts([newPost, ...posts]);
    setIsModalOpen(false);
  };

  const handleViewPost = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, views: post.views + 1 }
        : post
    ));
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">H</span>
            </div>
            <h1 className="text-5xl font-bold text-gray-900">HRead</h1>
          </div>
          <p className="text-gray-600">피플팀 사람들이 모아보는 HR바닥 늬우스</p>
        </header>
        
        <div className="space-y-8">
          {posts.map((post) => (
            <article key={post.id} className="group">
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h2>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>{formatDate(post.createdAt)}</span>
                    {post.type === 'link' && post.url && (
                      <>
                        <span>•</span>
                        <div className="flex items-center gap-2">
                          <a 
                            href={post.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            onClick={() => handleViewPost(post.id)}
                            className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-colors"
                          >
                            <EyeIcon className="w-4 h-4" />
                            <span>원문 보기</span>
                          </a>
                          <span className="text-gray-400">•</span>
                          <span className="text-gray-400">{post.views}회 조회</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="fixed bottom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        >
          <PlusIcon className="w-6 h-6" />
        </button>
      </div>

      <PostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddPost}
      />
    </main>
  );
}
