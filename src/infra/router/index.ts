import { createBrowserRouter } from 'react-router';
import { routers } from '@infra/router/routers.tsx';

const browserRouter = createBrowserRouter(routers, { basename: '/' });

export default browserRouter;
