import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { INITIAL_QUESTION_OBJ } from '@/lib/initialValues';
import { questionSchema } from '@/lib/schema';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Send, XCircle } from 'lucide-react';
import { ToastNotification } from '@/components/toastNotification/ToastNotification';
import { useAddQuestion } from '@/hooks/question.hook';
import QuestionInputForm from '@/components/question-input-form/QuestionInputForm';

export default function AddQuestionModalBody({ payload, closeModal }) {
  const [options, setOptions] = useState(
    payload ? payload.options : ['', '', '', '']
  );

  const useAddQuestionMutation = useAddQuestion(closeModal);

  const form = useForm({
    resolver: zodResolver(questionSchema),
    defaultValues: payload !== null ? payload : INITIAL_QUESTION_OBJ,
  });

  const onSubmit = (values) => {
    // Check if all options are filled in and return error if not
    const blankOption = options.filter((option) => option === '');

    if (blankOption.length > 0) {
      return ToastNotification('error', 'Please fill all the options');
    }

    let forAddingData = {
      ...values,
      options,
    };

    let isNew = true;
    if (payload) {
      isNew = false;
      forAddingData = {
        ...forAddingData,
        id: payload.id,
      };
    }

    useAddQuestionMutation.mutate({ forAddingData, isNew });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='flex flex-col gap-4'>
          <QuestionInputForm
            form={form}
            setOptions={setOptions}
            options={options}
          />
          <div className='flex-1' />
          <div className='flex-1 flex items-center gap-2'>
            <Button
              type='button'
              onClick={() => closeModal()}
              className='flex-1 border border-destructive text-destructive hover:bg-destructive'
              variant='ghost'
            >
              <XCircle size={18} className='mr-2' /> Cancel
            </Button>
            <Button
              type='submit'
              className='flex-1'
              disabled={useAddQuestionMutation.isPending}
            >
              <Send size={18} className='mr-2' />{' '}
              {useAddQuestionMutation.isPending ? 'Submitting...' : 'Submit'}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
