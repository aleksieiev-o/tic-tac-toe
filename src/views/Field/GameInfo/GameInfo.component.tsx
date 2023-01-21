import React, { FC, ReactElement } from 'react';
import styles from './game-info.module.scss';
import PlayerTurnInfoComponent from './PlayerTurnInfo.component';

const GameInfoComponent: FC = (): ReactElement => {
  return (
    <div className={styles.gameInfo}>
      <PlayerTurnInfoComponent/>
    </div>
  );
};

export default GameInfoComponent;
