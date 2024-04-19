import { ToastNotification } from '@/components/toastNotification/ToastNotification';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useGetAllQuestions } from '@/hooks/question.hook';
import { useGetAllSubjects } from '@/hooks/subject.hook';
import { Send, XCircle } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function QuizSettingsModalBody({ closeModal }) {
  const navigate = useNavigate();
  const [subject, setSubject] = useState(null);

  const { data: listOfSubjects } = useGetAllSubjects(0, 100);

  const { isLoading, data: listOfQuestions } = useGetAllQuestions(
    subject,
    0,
    100
  );

  const handleSelectChange = (value) => {
    setSubject(value);
  };

  const handleSubmitClick = () => {
    if (subject === null) {
      return ToastNotification('error', 'Please select a subject');
    }

    navigate('/quiz', {
      state: {
        subject,
      },
    });
  };

  return (
    <>
      <div>
        <Label htmlFor='items'>Subject</Label>
        <Select
          value={!subject ? '' : subject}
          onValueChange={handleSelectChange}
        >
          <SelectTrigger className='w-full'>
            <SelectValue placeholder='Select subject...' />
          </SelectTrigger>
          <SelectContent>
            {listOfSubjects?.subjects?.map((subject) => (
              <SelectItem key={subject.id} value={subject.id}>
                {subject.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Badge className='my-2 py-2 px-4'>
        Questions:{' '}
        {isLoading
          ? 'Loading...'
          : listOfQuestions?.questions?.length > 0
          ? listOfQuestions?.questions?.length
          : 0}
      </Badge>

      <div className='flex items-center justify-end gap-3 mt-8'>
        <Button
          type='button'
          className='border border-destructive hover:bg-destructive text-destructive'
          variant='ghost'
          onClick={() => closeModal()}
        >
          <XCircle size={18} className='mr-2' /> Cancel
        </Button>
        <Button type='button' className='flex-1' onClick={handleSubmitClick}>
          <Send size={18} className='mr-2' /> Submit
        </Button>
      </div>
    </>
  );
}
