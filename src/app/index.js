import { useCallback, useContext, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import useSelector from '../hooks/use-selector';
import useStore from '../hooks/use-store';
import useInit from '../hooks/use-init';
import Main from './main';
import Basket from './basket';
import Article from './article';
import Login from './login';
import Profile from './profile';
import Protected from '../containers/protected';
import Modals from "../containers/modals";
import Chat from './chat';
import NoSSR from '../containers/no-ssr';


/**
 * Приложение
 * @returns {React.ReactElement}
 */
 function App() {
  
   const store = useStore();
  
   useInit(async () => {
     await store.actions.session.remind();
  },  [], false, 'Main:session:remind');

  return (
    <>
      <Routes>
        <Route path={''} element={<Main />} />
        <Route path={'/articles/:id'} element={<Article />} />
        <Route path={'/login'} element={<Login />} />
        <Route
          path={'/profile/:id'}
          element={
            <NoSSR>
              <Protected redirect="/login">
                <Profile />
              </Protected>
            </NoSSR>
          }
        />
        <Route
          path={'/chat'}
          element={
            <Protected redirect="/login">
              <Chat />
            </Protected>
          }
        />
      </Routes>
      <Modals />
    </>
  );
}

export default App;
