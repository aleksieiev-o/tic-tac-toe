import React, { FC, ReactElement, useContext, useEffect, useMemo, useReducer, useState } from 'react';
import styles from './field.module.scss';
import CellComponent from './Cell/Cell.component';
import FieldActionsComponent from './FieldActions/FieldActions.component';
import { ActiveRole, ActiveRoleContext } from '../../Providers/ActiveRoleContext.provider';

export enum CellValue {
  EMPTY_VALUE = '',
  CROSS_VALUE = 'X',
  NULL_VALUE = '0',
}

enum FieldActions {
  CREATE_FIELD,
  SET_CELL_VALUE,
}

interface Cell {
  position: string;
  fieldSize: number;
  value: CellValue;
}

interface FieldAction {
  type: FieldActions;
  payload: Cell;
}

const createField = (fieldSize: number): Array<Cell> => {
  const field: Array<Cell> = [];

  for (let i = 0; i < fieldSize; i++) {
    const position = i.toString();
    field.push({ position, value: CellValue.EMPTY_VALUE, fieldSize });
  }

  return field;
};

const changeFieldReducer = (state: Array<Cell>, action: FieldAction) => {
  const {position, value, fieldSize} = action.payload;
  const cell: Cell = state[parseInt(position, 10)];

  switch (action.type) {
    case FieldActions.SET_CELL_VALUE: {
      if (cell.value === CellValue.EMPTY_VALUE) {
        state[parseInt(position, 10)].value = value;
      }
      return state;
    }
    case FieldActions.CREATE_FIELD: {
      return createField(fieldSize);
    }
    default: return state;
  }
};

const FieldComponent: FC = (): ReactElement => {
  const { activeRole, toggleActiveRole } = useContext(ActiveRoleContext);
  const [rowsAndColumns, setRowsAndColumns] = useState<number>(3);
  const fieldSize = useMemo((): number => (rowsAndColumns * rowsAndColumns), [rowsAndColumns]);

  const [state, dispatch] = useReducer(changeFieldReducer, createField(fieldSize));

  useEffect(() => {
    // TODO Fix rerender during first render
    dispatch({ type: FieldActions.CREATE_FIELD, payload: { position: '0', value: CellValue.EMPTY_VALUE, fieldSize }});
  }, [fieldSize]);

  const setCellValue = (position: string) => {
    const cell: Cell = state[parseInt(position, 10)];

    if (cell.value === CellValue.EMPTY_VALUE) {
      // TODO Fix rerender all cell items after update cellValue
      const value = activeRole === ActiveRole.CROSS_ROLE ? CellValue.CROSS_VALUE : CellValue.NULL_VALUE;
      dispatch({ type: FieldActions.SET_CELL_VALUE, payload: { position, value, fieldSize }});
      toggleActiveRole();
    }
  };

  const renderCells = () => {
    return state.map((item) => {
      const {position, value} = item;

      return <CellComponent
        setCellValue={() => setCellValue(position)}
        position={position}
        rowsAndColumnsCount={rowsAndColumns}
        cellValue={value}
        key={position}/>;
    });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <FieldActionsComponent rowsAndColumns={rowsAndColumns} setRowsAndColumns={(rowsAndColumns: number) => setRowsAndColumns(rowsAndColumns)}/>

        <div className={styles.field}>
          {
            renderCells()
          }
        </div>
      </div>
    </div>
  );
};

export default FieldComponent;
