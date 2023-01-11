import React, { FC, ReactElement } from 'react';
import styles from './app.module.scss';
import HeaderComponent from './components/Header/Header.component';
import FieldComponent from './views/Field/Field.component';
import ActiveRoleContextProvider from './Providers/ActiveRoleContext.provider';

const AppComponent: FC = (): ReactElement => {
  return (
    <ActiveRoleContextProvider>
      <div className={styles.wrapper}>
        <HeaderComponent/>

        <FieldComponent/>
      </div>
    </ActiveRoleContextProvider>
  );
};

export default AppComponent;
