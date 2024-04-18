import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAddSubject } from '@/hooks/subject.hook';
import { INITIAL_SUBJECT_OBJ } from '@/lib/initialValues';
import { subjectSchema } from '@/lib/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Send, XCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';

export default function AddSubjectModalBody({ payload, closeModal }) {
  const useAddSubjectMutation = useAddSubject(closeModal);

  const form = useForm({
    resolver: zodResolver(subjectSchema),
    defaultValues: payload !== null ? payload : INITIAL_SUBJECT_OBJ,
  });

  const onSubmit = (values) => {
    let forAddingData = {
      ...values,
    };

    let isNew = true;
    if (payload) {
      isNew = false;
      forAddingData = {
        ...forAddingData,
        id: payload.id,
      };
    }

    useAddSubjectMutation.mutate({ forAddingData, isNew });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject Title</FormLabel>
              <FormControl>
                <Input placeholder='Enter subject title here...' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex items-center justify-end gap-3'>
          <Button
            type='button'
            className='border border-destructive hover:bg-destructive text-destructive'
            variant='ghost'
            onClick={() => closeModal()}
          >
            <XCircle size={18} className='mr-2' /> Cancel
          </Button>
          <Button
            type='submit'
            className='w-44'
            disabled={useAddSubjectMutation.isPending}
          >
            <Send size={18} className='mr-2' />{' '}
            {useAddSubjectMutation.isPending ? 'Submitting...' : 'Submit'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
