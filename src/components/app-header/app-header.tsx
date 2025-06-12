import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from 'react-redux';
import { RootState } from 'src/services/store';

export const AppHeader: FC = () => (
  <AppHeaderUI
    userName={useSelector((state: RootState) => state.user?.name) || ''}
  />
);
