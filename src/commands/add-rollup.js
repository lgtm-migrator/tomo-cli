import {
    PackageJsonEditor,
    RollupConfigEditor,
    install,
    uninstall
} from '../utils';
import {allDoNotExist, someDoExist} from '../utils/common';

const BUILD_DEPENDENCIES = [
    'cpy-cli',
    'del-cli',
    'npm-run-all'
];
const ROLLUP_DEPENDENCIES = [
    'rollup',
    'rollup-plugin-babel',
    'rollup-plugin-commonjs',
    'rollup-plugin-node-resolve',
    'rollup-plugin-replace'
];
/**
 * @type {task[]}
 * @see https://rollupjs.org/guide/en/
 */
export const addRollup = [
    {
        text: 'Create Rollup configuration file',
        task: async ({outputDirectory, sourceDirectory}) => {
            const input =  `'${sourceDirectory}/main.js'`;
            const output = {
                file: `'${outputDirectory}/bundle.min.js'`
            };
            await (new RollupConfigEditor())
                .create()
                .prepend(`import replace from 'rollup-plugin-replace'`)
                .prepend(`import resolve from 'rollup-plugin-node-resolve'`)
                .prepend(`import commonjs from 'rollup-plugin-commonjs'`)
                .prepend(`import babel from 'rollup-plugin-babel'`)
                .prepend(`/* eslint-disable max-len */`)
                .extend({input, output})
                .commit();
        },
        condition: () => allDoNotExist('webpack.config.js')
    },
    {
        text: 'Add build tasks to package.json',
        task: async ({outputDirectory, sourceDirectory}) => {
            const scripts = {
                copy: 'npm-run-all --parallel copy:assets copy:index',
                'copy:assets': `cpy './assets/!(css)/**/*.*' './assets/**/[.]*' ${outputDirectory} --parents --recursive`,
                'copy:index': `cpy './assets/index.html' ${outputDirectory}`,
                prebuild: `del-cli ${outputDirectory}/assets`,
                build: 'rollup -c',
                postbuild: 'npm run copy',
                'build:watch': `watch 'npm run build' ${sourceDirectory}`
            };
            await (new PackageJsonEditor())
                .extend({scripts})
                .commit();
        },
        condition: () => someDoExist('package.json')
    },
    {
        text: 'Install Rollup dependencies',
        task: ({skipInstall}) => install([...BUILD_DEPENDENCIES, ...ROLLUP_DEPENDENCIES], {dev: true, skipInstall}),
        condition: ({isNotOffline}) => isNotOffline && someDoExist('package.json')
    }
];
export const removeRollup = [
    {
        text: 'Delete Rollup configuration file',
        task: async () => {
            await (new RollupConfigEditor())
                .delete()
                .commit();
        },
        condition: () => someDoExist('rollup.config.js')
    },
    {
        text: 'Remove Rollup build tasks from package.json',
        task: async () => {
            const scripts = {
                copy: undefined,
                'copy:assets': undefined,
                'copy:index': undefined,
                prebuild: undefined,
                build: undefined,
                postbuild: undefined,
                'build:watch': undefined
            };
            await (new PackageJsonEditor())
                .extend({scripts})
                .commit();
        },
        condition: () => someDoExist('package.json')
    },
    {
        text: 'Uninstall Rollup dependencies',
        task: () => uninstall([...BUILD_DEPENDENCIES, ...ROLLUP_DEPENDENCIES]),
        condition: ({skipInstall}) => !skipInstall && someDoExist('package.json') && (new PackageJsonEditor()).hasAll(...ROLLUP_DEPENDENCIES),
        optional: ({skipInstall}) => !skipInstall
    }
];
export default addRollup;