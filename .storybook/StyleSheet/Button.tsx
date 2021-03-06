import {Component, createElement as h} from 'react';
import StyleSheet from '../../src/StyleSheet';

const styles = StyleSheet.create({
    container: {
        ta: 'center',
    },
    button: {
        background: 'red',
        width: '320px',
        padding: '20px',
        borderRadius: '5px',
        border: 'none',
        outline: 'none',
        '&:hover': {
            color: '#fff',
        },
        '&:active': {
            position: 'relative',
            top: '2px',
        },
        '@media (max-width: 480px)': {
            width: '160px',
        },
    },
});

class Button extends Component<any, any> {
    render() {
        // prettier-ignore
        return h('div', {className: styles.container},
          h('button', {className: styles.button},
            'This is button'
          )
        );
    }
}

export default Button;
