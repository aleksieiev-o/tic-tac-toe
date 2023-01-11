import React, { FC, ReactElement } from 'react';
import styles from './header.module.scss';

const HeaderComponent: FC = (): ReactElement => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.logo}>
          Tic Tac Toe
        </div>

        <div className={styles.profile}>

        </div>
      </div>
    </div>
  );
};

export default HeaderComponent;
