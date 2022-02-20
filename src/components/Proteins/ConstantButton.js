import React from 'react';
import Typography from "@material-ui/core/Typography";
import { IconButton } from "@material-ui/core"
import EditIcon from "@material-ui/icons/Edit";
import MenuItem from "@material-ui/core/MenuItem";
import { ClickAwayListener, Grow, MenuList } from "@material-ui/core";
import Popper from "@material-ui/core/Popper";
import Paper from "@material-ui/core/Paper";

function SelectMenu(props) {
    //props: anchorEl, handleClose
    return (
        <Popper open={Boolean(props.anchorEl)} anchorEl={props.anchorEl} role={undefined} transition disablePortal style={{ zIndex: "1" }}>
            {({ TransitionProps, placement }) => (
                <Grow {...TransitionProps} style={{ transformOrigin: placement === "bottom" ? "center top" : "center bottom" }}>
                    <ClickAwayListener onClickAway={props.handleClose}>
                        <Paper elevation="1">{props.children}</Paper>
                    </ClickAwayListener>
                </Grow>
            )}
        </Popper>
    );
}


export default function ConstantButton(props) {
    const [anchorElCellType, setAnchorElCellType] = React.useState(null);
    const handleClickOpen = (event) => {
        setAnchorElCellType(event.currentTarget);
    };

    const handleClose = (event) => {
        setAnchorElCellType(null);
    };

    const handleMenuItemClickCellType = (value) => {
        props.handlerValue(value);
        setAnchorElCellType(null);
    };

    return (
        <React.Fragment>
            <IconButton
                disabled={typeof props.disabled === "undefined" ? false : props.disabled}
                variant="contained"
                color={isNaN(props.equation) ? "secondary" : "primary"}
                arial-label="enable function"
                component="span"
                edge="start"
                style={{ marginLeft: "-24px", padding: "0" }}
                onClick={handleClickOpen}
            >
                <EditIcon />
            </IconButton>

            <SelectMenu anchorEl={anchorElCellType} handleClose={handleClose}>
                <MenuList autoFocusItem={Boolean(anchorElCellType)} id="menu-list-grow">
                    {props.constants.map((item, i) => (
                        <MenuItem key={item} onClick={() => handleMenuItemClickCellType(item)}>
                            <Typography variant="h5">{item}</Typography>
                        </MenuItem>
                    ))}
                </MenuList>
            </SelectMenu>
        </React.Fragment>
    );
}