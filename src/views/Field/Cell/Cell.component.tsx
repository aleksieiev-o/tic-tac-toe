import React, { FC, ReactElement, useMemo } from 'react';
import styles from './cell.module.scss';

interface Props {
  setCellValue: () => void;
  position: string;
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
    <div className={styles.cell} style={cellSize} onClick={setCellValue}>
      {cellValue}
    </div>
  );
};

export default CellComponent;
