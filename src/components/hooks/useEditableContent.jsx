import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';

/**
 * Hook to fetch and apply content overrides
 * @param {string} pageId - Page identifier
 * @param {string} contentKey - Unique content key
 * @param {any} defaultValue - Default value if no override exists
 * @returns {any} - Content value (override or default)
 */
export function useEditableContent(pageId, contentKey, defaultValue) {
  const { data: allContent = [] } = useQuery({
    queryKey: ['editableContent', pageId],
    queryFn: async () => {
      const all = await base44.entities.EditableContent.list();
      return all.filter(item => item.page_id === pageId);
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  const override = allContent.find(item => item.component_id === contentKey);
  
  return override ? override.content_value : defaultValue;
}

/**
 * Hook to get all editable content for a page
 * @param {string} pageId - Page identifier
 * @returns {Array} - All content for the page
 */
export function usePageContent(pageId) {
  return useQuery({
    queryKey: ['editableContent', pageId],
    queryFn: async () => {
      const all = await base44.entities.EditableContent.list();
      return all.filter(item => item.page_id === pageId);
    }
  });
}