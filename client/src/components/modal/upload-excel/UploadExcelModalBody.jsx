import { useState } from 'react';
import { read, utils } from 'xlsx';

import UploadExcelFile from '@/components/upload-excel-file-button/UploadExcelFileButton';
import { ToastNotification } from '@/components/toastNotification/ToastNotification';
import { Button } from '@/components/ui/button';
import { useGetAllSubjects } from '@/hooks/subject.hook';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useExcelQuestions } from '@/hooks/question.hook';
import { Save } from 'lucide-react';

export default function UploadExcelModalBody({ payload, closeModal }) {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [subjectId, setSubjectId] = useState(null);

  const { data: listOfSubjects } = useGetAllSubjects(0, 100);

  const onAddExcelQuestionsMutation = useExcelQuestions(closeModal);

  const onSubmitHandler = (evt) => {
    evt.preventDefault();

    if (!subjectId) {
      ToastNotification('error', 'Please select a subject');
      return;
    }

    if (!uploadedFile) {
      ToastNotification('error', 'No Excel file submitted');
      return;
    }

    // READ EXCEL FILE AND MAP THE DATA FOR CLASSLIST STUDENTS UPLOAD
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(uploadedFile);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;

        const wb = read(bufferArray, { type: 'buffer' });

        const wsname = wb.SheetNames[0];

        const ws = wb.Sheets[wsname];

        const data = utils.sheet_to_json(ws);

        resolve(data);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((d) => {
      const excelData = d.map((item) => {
        return {
          question: item.question,
          options: [item.option1, item.option2, item.option3, item.option4],
          answer: item.answer.toString(),
          subjectId,
        };
      });

      onAddExcelQuestionsMutation.mutate(excelData);
    });
  };

  const handleSelectSubject = (value) => {
    setSubjectId(value);
  };

  // RENDER SECTION
  return (
    <form onSubmit={onSubmitHandler}>
      <Select onValueChange={handleSelectSubject}>
        <SelectTrigger className='w-full'>
          <SelectValue placeholder='Select a subject' />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Subjects</SelectLabel>
            {listOfSubjects?.subjects?.map((item, index) => (
              <SelectItem key={index} value={item.id}>
                {item.title}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <UploadExcelFile
        uploadedFile={uploadedFile}
        setUploadedFile={setUploadedFile}
      />
      <Button
        type='submit'
        className='mt-4 float-right w-36'
        disabled={onAddExcelQuestionsMutation.isPending}
      >
        <Save size={18} className='mr-1' />{' '}
        {onAddExcelQuestionsMutation.isPending ? 'Uploading...' : 'Upload'}
      </Button>
    </form>
  );
}
