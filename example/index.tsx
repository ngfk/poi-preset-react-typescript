import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

const render = (Component: any, container: HTMLElement) => {
    ReactDOM.render(
        <AppContainer>
            <Component />
        </AppContainer>,
        container
    );
};

const main = async () => {
    const container = document.getElementById('app');
    if (!container) throw new Error('No element with id "app" found');

    // Initial render
    const { App: InitialApp } = await import('./containers/App');
    render(InitialApp, container);

    // Re-render on hot module updates
    if (module.hot) {
        module.hot.accept('./containers/App', async () => {
            const { App: NextApp } = await import('./containers/App');
            render(NextApp, container);
        });
    }
};

main();
