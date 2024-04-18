import { Button } from '@/components/ui/button';
import { useDeleteQuestion } from '@/hooks/question.hook';
import { useDeleteSubject } from '@/hooks/subject.hook';
import { Send, XCircle } from 'lucide-react';

export default function ConfirmationModalBody({
  title,
  payload,
  closeModal,
  confirmationType,
}) {
  let isLoading;

  const useDeleteSubjectMutation = useDeleteSubject(closeModal);
  const useDeleteQuestionMutation = useDeleteQuestion(closeModal);
  const handleSubmit = (evt) => {
    evt.preventDefault();

    switch (confirmationType) {
      case 'delete-subject':
        useDeleteSubjectMutation.mutate({ subjectId: payload });
        isLoading = useDeleteSubjectMutation.isPending;
        break;
      case 'delete-question':
        useDeleteQuestionMutation.mutate({ questionId: payload });
        isLoading = useDeleteQuestionMutation.isPending;
        break;
      default:
        break;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className='text-xl font-bold text-center'>{title}</h2>
      <div className='flex items-center justify-end gap-3 mt-6'>
        <Button
          type='button'
          className='border border-destructive hover:bg-destructive text-destructive'
          variant='ghost'
          onClick={() => closeModal()}
        >
          <XCircle size={18} className='mr-2' /> Cancel
        </Button>
        <Button type='submit' className='w-44' disabled={isLoading}>
          <Send size={18} className='mr-2' />{' '}
          {isLoading ? 'Submitting...' : 'Submit'}
        </Button>
      </div>
    </form>
  );
}
