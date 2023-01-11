import React, { FC, ReactElement, useContext } from 'react';
import styles from './player-turn-info.module.scss';
import { ActiveRoleContext } from '../../../Providers/ActiveRoleContext.provider';

const PlayerTurnInfoComponent: FC = (): ReactElement => {
  const { activeRole } = useContext(ActiveRoleContext);

  return (
    <div className={styles.playerTurnInfo}>
      <span className={styles.description}>Player turn: </span>

      <b className={styles.role}>{activeRole}</b>
    </div>
  );
};

export default PlayerTurnInfoComponent;
