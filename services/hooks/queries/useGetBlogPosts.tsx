import { BlogPost } from '@/types/schema';
import { useQuery } from '@tanstack/react-query';

const useGetBlogPosts = () => {
  return useQuery<BlogPost[]>({
    queryKey: ['posts'],
    initialData: [],
  });
};

export default useGetBlogPosts;
