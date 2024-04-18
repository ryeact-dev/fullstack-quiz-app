import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import MainMenu from './components/main-menu/MainMenu';
import TakeQuiz from './components/take-quiz/TakeQuiz';
import Settings from './components/settings/Settings';
import initializeApp from './setup/init';
import { Toaster } from 'sonner';

export default function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainMenu />,
    },
    {
      path: 'quiz',
      element: <TakeQuiz />,
    },
    {
      path: 'settings',
      element: <Settings />,
    },
  ]);

  initializeApp();

  return (
    <main className='min-h-screen flex flex-col justify-center items-center'>
      <RouterProvider router={router} />
      <Toaster richColors position='top-center' visibleToasts={5} />
    </main>
  );
}
