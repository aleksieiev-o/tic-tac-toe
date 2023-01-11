import React, { createContext, FC, ReactElement, useState } from 'react';

export enum ActiveRole {
  CROSS_ROLE,
  NULL_ROLE,
}

interface ActiveRoleContextState {
  activeRole: ActiveRole;
  toggleActiveRole: () => void;
  resetActiveRole: () => void;
}

interface Props {
  children: ReactElement;
}

export const ActiveRoleContext = createContext<ActiveRoleContextState>({
  activeRole: ActiveRole.CROSS_ROLE,
  toggleActiveRole: () => undefined,
  resetActiveRole: () => undefined,
});

const ActiveRoleContextProvider: FC<Props> = ({ children }): ReactElement => {
  const [role, setRole] = useState<ActiveRole>(ActiveRole.CROSS_ROLE);

  const toggleActiveRoleHandler = () => {
    role === ActiveRole.CROSS_ROLE ? setRole(ActiveRole.NULL_ROLE) : setRole(ActiveRole.CROSS_ROLE);
  };

  const resetActiveRoleHandler = () => {
    setRole(ActiveRole.CROSS_ROLE);
  };

  const activeRoleContext: ActiveRoleContextState = {
    activeRole: role,
    toggleActiveRole: toggleActiveRoleHandler,
    resetActiveRole: resetActiveRoleHandler,
  };

  return (
    <ActiveRoleContext.Provider value={activeRoleContext}>
      {children}
    </ActiveRoleContext.Provider>
  );
};

export default ActiveRoleContextProvider;
