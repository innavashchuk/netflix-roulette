import * as React from 'react';
import { Alert, Color } from '@material-ui/lab';
import { useDispatch, useSelector } from 'react-redux';
import './custom-alert.scss';
import { setAlert } from '../../redux/actions';
import { selectAlertMessage, selectAlertType } from '../../redux/selectors';

export const CustomAlert = (): React.ReactElement => {
  const alertMessage = useSelector(selectAlertMessage);
  const alertType = useSelector(selectAlertType);
  const dispatch = useDispatch();

  const handleAlertClose = () => {
    dispatch(setAlert({
      type: null,
      message: null
    }))
  };

  return (
    alertMessage
    ? <Alert severity={alertType as Color} className="custom-alert" onClose={handleAlertClose}>
      {alertMessage}
    </Alert>
    : null)
}
