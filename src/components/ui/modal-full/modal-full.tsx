import { FC, memo } from 'react';

import styles from './modal-full.module.css';

import { CloseIcon } from '@zlden/react-developer-burger-ui-components';
import { TModalFullUIProps } from './type';
import { ModalOverlayUI } from '@ui';

export const ModalFullUI: FC<TModalFullUIProps> = memo(
  ({ title, children }) => {
    const numberTitle = title.startsWith('#') ? styles.titleNumber : '';
    return (
      <>
        <div className={styles.modal}>
          <div className={styles.header}>
            <h3
              className={`${styles.title} text text_type_main-large ${numberTitle}`}
            >
              {title}
            </h3>
          </div>
          <div className={styles.content}>{children}</div>
        </div>
      </>
    );
  }
);
