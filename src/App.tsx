import { RouterProvider } from 'react-router';
import browserRouter from '@infra/router';
import { useDarkMode } from '@/stores/darkModeStore.ts';

const App = () => {
  useDarkMode();
  return <RouterProvider router={browserRouter} />;
};

export default App;
