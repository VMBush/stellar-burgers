import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { AppDispatch } from 'src/services/store';
import { useDispatch } from 'react-redux';
import { useCallback, useEffect } from 'react';
import { getUserThunk, init } from '../../slices/userSlice';
import { getIngredientsThunk } from '../../slices/ingredientsSlice';
import { getCookie } from '../../utils/cookie';
import { ProtectedRoute } from '../protected-route';
import { ModalFull } from '../modal-full/modal-full';

const App = () => {
  const dispatch: AppDispatch = useDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = getCookie('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    if (accessToken && refreshToken) {
      dispatch(getUserThunk());
    } else {
      dispatch(init());
    }
  }, []);

  useEffect(() => {
    dispatch(getIngredientsThunk());
  }, []);

  const onModalClose = useCallback(() => {
    navigate(location.state?.background.pathname || '/', { replace: true });
  }, [location]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={location.state?.background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/login'
          element={
            <ProtectedRoute reverse>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute reverse>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute reverse>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute reverse>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path='/feed/:number'
          element={
            <ModalFull
              title={`#${location.pathname.split('/').at(-1)?.padStart(6, '0')}`}
            >
              <OrderInfo />
            </ModalFull>
          }
        />
        <Route
          path='/ingredients/:id'
          element={
            <ModalFull title='Детали ингредиента'>
              <IngredientDetails />
            </ModalFull>
          }
        />
        <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRoute>
              <ModalFull
                title={`#${location.pathname.split('/').at(-1)?.padStart(6, '0')}`}
              >
                <OrderInfo />
              </ModalFull>
            </ProtectedRoute>
          }
        />
        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {location.state?.background ? (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal
                title={`#${location.pathname.split('/').at(-1)?.padStart(6, '0')}`}
                onClose={onModalClose}
              >
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Детали ингредиента' onClose={onModalClose}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute>
                <Modal
                  title={`#${location.pathname.split('/').at(-1)?.padStart(6, '0')}`}
                  onClose={onModalClose}
                >
                  <OrderInfo />
                </Modal>
              </ProtectedRoute>
            }
          />
        </Routes>
      ) : (
        <></>
      )}
    </div>
  );
};

export default App;
