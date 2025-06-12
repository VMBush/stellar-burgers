import React, { FC, useCallback } from 'react';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';
import { Link, useLocation, useMatch } from 'react-router-dom';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => {
  const location = useLocation();
  const getLinkActiveClass = useCallback(
    (linkPathPattern: string) =>
      useMatch(linkPathPattern) ? styles.link_active : '',
    []
  );
  const getIconActivationType = useCallback(
    (linkPathPattern: string) =>
      useMatch(linkPathPattern) ? 'primary' : 'secondary',
    []
  );

  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={styles.menu_part_left}>
          <>
            <Link
              className={`${styles.link} ${getLinkActiveClass('/')}`}
              to='/'
            >
              <BurgerIcon type={getIconActivationType('/')} />
              <p className='text text_type_main-default ml-2 mr-10'>
                Конструктор
              </p>
            </Link>
          </>
          <>
            <Link
              className={`${styles.link} ${getLinkActiveClass('/feed/:id?')}`}
              to='/feed'
            >
              <ListIcon type={getIconActivationType('/feed/:id?')} />
              <p className='text text_type_main-default ml-2'>Лента заказов</p>
            </Link>
          </>
        </div>
        <Link to='/'>
          <div className={styles.logo}>
            <Logo className='' />
          </div>
        </Link>
        <div className={styles.link_position_last}>
          <Link
            className={`${styles.link} ${getLinkActiveClass('/profile/*')}`}
            to='/profile'
          >
            <ProfileIcon type={getIconActivationType('/profile/*')} />
            <p className='text text_type_main-default ml-2'>
              {userName || 'Личный кабинет'}
            </p>
          </Link>
        </div>
      </nav>
    </header>
  );
};

function getLinkActiveClass(currentPath: string, linkPath: string) {
  return currentPath === linkPath ? styles.link_active : '';
}

function getIconActivationType(linkPathPattern: string) {
  return useMatch(linkPathPattern) ? 'primary' : 'secondary';
}
