import { FC, memo } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from 'react-redux';
import { selectUserName } from '../../slices/userSlice';
import { ModalFullUI } from '@ui';
import { TModalFullProps } from './type';

export const ModalFull: FC<TModalFullProps> = memo(({ title, children }) => (
  <ModalFullUI title={title}>{children}</ModalFullUI>
));
