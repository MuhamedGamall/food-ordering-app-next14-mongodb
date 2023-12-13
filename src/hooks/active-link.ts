import { usePathname } from "next/navigation";

export default function useActiveLink(path: string) {
  const pathname = usePathname();
  return pathname?.includes(path);
}
