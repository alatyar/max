import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { formatDate } from '@/lib/utils';

interface BlogPost {
  title: string;
  slug: string;
  category: string;
  date: string;
  author: string;
  excerpt: string;
  featured: boolean;
  tags: string[];
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
  content: string;
  readingTime: number;
}

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const contentDir = path.join(process.cwd(), 'content', 'blog');
    const categories = ['iptv-guide', 'setup-tutorials', 'troubleshooting'];
    
    for (const category of categories) {
      const categoryDir = path.join(contentDir, category);
      if (!fs.existsSync(categoryDir)) continue;
      
      const files = fs.readdirSync(categoryDir);
      const mdFile = files.find(file => {
        const fileSlug = file.replace('.md', '');
        return fileSlug === slug;
      });
      
      if (mdFile) {
        const filePath = path.join(categoryDir, mdFile);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(fileContents);
        
        // Process markdown content
        const processedContent = await remark()
          .use(remarkHtml)
          .process(content);
        
        // Calculate reading time (average 200 words per minute)
        const wordCount = content.split(/\s+/).length;
        const readingTime = Math.ceil(wordCount / 200);
        
        return {
          ...data,
          content: processedContent.toString(),
          readingTime,
        } as BlogPost;
      }
    }
    
    return null;
  } catch (error) {
    console.error('Error loading blog post:', error);
    return null;
  }
}

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ locale: string; slug: string }> 
}) {
  const { locale, slug } = await params;
  const post = await getBlogPost(slug);
  
  if (!post) {
    return {
      title: 'Blog Post Not Found - MAX TV PRO',
      description: 'The requested blog post could not be found.',
    };
  }
  
  return generateSEOMetadata({
    title: post.seo.title,
    description: post.seo.description,
    keywords: post.seo.keywords,
    locale,
    canonical: `https://maxprotv.com${locale === 'ar' ? '/ar' : ''}/blog/${slug}`,
    alternateLocales: [
      { locale: 'en', href: `https://maxprotv.com/blog/${slug}` },
      { locale: 'ar', href: `https://maxprotv.com/ar/blog/${slug}` }
    ]
  });
}

export default async function BlogPostPage({ 
  params 
}: { 
  params: Promise<{ locale: string; slug: string }> 
}) {
  const { locale, slug } = await params;
  const post = await getBlogPost(slug);
  
  if (!post) {
    notFound();
  }
  
  const t = await getTranslations({ locale, namespace: 'blog' });
  
  return (
    <div className="section-spacing">
      <div className="container-padding mx-auto max-w-4xl">
        {/* Back to Blog */}
        <div className="mb-8">
          <Link href={locale === 'ar' ? '/ar/blog' : '/blog'}>
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t('backToBlog')}
            </Button>
          </Link>
        </div>
        
        {/* Article Header */}
        <header className="mb-12">
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted mb-6">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {formatDate(post.date, locale)}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {post.readingTime} {t('minRead')}
            </div>
            <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded">
              {post.category}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            {post.title}
          </h1>
          
          <p className="text-xl text-foreground-secondary leading-relaxed mb-8">
            {post.excerpt}
          </p>
          
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-secondary/10 text-secondary text-sm rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>
        
        {/* Article Content */}
        <article 
          className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-foreground-secondary prose-a:text-accent prose-strong:text-foreground prose-code:text-accent prose-pre:bg-background-2 prose-blockquote:border-accent prose-blockquote:text-foreground-secondary"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        
        {/* Article Footer */}
        <footer className="mt-16 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <p className="text-sm text-muted">
                {t('publishedBy')} {post.author}
              </p>
              <p className="text-sm text-muted">
                {formatDate(post.date, locale)}
              </p>
            </div>
            
            <div className="flex gap-4">
              <Link href={locale === 'ar' ? '/ar/contact' : '/contact'}>
                <Button variant="outline" size="sm">
                  {t('needHelp')}
                </Button>
              </Link>
              <Link href={locale === 'ar' ? '/ar/plans' : '/plans'}>
                <Button size="sm">
                  {t('getStarted')}
                </Button>
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
