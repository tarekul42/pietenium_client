import WorkDetails from "@/components/works/WorkDetails/WorksDetails";
import { api } from "@/data/api";

const page = async ({ params }) => {
  const { id } = await params;
  const response = await fetch(`${api}/project/singleProject/${id}`, {
    cache: "no-store",
  });

  const project = await response.json();
//   console.log(project?.data);
  return (
    <div>
      <WorkDetails project={project?.data} />
    </div>
  );
};

export default page;
