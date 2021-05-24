import * as React from 'react'
import { useSelector } from 'react-redux';
import { selectIsLoading } from '../../redux/selectors';
import './custom-loader.scss';

export const CustomLoader = (): React.ReactElement => {
  const isLoading = useSelector(selectIsLoading);
  return isLoading
    ? <div className="spinner-container">
      <div className="spinner-box">
        <div className="configure-border-1">
          <div className="configure-core" />
        </div>
        <div className="configure-border-2">
          <div className="configure-core" />
        </div>
      </div>
    </div>
    : null
}
