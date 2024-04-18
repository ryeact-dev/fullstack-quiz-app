import { Home, PlusCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';
import { useState } from 'react';
import ModalContainer from '../modal-container/ModalContainer';
import AddQuestion from '../add-question/AddQuestion';
import AddSubject from '../add-subject/AddSubject';
import { useNavigate } from 'react-router-dom';

export default function Settings() {
  const navigate = useNavigate();

  const [tabValue, setTabValue] = useState('question');
  const [isOpen, setIsopen] = useState(false);
  const [modalSetting, setModalSetting] = useState({
    modalType: null,
    confirmationType: null,
    title: null,
    payload: null,
    size: null,
  });

  const handleOpenModal = () => {
    let modalData;

    if (tabValue === 'subject') {
      modalData = {
        ...modalSetting,
        title: 'Subject Details',
        size: 'max-w-2xl',
        modalType: 'add-subject',
        payload: null,
      };
    } else {
      modalData = {
        ...modalSetting,
        title: 'Question Details',
        size: 'max-w-2xl',
        modalType: 'add-question',
        payload: null,
      };
    }

    setModalSetting(modalData);
    setIsopen(true);
  };

  const handleTabValueClick = (tabValue) => {
    setTabValue(tabValue);
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <>
      <div className='w-full max-w-6xl'>
        <Button
          className='mb-6'
          variant='destructive'
          onClick={handleHomeClick}
        >
          <Home size={18} className='mr-1' /> Home
        </Button>
      </div>
      <Tabs defaultValue={tabValue} className='max-w-6xl w-full'>
        <div className='flex items-center justify-between mb-4'>
          <TabsList className='grid grid-cols-2 md:w-[40%] bg-accent/10'>
            <TabsTrigger
              value='question'
              onClick={() => handleTabValueClick('question')}
              className='data-[state=active]:bg-accent/90 data-[state=active]:text-white'
            >
              Add Question
            </TabsTrigger>

            <TabsTrigger
              value='subject'
              onClick={() => handleTabValueClick('subject')}
              className='data-[state=active]:bg-accent/90 data-[state=active]:text-white'
            >
              Add Subject
            </TabsTrigger>
          </TabsList>

          <Button onClick={handleOpenModal} className='w-36'>
            <PlusCircle size={18} className='mr-1' />{' '}
            {tabValue === 'subject' ? 'Add Subject' : 'Add Question'}
          </Button>
        </div>

        {tabValue === 'question' ? (
          <AddQuestion
            modalSetting={modalSetting}
            setModalSetting={setModalSetting}
          />
        ) : (
          <AddSubject
            modalSetting={modalSetting}
            setModalSetting={setModalSetting}
          />
        )}
        {isOpen === true && (
          <ModalContainer
            isOpen={isOpen}
            setIsOpen={setIsopen}
            modalSetting={modalSetting}
          />
        )}
      </Tabs>
    </>
  );
}
