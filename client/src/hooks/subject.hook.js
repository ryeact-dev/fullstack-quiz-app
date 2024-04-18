import {
  addSubject,
  deleteSubject,
  getPaginatedSubjects,
} from '@/api/subject.api';
import { ToastNotification } from '@/components/toastNotification/ToastNotification';
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

// QUERIES
export const useGetAllSubjects = (page, count) => {
  return useQuery({
    queryFn: () => getPaginatedSubjects({ page, count }),
    queryKey: ['list-of-subjects', page, count],
    placeholderData: keepPreviousData,
    select: ({ data }) => {
      return data;
    },
  });
};

// MUTATIONS
export const useAddSubject = (closeModal) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addSubject,
    onError: ({ response }) => ToastNotification('error', response.data),
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ['list-of-subjects'] });
      ToastNotification('success', data);
      closeModal();
    },
  });
};

export const useDeleteSubject = (closeModal) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteSubject,
    onError: ({ response }) => ToastNotification('error', response.data),
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ['list-of-subjects'] });
      ToastNotification('success', data);
      closeModal();
    },
  });
};
