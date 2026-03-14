import ArticleDetails from "@/components/articles/ArticleDetails/ArticleDetails";
import { api } from "@/data/api";
import { notFound } from "next/navigation";

async function getArticle(id) {
  const res = await fetch(`${api}/article/single/${id}`, { cache: "no-store" });
  if (!res.ok) return null;
  return res.json();
}

// ✅ SEO Metadata for App Router
export async function generateMetadata({ params }) {
  const { id } = await params;
  const data = await getArticle(id);
  const article = data?.article;
  if (!article) return {};

  return {
    title: article.title,
    description: article.content.slice(0, 150),
    openGraph: {
      title: article.title,
      description: article.content.slice(0, 150),
      images: [article.thumbnail?.photo],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.content.slice(0, 150),
      images: [article.thumbnail?.photo],
    },
  };
}

// ✅ Page
export default async function ArticlePage({ params, searchParams }) {
  const { id } = await params;
  const { iframe } = await searchParams;
  const data = await getArticle(id);
  const article = data?.article;
  if (!article) return notFound();

  const isIframe = iframe === "true";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: article.title,
            description: article.content.slice(0, 150),
            image: [article.thumbnail?.photo],
            articleSection: article.articleType,
            keywords: article.hashtags.join(", "),
            author: {
              "@type": "Person",
              name: "Abdullah Shayed",
            },
            publisher: {
              "@type": "Organization",
              name: "PieTenium",
              logo: {
                "@type": "ImageObject",
                url: "https://i.ibb.co/JFHtgsbk/Pie-Tenium-io.png",
              },
            },
            datePublished: article.createdAt || "2025-05-21",
          }),
        }}
      />

      <div style={isIframe ? { padding: 0, fontFamily: "sans-serif" } : {}}>
        <ArticleDetails data={article} />
      </div>
    </>
  );
}
