import * as React from 'react';
import useRouter from '../../hooks/use-router';
import Footer from '../footer/Footer';
import Logo from '../logo/Logo';
import {NavLink} from 'react-router-dom';
import './error-page.scss';

const ErrorPage = (): React.ReactElement => {
    const router = useRouter();

    return (
        <div className="app-container">
            <div className="app-container__inner">
                <div className="error-header">
                    <Logo/>
                </div>
                <div className="error-main">
                    <h1>Page Not Found</h1>
                    <p className="error-type">404</p>
                    <NavLink to="/" exact>
                        <button className="button-secondary">GO BACK TO HOME</button>
                    </NavLink>
                </div>
            </div>
            <Footer/>
        </div>
    )
};

export default ErrorPage;
