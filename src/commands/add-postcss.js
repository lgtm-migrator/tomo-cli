import {
    allDoNotExist,
    install,
    PackageJsonEditor,
    PostcssConfigEditor,
    someDoExist
} from '../utils';

const POSTCSS_DEPENDENCIES = [
    'cssnano',
    'postcss-cli',
    'postcss-reporter',
    'postcss-safe-parser',
    'postcss-import',
    'postcss-cssnext',
    'stylelint',
    'uncss'
];
const pkg = new PackageJsonEditor();
const cfg = new PostcssConfigEditor();
/** @ignore */
export const tasks = [
    {
        text: 'Create PostCSS config file',
        task: async () => {
            await cfg.create().commit();
        },
        condition: () => allDoNotExist('postcss.config.js')
    },
    {
        text: 'Install PostCSS dependencies',
        task: ({skipInstall}) => install([POSTCSS_DEPENDENCIES], {dev: true, skipInstall}),
        condition: () => someDoExist('package.json')
    },
    {
        text: 'Add PostCSS tasks to package.json',
        task: () => pkg.extend({

        }),
        condition: () => someDoExist('package.json')
    }
];
export default tasks;