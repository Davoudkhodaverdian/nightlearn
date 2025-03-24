
import { getPageData } from "./layout";
import PanelPage from "@/components/panel/page";

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await getPageData(slug);
  console.log({page});
  return (<PanelPage data={page} />);
}
