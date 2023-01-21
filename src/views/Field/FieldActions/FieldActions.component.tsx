import React, { ChangeEvent, FC, ReactElement, useContext } from 'react';
import styles from './field-actions.module.scss';
import FieldActionsSelectorComponent from './FieldActionsSelector.component';
import PlayerTurnInfoComponent from './PlayerTurnInfo.component';
import { ActiveRoleContext } from '../../../Providers/ActiveRoleContext.provider';
import { MAX_FIELD_SIZE, MIN_FIELD_SIZE, PVC_MODE, PVP_MODE } from '../Field.component';

interface Props {
  rowsAndColumns: number;
  gameMode: string;
  setRowsAndColumns: (rowsAndColumns: number) => void;
  setGameMode: (gameMode: string) => void;
}

const FieldActionsComponent: FC<Props> = ({ rowsAndColumns, gameMode, setRowsAndColumns, setGameMode }): ReactElement => {
  const { resetActiveRole } = useContext(ActiveRoleContext);

  const changeFieldSize = (e: ChangeEvent<HTMLSelectElement>) => {
    resetActiveRole();
    setRowsAndColumns(parseInt(e.target.value, 10));
  };

  const changeGameMode = (e: ChangeEvent<HTMLSelectElement>) => {
    resetActiveRole();
    setGameMode(e.target.value);
  };

  const renderFieldSizeValues = (): Array<ReactElement> => {
    const sizes = [];
    for (let i = MIN_FIELD_SIZE; i <= MAX_FIELD_SIZE; i++) {
      sizes.push({ value: i, title: `${i} x ${i}` });
    }

    return sizes.map((item) => <option value={item.value} key={item.value.toString()}>{item.title}</option>);
  };

  const renderGameModeValues = (): Array<ReactElement> => {
    const modes = [
      { value: PVP_MODE, title: 'Player vs player' },
      { value: PVC_MODE, title: 'Player vs computer' },
    ];

    return modes.map((item) => <option value={item.value} key={item.value}>{item.title}</option>);
  };

  return (
    <div className={styles.fieldActions}>
      <FieldActionsSelectorComponent
      label={'Select field size'}
      selectName={'field size'}
      selectValue={rowsAndColumns}
      selectOptions={renderFieldSizeValues()}
      changeHandler={(e: ChangeEvent<HTMLSelectElement>) => changeFieldSize(e)}/>

      <FieldActionsSelectorComponent
      label={'Select game mode'}
      selectName={'game mode'}
      selectValue={gameMode}
      selectOptions={renderGameModeValues()}
      changeHandler={(e: ChangeEvent<HTMLSelectElement>) => changeGameMode(e)}/>

      <PlayerTurnInfoComponent/>
    </div>
  );
};

export default FieldActionsComponent;
