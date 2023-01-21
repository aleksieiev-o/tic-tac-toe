import React, { ChangeEvent, FC, ReactElement, useContext } from 'react';
import styles from './field-actions.module.scss';
import FieldActionsSelectorComponent from './FieldActionsSelector.component';
import PlayerTurnInfoComponent from './PlayerTurnInfo.component';
import { ActiveRoleContext } from '../../../Providers/ActiveRoleContext.provider';

interface Props {
  rowsAndColumns: number;
  setRowsAndColumns: (rowsAndColumns: number) => void;
}

const FieldActionsComponent: FC<Props> = ({ rowsAndColumns, setRowsAndColumns }): ReactElement => {
  const { resetActiveRole } = useContext(ActiveRoleContext);

  const changeFieldSize = (e: ChangeEvent<HTMLSelectElement>) => {
    const rowsAndColumns: number = parseInt(e.target.value, 10);
    resetActiveRole();
    setRowsAndColumns(rowsAndColumns);
  };

  const renderFieldSizeValues = (): Array<ReactElement> => {
    const sizes = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

    return sizes.map((item) => <option value={item} key={item.toString()}>{item} x {item}</option>);
  };

  return (
    <div className={styles.fieldActions}>
      <FieldActionsSelectorComponent
      label={'Set field size'}
      selectName={'fieldSize'}
      selectValue={rowsAndColumns}
      selectOptions={renderFieldSizeValues()}
      changeHandler={(e: ChangeEvent<HTMLSelectElement>) => changeFieldSize(e)}/>

      <PlayerTurnInfoComponent/>
    </div>
  );
};

export default FieldActionsComponent;
