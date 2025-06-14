import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  getUserOrdersThunk,
  selectIsLoading,
  selectUserOrders
} from '../../slices/feedSlice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();

  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    dispatch(getUserOrdersThunk());
  }, []);

  const orders: TOrder[] = useSelector(selectUserOrders);
  const validyOrders = isLoading ? null : orders;
  return <ProfileOrdersUI orders={validyOrders} />;
};
