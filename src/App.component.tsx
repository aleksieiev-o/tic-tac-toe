import React, { FC, ReactElement } from 'react';
import HeaderComponent from './components/Header/Header.component';
import FieldComponent from './views/Field/Field.component';
import ActiveRoleContextProvider from './Providers/ActiveRoleContext.provider';

const AppComponent: FC = (): ReactElement => {
  return (
    <ActiveRoleContextProvider>
      <>
        <HeaderComponent/>

        <FieldComponent/>
      </>
    </ActiveRoleContextProvider>
  );
};

export default AppComponent;
