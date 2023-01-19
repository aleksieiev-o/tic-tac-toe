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

export interface CellPosition {
  x: number;
  y: number;
}

interface Cell {
  cellPosition: CellPosition;
  fieldSize: number;
  rowsAndColumns: number;
  value: CellValue;
}

type Field = Array<Array<Cell>>;
type FieldRow = Array<Cell>;

interface FieldAction {
  type: FieldActions;
  payload: Cell;
}

const createField = (rowsAndColumns: number, fieldSize: number): Field => {
  const field: Field = [];

  for (let cell = 0; cell < fieldSize; cell++) {
    const row: FieldRow = [];

    for (let rowItem = 0; rowItem < rowsAndColumns; rowItem++) {
      const cellPosition: CellPosition = { x: cell, y: rowItem };

      row.push({ cellPosition, value: CellValue.EMPTY_VALUE, fieldSize, rowsAndColumns });
    }

    field.push(row);
  }

  return field;
};

const getCell = (field: Field, cellPosition: CellPosition): Cell => {
  return field[cellPosition.x][cellPosition.y];
};

const changeFieldReducer = (state: Field, action: FieldAction) => {
  const {cellPosition, value, fieldSize, rowsAndColumns} = action.payload;
  const cell = getCell(state, cellPosition);

  switch (action.type) {
    case FieldActions.SET_CELL_VALUE: {
      if (cell.value === CellValue.EMPTY_VALUE) {
        getCell(state, cellPosition).value = value;
      }
      return state;
    }
    case FieldActions.CREATE_FIELD: {
      return createField(rowsAndColumns, fieldSize);
    }
    default: return state;
  }
};

const FieldComponent: FC = (): ReactElement => {
  const { activeRole, toggleActiveRole } = useContext(ActiveRoleContext);
  const [rowsAndColumns, setRowsAndColumns] = useState<number>(3);
  const fieldSize = useMemo((): number => (rowsAndColumns * rowsAndColumns), [rowsAndColumns]);

  const [state, dispatch] = useReducer(changeFieldReducer, createField(rowsAndColumns, fieldSize));

  useEffect(() => {
    // TODO Fix rerender during first render
    dispatch({ type: FieldActions.CREATE_FIELD, payload: { cellPosition: {x: 0, y: 0}, value: CellValue.EMPTY_VALUE, fieldSize, rowsAndColumns }});
  }, [fieldSize]);

  const checkRowWin = (cell: Cell): boolean => {
    // eslint-disable-next-line no-console
    console.log(111, cell);
    return false;
  };

  const checkColumnWin = (cell: Cell): boolean => {
    return false;
  };

  const checkDiagonalLeftWin = (cell: Cell): boolean => {
    return false;
  };

  const checkDiagonalRightWin = (cell: Cell): boolean => {
    return false;
  };

  const checkWin = (cell: Cell): boolean => {
    if (checkRowWin(cell)) return true;
    else if (checkColumnWin(cell)) return true;
    else if (checkDiagonalLeftWin(cell)) return true;
    else if (checkDiagonalRightWin(cell)) return true;
    return false;
  };

  const setCellValue = (cellPosition: CellPosition) => {
    const cell: Cell = getCell(state, cellPosition);

    if (cell.value === CellValue.EMPTY_VALUE) {
      // TODO Fix rerender all cell items after update cellValue
      const value = activeRole === ActiveRole.CROSS_ROLE ? CellValue.CROSS_VALUE : CellValue.NULL_VALUE;
      dispatch({ type: FieldActions.SET_CELL_VALUE, payload: { cellPosition, value, fieldSize, rowsAndColumns }});

      if (!checkWin(getCell(state, cellPosition))) {
        toggleActiveRole();
      }
    }
  };

  const renderCells = () => {
    return state.map((row: FieldRow) => {
      return row.map((item: Cell) => {
        const {cellPosition, value} = item;

        return <CellComponent
          setCellValue={() => setCellValue(cellPosition)}
          cellPosition={cellPosition}
          rowsAndColumnsCount={rowsAndColumns}
          cellValue={value}
          key={`${cellPosition.x}-${cellPosition.y}`}/>;
      });
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
