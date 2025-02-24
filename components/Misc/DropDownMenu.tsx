import React, { FunctionComponent, useRef, useState, useEffect } from "react";
import { Button, Popper, Grow, Paper, MenuList, MenuItem, ListItemIcon } from "@material-ui/core";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import useStyles from "../../Styles/components/Misc/DropDownMenu";
import clsx from "clsx";

interface Props {
  data: any;
  label: any;
  selected: string;
  onItemClick: Function;
}
const DropDownMenu: FunctionComponent<Props> = ({ data, label, selected, onItemClick }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = event => {
    // @ts-ignore
    if (anchorRef && anchorRef.current && anchorRef!.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }
  const handleItemClick = item => {
    onItemClick(item);
    setOpen(false);
  };

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      // @ts-ignore
      anchorRef && anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  return (
    <div>
      <Button
        ref={anchorRef}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        variant="contained"
        className={classes.whiteButton}
        size="small"
        disableRipple
      >
        {label}{" "}
        {open ? (
          <ArrowDropUpIcon className={classes.dropDownIcon} />
        ) : (
          <ArrowDropDownIcon className={classes.dropDownIcon} />
        )}
      </Button>
      <Popper
        style={{ zIndex: 1 }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: placement === "bottom" ? "center top" : "center bottom" }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                  {data.map(item => (
                    <MenuItem
                      className={clsx(
                        classes.menuItem,
                        selected === item.value ? classes.menuItemSelected : ""
                      )}
                      key={`dp_${item.value}`}
                      onClick={() => handleItemClick(item)}
                    >
                      <div>
                        {item.icon ? (
                          <ListItemIcon style={{ verticalAlign: "middle" }}>
                            {item.icon}
                          </ListItemIcon>
                        ) : null}
                        {item.label}
                      </div>
                      {item.rightIcon ? (
                        <ListItemIcon style={{ marginLeft: 10 }}>{item.rightIcon}</ListItemIcon>
                      ) : null}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
};

export default DropDownMenu;
