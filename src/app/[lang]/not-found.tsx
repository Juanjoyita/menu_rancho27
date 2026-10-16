import { NotFoundContent } from "@/components/NotFoundContent";

// 404 cuando una página de /es o /en llama a notFound().
export default function NotFound() {
  return <NotFoundContent />;
}
