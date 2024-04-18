import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import {
  addQuestion,
  deleteQuestion,
  getPaginatedQuestions,
} from '@/api/question.api';

import { ToastNotification } from '@/components/toastNotification/ToastNotification';

// QUERIES
export const useGetAllQuestions = (subject, page, count) => {
  return useQuery({
    queryFn: () => getPaginatedQuestions({ subject, page, count }),
    queryKey: ['list-of-questions', subject, page, count],
    placeholderData: keepPreviousData,
    select: ({ data }) => {
      return data;
    },
  });
};

// MUTATIONS
export const useAddQuestion = (closeModal) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addQuestion,
    onError: ({ response }) => ToastNotification('error', response.data),
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ['list-of-questions'] });
      ToastNotification('success', data);
      closeModal();
    },
  });
};

export const useDeleteQuestion = (closeModal) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteQuestion,
    onError: ({ response }) => ToastNotification('error', response.data),
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ['list-of-questions'] });
      ToastNotification('success', data);
      closeModal();
    },
  });
};
