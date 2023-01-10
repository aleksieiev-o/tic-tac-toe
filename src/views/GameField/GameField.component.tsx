import React, { FC, ReactElement } from 'react';
import styles from './game-field.module.scss';

const GameFieldComponent: FC = (): ReactElement => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.field}>
          Field
        </div>
      </div>
    </div>
  );
};

export default GameFieldComponent;
