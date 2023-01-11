import React, { ChangeEvent, FC, ReactElement, useContext, useMemo, useState } from 'react';
import styles from './field.module.scss';
import CellComponent from './Cell/Cell.component';
import { ActiveRoleContext } from '../../Providers/ActiveRoleContext.provider';

const FieldComponent: FC = (): ReactElement => {
  const [rowsAndColumns, setRowsAndColumns] = useState<number>(3);
  const { resetActiveRole } = useContext(ActiveRoleContext);

  const changeFieldSize = (e: ChangeEvent<HTMLSelectElement>) => {
    const rowsAndColumns: number = parseInt(e.target.value, 10);
    resetActiveRole();
    setRowsAndColumns(rowsAndColumns);
  };

  const fieldSize = useMemo((): number => (rowsAndColumns * rowsAndColumns), [rowsAndColumns]);

  const renderCells = useMemo((): Array<ReactElement>=> {
    const cells = [];

    for (let i = 0; i < fieldSize; i++) {
      const id = i.toString();
      cells.push(<CellComponent id={id} rowsAndColumnsCount={rowsAndColumns} fieldSize={fieldSize} key={id}/>);
    }

    return cells;
  }, [fieldSize]);

  const renderFieldSizeValues = (): Array<ReactElement> => {
    const sizes = [3, 4, 5, 6, 7, 8, 9, 10];

    return sizes.map((item) => <option value={item} key={item.toString()}>{item}</option>);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.fieldActions}>
          <div className={styles.fieldOptions}>
            <label htmlFor="fieldSize">Set field size</label>

            <select onChange={changeFieldSize} className={styles.fieldSize} name="fieldSize" id="fieldSize" value={rowsAndColumns}>
              {
                renderFieldSizeValues()
              }
            </select>
          </div>
        </div>

        <div className={styles.field}>
          {
            renderCells
          }
        </div>
      </div>
    </div>
  );
};

export default FieldComponent;
