import React, { ChangeEvent, FC, ReactElement, useContext } from 'react';
import styles from './field-size.module.scss';
import { ActiveRoleContext } from '../../../Providers/ActiveRoleContext.provider';

interface Props {
  rowsAndColumns: number;
  setRowsAndColumns: (rowsAndColumns: number) => void;
}

const FieldSizeComponent: FC<Props> = ({ rowsAndColumns, setRowsAndColumns }): ReactElement => {
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
    <div className={styles.fieldOptions}>
      <label htmlFor="fieldSize">Set field size</label>

      <select onChange={changeFieldSize} className={styles.fieldSize} name="fieldSize" id="fieldSize" value={rowsAndColumns}>
        {
          renderFieldSizeValues()
        }
      </select>
    </div>
  );
};

export default FieldSizeComponent;
