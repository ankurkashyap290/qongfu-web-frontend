import React, { FunctionComponent } from "react";
import { IconButton } from "@material-ui/core";

import {
  ActiveRightDirection,
  InactiveLeftDirection,
  InactiveRightDirection,
  ActiveLeftDirection,
} from "../CustomIcon";

interface Props {
  totalPage: number;
  page: number;
  handleChange: (page: number, mode?: string) => void;
}

const PaginationView: FunctionComponent<Props> = ({ page = 1, totalPage = 0, handleChange }) => {
  const handlePreviousPage = () => {
    const newPage = page - 1;
    if (newPage >= 0) {
      handleChange(newPage, "prev");
    }
  };

  const handleNextPage = () => {
    const newPage = page + 1;
    if (newPage <= totalPage) {
      handleChange(newPage, "next");
    }
  };

  const isFirstPage = page === 1 ? true : false;
  const isLastPage = page >= totalPage ? true : false;
  return (
    <div>
      <IconButton
        disabled={isFirstPage}
        onClick={handlePreviousPage}
        style={{ padding: 0, marginRight: 10 }}
      >
        {isFirstPage ? (
          <InactiveLeftDirection style={{ fontSize: 30 }} />
        ) : (
          <ActiveLeftDirection style={{ fontSize: 30 }} />
        )}
      </IconButton>
      <IconButton disabled={isLastPage} onClick={handleNextPage} style={{ padding: 0 }}>
        {isLastPage ? (
          <InactiveRightDirection style={{ fontSize: 30 }} />
        ) : (
          <ActiveRightDirection style={{ fontSize: 30 }} />
        )}
      </IconButton>
    </div>
  );
};

export default PaginationView;
