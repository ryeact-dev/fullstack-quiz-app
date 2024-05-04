import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { useState } from 'react';
import ModalContainer from '../modal-container/ModalContainer';
import NeubrutalismButton from '../neubrutalism-button/NeubrutalismButton';

export default function MainMenu() {
  const navigate = useNavigate();

  const [isOpen, setIsopen] = useState(false);
  const [modalSetting, setModalSetting] = useState({
    modalType: null,
    confirmationType: null,
    title: null,
    payload: null,
    size: null,
  });

  const handleOpenModal = () => {
    const modalData = {
      ...modalSetting,
      title: 'Quiz Settings',
      size: 'max-w-sm',
      modalType: 'take-quiz',
      payload: null,
    };

    setModalSetting(modalData);
    setIsopen(true);
  };

  return (
    <div className='flex flex-col space-y-4'>
      <NeubrutalismButton
        onClick={() => navigate('/settings', { replace: true })}
        btnName='🦾 Settings'
      />

      <NeubrutalismButton
        onClick={handleOpenModal}
        btnName=' 🏆 Take the Quiz'
      />

      {/* <Button
        className='text-lg'
        size='lg'
        variant='secondary'
        onClick={() => navigate('/settings', { replace: true })}
      >
        🦾 Settings
      </Button> */}

      {/* <Button
        className='text-lg'
        size='lg'
        variant='secondary'
        onClick={handleOpenModal}
      >
        🏆 Take the Quiz
      </Button> */}

      {isOpen === true && (
        <ModalContainer
          isOpen={isOpen}
          setIsOpen={setIsopen}
          modalSetting={modalSetting}
        />
      )}
    </div>
  );
}
