import {Component, createElement as h} from 'react';
import {render} from 'react-dom';
import {css, getRenderer, setRenderer} from '../../freestyler/src';
import CssReset from '../../freestyler/src/globals/CssResetTripoli';
import logger from '../../freestyler/src/middleware/logger';
import createCssVarsRenderer from '../../freestyler/src/renderers/createBasicCssVarsRenderer';

const renderer = createCssVarsRenderer();
renderer.use(logger);
setRenderer(renderer);

const Box = css.div(
    {
        bg: 'tomato',
        col: '#fff',
        w: '100px',
        h: '100px',
        '.nested': {
            col: 'red',
        },
        '@media(screen)': {
            col: 'blue',
        },
    },
    {
        bd: '1px solid blue',
    }
);

class App extends Component {
    render() {
        // prettier-ignore
        return h('div', {},
            h(CssReset),
            h(Box, {}, '1'),
            h(Box, {}, '2'),
        );
    }
}

render(h(App), document.body);
