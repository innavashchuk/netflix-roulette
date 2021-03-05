import * as React from 'react';
import Footer from '../../components/footer/Footer';
import Header from '../header/Header';
import SearchHeader from '../search-header/Search-Header';
import ErrorBoundary from '../../components/error-boundary/Error-Boundary';
import Main from '../main/Main';
import './app.scss';

export interface AppState {
  searchValue: string
}

class App extends React.Component<Record<string, unknown>, AppState> {
  constructor(props: Record<string, unknown>) {
    super(props);
    this.state = {
      searchValue: ''
    }
  }

  render(): React.ReactElement {
    return (
      <div className="app-container">
        <ErrorBoundary>
        <div className="app-container__inner">
          <Header>
            <SearchHeader />
          </Header>
          <Main searchValue={this.state.searchValue} />
        </div>
        </ErrorBoundary>
        <Footer />
      </div>
    );
  }
};

export default App;
