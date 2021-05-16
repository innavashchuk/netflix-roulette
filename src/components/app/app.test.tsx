import * as renderer from 'react-test-renderer';
import * as React from 'react';
import App from './App';

test('App is initialized', () => {
    const appComponent = renderer.create(<App Router={null} context="" location="" store={null}/>);
    const appTree = appComponent.toJSON();
    expect(appTree).toMatchSnapshot();
});
