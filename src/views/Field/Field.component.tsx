import React, { FC, ReactElement, useMemo, useState } from 'react';
import styles from './field.module.scss';
import CellComponent from './Cell/Cell.component';
import FieldActionsComponent from './FieldActions/FieldActions.component';

const FieldComponent: FC = (): ReactElement => {
  const [rowsAndColumns, setRowsAndColumns] = useState<number>(3);
  const fieldSize = useMemo((): number => (rowsAndColumns * rowsAndColumns), [rowsAndColumns]);

  const renderCells = useMemo((): Array<ReactElement>=> {
    const cells = [];

    for (let i = 0; i < fieldSize; i++) {
      const id = i.toString();
      cells.push(<CellComponent id={id} rowsAndColumnsCount={rowsAndColumns} fieldSize={fieldSize} key={id}/>);
    }

    return cells;
  }, [fieldSize]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <FieldActionsComponent rowsAndColumns={rowsAndColumns} setRowsAndColumns={setRowsAndColumns}/>

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
