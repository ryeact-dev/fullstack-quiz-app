import { useEffect, useState } from 'react';
import AddQuestionModalBody from '../modal/add-question/AddQuestionModalBody';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Card } from '../ui/card';
import AddSubjectModalBody from '../modal/add-subject/AddSubjectModalBody';
import ConfirmationModalBody from '../modal/confirmation/ConfirmationModalBody';
import QuizSettingsModalBody from '../modal/quiz-settings/QuizSettingsModalBody';
import UploadExcelModalBody from '../modal/upload-excel/UploadExcelModalBody';

export default function ModalContainer({ isOpen, setIsOpen, modalSetting }) {
  const { modalType, title, size, payload, confirmationType } = modalSetting;

  const [isMounted, setIsMounted] = useState(false);

  const close = () => {
    setIsOpen(false);
  };

  // Check if component is mounted to avoid hydration error
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  let modalComponent = <div></div>;

  switch (modalType) {
    case 'add-question':
      modalComponent = (
        <AddQuestionModalBody payload={payload} closeModal={close} />
      );
      break;
    case 'add-subject':
      modalComponent = (
        <AddSubjectModalBody payload={payload} closeModal={close} />
      );
      break;
    case 'take-quiz':
      modalComponent = (
        <QuizSettingsModalBody payload={payload} closeModal={close} />
      );
      break;
    case 'upload-excel':
      modalComponent = (
        <UploadExcelModalBody payload={payload} closeModal={close} />
      );
      break;
    case 'confirmation':
      modalComponent = (
        <ConfirmationModalBody
          title={title}
          payload={payload}
          closeModal={close}
          confirmationType={confirmationType}
        />
      );
      break;
    default:
      modalComponent;
  }

  return (
    <Dialog open={isOpen} onOpenChange={close} className='bg-background'>
      <DialogContent className={`${size} bg-background`}>
        <DialogHeader>
          <Card className='rounded-md'>
            <DialogTitle className='text-center text-2xl p-1'>
              {modalType === 'confirmation' ? 'Confirmation' : title}
            </DialogTitle>
          </Card>
        </DialogHeader>
        <div>{modalComponent}</div>
      </DialogContent>
    </Dialog>
  );
}
