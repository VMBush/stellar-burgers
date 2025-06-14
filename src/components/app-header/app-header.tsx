import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from 'react-redux';
import { selectUserName } from '../../slices/userSlice';

export const AppHeader: FC = () => (
  <AppHeaderUI userName={useSelector(selectUserName) || ''} />
);
