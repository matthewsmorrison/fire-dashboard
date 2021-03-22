import React from 'react'
import { withStyles, createStyles, Theme } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogContent from '@material-ui/core/DialogContent'
import MuiDialogActions from '@material-ui/core/DialogActions'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Typography from '@material-ui/core/Typography'

const styles = ({ palette, spacing }: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: spacing(2),
      userSelect: 'none'
    },
    closeButton: {
      position: 'absolute',
      right: spacing(1),
      top: spacing(1),
      color: palette.grey[500]
    }
  })

interface DialogTitleProps {
  children: any
  classes: any
  onClose: any
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  )
})

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiDialogContent)

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1)
  }
}))(MuiDialogActions)

interface CustomDialogProps {
  open: boolean
  handleClose: () => void
  handleSave: () => void
  title: string
  children: any
  buttonText?: string
}

const CustomDialog: React.FC<CustomDialogProps> = ({
  open,
  handleClose,
  title,
  children,
  handleSave,
  buttonText
}: CustomDialogProps) => {
  return (
    <div>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle onClose={handleClose}>{title}</DialogTitle>
        <DialogContent dividers>{children}</DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleSave} color="primary">
            {buttonText ? buttonText : 'Save changes'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default CustomDialog
