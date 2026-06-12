import { getRecentPosts } from "@/lib/mdx";
import HomeContent from "./components/HomeContent";

export default function Home() {
  const recentPosts = getRecentPosts(3);

  return <HomeContent recentPosts={recentPosts} />;
}
