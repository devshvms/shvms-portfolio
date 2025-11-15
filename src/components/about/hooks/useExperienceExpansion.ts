import { useState } from 'react';

export const useExperienceExpansion = (defaultExpandedId: string = '7-lowes-sse') => {
  const [expandedId, setExpandedId] = useState<string>(defaultExpandedId);

  const handleExpandClick = (id: string) => {
    setExpandedId(expandedId === id ? '' : id);
  };

  const isExpanded = (id: string) => expandedId === id;

  return {
    expandedId,
    handleExpandClick,
    isExpanded,
  };
}; 