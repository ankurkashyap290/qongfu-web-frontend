import React, { FunctionComponent } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import useStyles from "../../Styles/index";

interface Props {
  title?: string;
  description: string;
  handleAddNewClick?: Function;
  showAddNew?: boolean;
  isMobile?: boolean;
  showTitle?: boolean;
}

const NoResultFound: FunctionComponent<Props> = props => {
  const classes = useStyles();
  const { title, description, handleAddNewClick, showAddNew, isMobile, showTitle } = props;

  return (
    <React.Fragment>
      <Typography variant="h4" className={classes.noResultFoundTitle}>
        {showTitle ? title : ""}
      </Typography>
      <img className={classes.img} alt="complex" src="/assets/img/no-result.png" />
      <Typography variant="h4" className={classes.newPlace}>
        {description}
      </Typography>
      <div>
        {isMobile ? (
          <Typography variant="body2" className={classes.newPlaceAdd}>
            Would you like to help us Add it?
          </Typography>
        ) : (
          <span className={classes.newPlaceAdd}>Would you like to help us Add it?</span>
        )}
        {showAddNew && handleAddNewClick ? (
          <Button onClick={() => handleAddNewClick()} className={classes.addNewPlaceBtn}>
            Add New Place
          </Button>
        ) : null}
      </div>
    </React.Fragment>
  );
};

export default NoResultFound;
