import React, { FC, ReactElement, useMemo } from 'react';
import styles from './cell.module.scss';
import { CellPosition } from '../Field.component';

interface Props {
  setCellValue: () => void;
  cellPosition: CellPosition;
  rowsAndColumnsCount: number;
  cellValue: string;
}

const CellComponent: FC<Props> = ({ setCellValue, rowsAndColumnsCount, cellValue}): ReactElement => {
  const cellSize = useMemo(() => {
    return {
      width: `calc(100% / ${rowsAndColumnsCount})`,
      height: `calc(100% / ${rowsAndColumnsCount})`,
    };
  }, [rowsAndColumnsCount]);

  return (
    <button className={styles.cell} style={cellSize} onClick={setCellValue}>
      {cellValue}
    </button>
  );
};

export default CellComponent;
