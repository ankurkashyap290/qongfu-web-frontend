import React, { FunctionComponent } from "react";
import Button from "@material-ui/core/Button";
import HighlightOffTwoToneIcon from "@material-ui/icons/HighlightOffTwoTone";
import useStyles from "../../Styles/components/advanceSearch";

interface Props {
  data: any;
  handleSetFilters: Function;
}

const YourSelections: FunctionComponent<Props> = props => {
  const classes = useStyles();
  const handleDelete = (item: string) => {
    props.handleSetFilters(item);
  };

  const { data } = props;

  return (
    <React.Fragment>
      {data.length > 0
        ? data.map(
            //@ts-ignore
            (item, index) => {
              return (
                <Button
                  key={`item-${index}`}
                  startIcon={<HighlightOffTwoToneIcon />}
                  onClick={() => handleDelete(item)}
                  disableRipple
                  classes={{
                    label: classes.checkboxLabel,
                    root: classes.advanceSearchSelectionRoot,
                    textPrimary: classes.advanceSearchTextPrimary,
                  }}
                >
                  {item}
                </Button>
              );
            }
          )
        : null}
    </React.Fragment>
  );
};

export default YourSelections;
