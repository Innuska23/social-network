import React, { useState } from "react";
import styles from "./Paginator.module.css";
import cn from "classname";

const Paginator = ({
  totalItemsCount,
  pageSize,
  currentPage,
  onPageChanged,
  portionSize = 10,
}) => {
  const pagesCount = Math.ceil(totalItemsCount / pageSize);
  const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);

  const portionCount = Math.ceil(pagesCount / portionSize);
  const [portionNumber, setPortionNumber] = useState(1);
  const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  const rightPortionPageNumber = Math.min(
    portionNumber * portionSize,
    pagesCount
  );

  return (
    <div className={styles.paginator}>
      {portionNumber > 1 && (
        <button
          className={styles.button}
          onClick={() => setPortionNumber(portionNumber - 1)}
        >
          Back
        </button>
      )}

      {pages
        .filter(
          (p) => p >= leftPortionPageNumber && p <= rightPortionPageNumber
        )
        .map((p) => (
          <button
            key={p}
            className={cn(styles.button, {
              [styles.selectedPage]: currentPage === p,
            })}
            onClick={() => onPageChanged(p)}
          >
            {p}
          </button>
        ))}

      {portionCount > portionNumber && (
        <button
          className={styles.button}
          onClick={() => setPortionNumber(portionNumber + 1)}
        >
          Next
        </button>
      )}
    </div>
  );
};

export default Paginator;
