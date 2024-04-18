import ModalContainer from '@/components/modal-container/ModalContainer';
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
import { useGetAllSubjects } from '@/hooks/subject.hook';
import { Label } from '@radix-ui/react-label';
import { PenBox, Trash } from 'lucide-react';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function AddSubject({ modalSetting, setModalSetting }) {
  const [isOpen, setIsopen] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams({
    page: '1',
  });

  const page = searchParams.get('page') || 1;

  const { data: listOfSubjects, isPlaceholderData } = useGetAllSubjects(
    Number(page - 1),
    10
  );

  const onPageClick = (pageNumber) => {
    setSearchParams((prev) => {
      prev.set('page', pageNumber);
      return prev;
    });
  };

  const handleOpenModal = (dataPayload, isDelete) => {
    let modalData;
    if (isDelete === true) {
      modalData = {
        title: 'Delete Subject?',
        size: 'max-w-md',
        modalType: 'confirmation',
        confirmationType: 'delete-subject',
        payload: dataPayload,
      };
    } else {
      modalData = {
        ...modalSetting,
        title: 'Update Subject',
        size: 'max-w-2xl',
        modalType: 'add-subject',
        payload: dataPayload,
      };
    }

    setModalSetting(modalData);
    setIsopen(true);
  };

  const totalFetchSubjects =
    Number(page - 1) * 10 + listOfSubjects?.subjects?.length;

  return (
    <Card
      className={`w-full ${
        totalFetchSubjects === 0 ? 'h-52' : 'h-[720px]'
      } transition-[height] duration-150 ease-out`}
    >
      <CardHeader>
        <div className='flex items-center justify-between'>
          <div>
            <CardTitle>Questions</CardTitle>
            <CardDescription>{`${totalFetchSubjects} / ${listOfSubjects?.totalSubjects} subjects`}</CardDescription>
          </div>
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
                if (!isPlaceholderData && listOfSubjects?.hasMore) {
                  const nextPage = Number(page) + 1;
                  onPageClick(nextPage);
                }
              }}
              disabled={isPlaceholderData || !listOfSubjects?.hasMore}
            >
              Next
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className='max-h-[600px] overflow-auto mx-4 mb-8'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Subject Title</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {listOfSubjects?.subjects?.map((subject, index) => (
              <TableRow key={index}>
                <TableCell className='font-medium'>{subject.title}</TableCell>
                <TableCell className='font-medium flex gap-2 items-center'>
                  <Button
                    size='sm'
                    onClick={() => handleOpenModal(subject, false)}
                  >
                    <PenBox size={18} className='mr-1' /> Edit
                  </Button>
                  <Button
                    size='sm'
                    variant='destructive'
                    onClick={() => handleOpenModal(subject.id, true)}
                    disabled={listOfSubjects.length <= 1}
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
