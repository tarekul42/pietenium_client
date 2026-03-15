import WorkDetails from "@/components/works/WorkDetails/WorksDetails";
import { api } from "@/data/api";

async function getProject(id) {
  const res = await fetch(`${api}/project/singleProject/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) return null;
  return res.json();
}

// ✅ SEO Metadata for App Router
export async function generateMetadata({ params }) {
  const { id } = await params;
  const data = await getProject(id);
  const work = data?.data;
  if (!work) return {};

  return {
    title: work.title,
    description: work.details.slice(0, 150),
    openGraph: {
      title: work.title,
      description: work.details.slice(0, 150),
      images: [work.thumbnail?.photo],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: work.title,
      description: work.details.slice(0, 150),
      images: [work.thumbnail?.photo],
    },
  };
}

const page = async ({ params }) => {
  const { id } = await params;

  const project = await getProject(id);
  const projectData = project?.data;

  if (!projectData) {
    return (
      <div style={{ padding: "50px", textAlign: "center" }}>
        <h2>Project not found</h2>
        <p>
          The project you&apos;re looking for doesn&apos;t exist or has been
          removed.
        </p>
      </div>
    );
  }
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "projectData",
            headline: projectData.title,
            description: projectData.details.slice(0, 150),
            image: [projectData.thumbnail?.photo],
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
            datePublished: projectData.createdAt || "2025-05-21",
          }),
        }}
      />
      <WorkDetails project={project?.data} />
    </div>
  );
};

export default page;
