import React, { FC, ReactElement } from 'react';
import styles from './header.module.scss';

const HeaderComponent: FC = (): ReactElement => {
  return (
    <div className={styles.header}>
      <div className={'logo'}>
        Tick-tack-toe
      </div>

      <div className={'profile'}>

      </div>
    </div>
  );
};

export default HeaderComponent;
