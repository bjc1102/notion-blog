export default function parseID(pageId: string) {
  return pageId.split('-').pop() ?? '';
}
