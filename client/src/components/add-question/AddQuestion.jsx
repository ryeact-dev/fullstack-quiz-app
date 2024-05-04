import ModalContainer from '@/components/modal-container/ModalContainer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useGetAllQuestions } from '@/hooks/question.hook';
import { useGetAllSubjects } from '@/hooks/subject.hook';
import { Label } from '@radix-ui/react-label';
import { PenBox, Trash } from 'lucide-react';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SelectSubject from '../select-subject/SelectSubject';

export default function AddQuestion({ modalSetting, setModalSetting }) {
  const [isOpen, setIsopen] = useState(false);
  const { data: listOfSubjects } = useGetAllSubjects(0, 100);

  const [searchParams, setSearchParams] = useSearchParams({
    subject: listOfSubjects?.subjects[0]?.id,
    page: '1',
  });

  const subject =
    searchParams.get('subject') || listOfSubjects?.subjects[0]?.id;
  const page = searchParams.get('page') || 1;

  const { data: listOfQuestions, isPlaceholderData } = useGetAllQuestions(
    subject,
    Number(page - 1),
    10
  );

  const onPageClick = (pageNumber) => {
    setSearchParams((prev) => {
      prev.set('page', pageNumber);
      return prev;
    });
  };

  const handleSelectChange = (data) => {
    setSearchParams((prev) => {
      prev.set('subject', data);
      prev.set('page', 1);
      return prev;
    });
  };

  const handleOpenModal = (dataPayload, isDelete) => {
    let modalData;
    if (isDelete === true) {
      modalData = {
        title: 'Delete Question?',
        size: 'max-w-md',
        modalType: 'confirmation',
        confirmationType: 'delete-question',
        payload: dataPayload,
      };
    } else {
      modalData = {
        ...modalSetting,
        title: 'Update Question',
        size: 'max-w-2xl',
        modalType: 'add-question',
        payload: dataPayload,
      };
    }

    setModalSetting(modalData);
    setIsopen(true);
  };

  const totalFetchQuestions =
    Number(page - 1) * 10 + listOfQuestions?.questions?.length;

  return (
    <Card
      className={`w-full ${
        totalFetchQuestions === 0 ? 'h-52' : 'h-[720px]'
      } transition-[height] duration-150 ease-out`}
    >
      <CardHeader>
        <div className='flex items-center justify-between'>
          <div>
            <CardTitle>Questions</CardTitle>
            <CardDescription>{`${totalFetchQuestions} / ${listOfQuestions?.totalQuestions} questions`}</CardDescription>
          </div>
          <div className='flex space-x-3'>
            <SelectSubject
              handleSelectChange={handleSelectChange}
              listOfSubjects={listOfSubjects}
              subject={subject}
            />
            <div className='space-x-3'>
              <Button
                variant='outline'
                onClick={() => {
                  const oldPage = Math.max(Number(page) - 1, 0);
                  onPageClick(oldPage);
                }}
                disabled={Number(page) === 1}
              >
                Previous
              </Button>
              <Label className='font-semibold'>{page}</Label>
              <Button
                variant='outline'
                onClick={() => {
                  if (!isPlaceholderData && listOfQuestions?.hasMore) {
                    const nextPage = Number(page) + 1;
                    onPageClick(nextPage);
                  }
                }}
                disabled={isPlaceholderData || !listOfQuestions?.hasMore}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className='max-h-[600px] overflow-auto mx-4 mb-8'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Question</TableHead>
              <TableHead>Options</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {listOfQuestions?.questions?.map((question, index) => (
              <TableRow key={index}>
                <TableCell className='font-medium w-[40%]'>
                  {question.question}
                </TableCell>
                <TableCell className='font-medium w-[35%]'>
                  {question.options.map((option, index) => (
                    <p key={index} className='leading-4 py-0.5'>
                      {`${index + 1}. ${option},`}
                    </p>
                  ))}
                </TableCell>
                <TableCell className='font-medium'>
                  <p>{question.subject.title}</p>
                  <Badge className='italic shadow-none'>
                    Answer: {Number(question.answer) + 1}
                  </Badge>
                </TableCell>
                <TableCell className='font-medium  space-y-3 flex flex-col items-start'>
                  <Button
                    size='sm'
                    onClick={() => handleOpenModal(question, false)}
                  >
                    <PenBox size={18} className='mr-1' /> Edit
                  </Button>
                  <Button
                    size='sm'
                    variant='destructive'
                    onClick={() => handleOpenModal(question.id, true)}
                  >
                    <Trash size={18} className='mr-1' /> Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      {isOpen === true && (
        <ModalContainer
          isOpen={isOpen}
          setIsOpen={setIsopen}
          modalSetting={modalSetting}
        />
      )}
    </Card>
  );
}
