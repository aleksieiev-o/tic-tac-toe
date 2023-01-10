import React, { FC, ReactElement } from 'react';
import styles from './app.module.scss';
import HeaderComponent from './components/Header/Header.component';
import GameFieldComponent from './views/GameField/GameField.component';

const AppComponent: FC = (): ReactElement => {
  return (
    <div className={styles.app}>
      <HeaderComponent/>

      <GameFieldComponent/>
    </div>
  );
};

export default AppComponent;
