import {kebabCase} from '../util';
import atoms from './atoms';
import interpolateSelectors from './interpolateSelectors';
import valueToString from './valueToString';

export type TStyles = object;

export type TAtrulePrelude = string;
export type TSelectors = string;
export type TPseudo = string; // `:hover` part of the selector
export type TProperty = string;
export type TValue = string;

export type TDeclaration = [TProperty, TValue];
export type TDeclarations = TDeclaration[];
export type TRule = [TSelectors, TDeclarations];
export type TRules = TRule[];
export type TAtrule = {
    type: 'Atrule';
    prelude: TAtrulePrelude;
    rules: TRules;
};
export type TStyleSheet = (TRule | TAtrule)[];

const REG_NESTED = /^\$/;

/**
 * Converts external POJSO IStyles style description into internal stylesheet AST representation.
 * @param {TStyles} pojso
 * @returns {Array}
 */
const toStyleSheet: (pojso: TStyles) => TStyleSheet = pojso => {
    let stylesheet = [];

    for (let selector in pojso) {
        let values = pojso[selector];

        // Atrule: @media, @keyframe, ...
        if (selector[0] === '@') {
            stylesheet.push({
                type: 'Atrule',
                prelude: selector,
                rules: toStyleSheet(values),
            });
            continue;
        }

        const selectors = selector.split(',');
        let styles = values;

        const declarations = [];
        const rule = [selector, declarations];
        for (let prop in styles) {
            let value = styles[prop];

            // `$` sugar syntax for immediatelly nested rules.
            if (REG_NESTED.test(prop)) {
                // prop = prop.replace('$', '& > .');
                prop = prop.replace('$', '& .');
            }

            switch (typeof value) {
                case 'string':
                case 'number':
                    prop = atoms[prop] || kebabCase(prop);
                    declarations.push([prop, valueToString(value, prop)]);
                    break;
                case 'object': {
                    let selectorsInterpolated = interpolateSelectors(selectors, prop);
                    stylesheet = stylesheet.concat(toStyleSheet({[selectorsInterpolated]: value}));
                    break;
                }
            }
        }
        if (declarations.length) stylesheet.push(rule);
    }

    return stylesheet;
};

export default toStyleSheet;
