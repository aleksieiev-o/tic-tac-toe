import React, { FC, ReactElement, useContext, useEffect, useMemo, useReducer, useState } from 'react';
import styles from './field.module.scss';
import CellComponent from './Cell/Cell.component';
import FieldActionsComponent from './FieldActions/FieldActions.component';
import { ActiveRole, ActiveRoleContext } from '../../Providers/ActiveRoleContext.provider';

export const MIN_FIELD_SIZE = 3;
export const MAX_FIELD_SIZE = 20;
export const PVP_MODE = 'PVP';
export const PVC_MODE = 'PVC';

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

// TODO Delete unused param. fieldSize
const createField = (rowsAndColumns: number, fieldSize: number): Field => {
  const field: Field = [];

  for (let cell = 0; cell < rowsAndColumns; cell++) {
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

  switch (action.type) {
    case FieldActions.SET_CELL_VALUE: {
      getCell(state, cellPosition).value = value;
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

  const [started, setStarted] = useState<boolean>(false);
  const [rowsAndColumns, setRowsAndColumns] = useState<number>(MIN_FIELD_SIZE);
  const [gameMode, setGameMode] = useState<string>(PVP_MODE);

  const fieldSize = useMemo((): number => (rowsAndColumns * rowsAndColumns), [rowsAndColumns]);

  const [state, dispatch] = useReducer(changeFieldReducer, createField(rowsAndColumns, fieldSize));

  useEffect(() => {
    if (started) {
      dispatch({ type: FieldActions.CREATE_FIELD, payload: { cellPosition: {x: 0, y: 0}, value: CellValue.EMPTY_VALUE, fieldSize, rowsAndColumns }});
    }
  }, [fieldSize, gameMode]);

  const checkRowWin = (cell: Cell): boolean => state[cell.cellPosition.x].every((item: Cell) => item.value === activeRole as string);

  const checkColumnWin = (cell: Cell): boolean => {
    return state
      .flat()
      .filter((item: Cell) => item.cellPosition.y === cell.cellPosition.y)
      .every((item: Cell) => item.value === activeRole as string);
  };

  const checkLeftRightDiagonalWin = (): boolean => {
    const cellList: FieldRow = [];

    for (let rowIdx = 0; rowIdx < state.length; rowIdx++) {
      cellList.push(state[rowIdx][rowIdx]);
    }

    return cellList.every((item: Cell) => item.value === activeRole as string);
  };

  const checkRightLeftDiagonalWin = (): boolean => {
    const cellList: FieldRow = [];
    let rowIdx = 0;

    for (let cellIdx = rowsAndColumns - 1; cellIdx >= 0; cellIdx--) {
      cellList.push(state[rowIdx][cellIdx]);
      rowIdx++;
    }

    return cellList.every((item: Cell) => item.value === activeRole as string);
  };

  const checkWin = (cellPosition: CellPosition): boolean => {
    const cell: Cell = getCell(state, cellPosition);

    if (checkRowWin(cell)) return true;
    else if (checkColumnWin(cell)) return true;
    else if (checkLeftRightDiagonalWin()) return true;
    else if (checkRightLeftDiagonalWin()) return true;
    return false;
  };

  const setCellValue = (cellPosition: CellPosition) => {
    const cell: Cell = getCell(state, cellPosition);

    if (cell.value === CellValue.EMPTY_VALUE) {
      setStarted(true);
      // TODO Fix rerender all cell items after update cellValue
      const value = activeRole === ActiveRole.CROSS_ROLE ? CellValue.CROSS_VALUE : CellValue.NULL_VALUE;
      dispatch({ type: FieldActions.SET_CELL_VALUE, payload: { cellPosition, value, fieldSize, rowsAndColumns }});

      setTimeout(() => {
        checkWin(cellPosition);
        toggleActiveRole();
      }, 0);
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

  const changeFieldSize = (rowsAndColumns: number): void => {
    setStarted(true);
    setRowsAndColumns(rowsAndColumns);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <FieldActionsComponent
        gameMode={gameMode}
        rowsAndColumns={rowsAndColumns}
        setRowsAndColumns={changeFieldSize}
        setGameMode={setGameMode}/>

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
