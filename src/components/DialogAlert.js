import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


function DialogAlert(props) {

    return (
        <Dialog
            open={props.open}
            onClose={props.handleCancel}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    { props.message }
              </DialogContentText>
            </DialogContent>
            <DialogActions>
                {typeof props.handleCancel !== "undefined" &&  <Button onClick={props.handleCancel} color="primary">
                    Cancel
                </Button>}
                {typeof props.handleOk !== "undefined" &&  <Button onClick={props.handleOk} color="primary" autoFocus>
                    OK
              </Button>}
            </DialogActions>
        </Dialog>
    );
}

export default DialogAlert;