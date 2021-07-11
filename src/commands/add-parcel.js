import {
    PackageJsonEditor,
    PurgecssConfigEditor,
    allDoExist,
    allDoExistSync,
    debug,
    install,
    uninstall
} from '../api';

const DISABLED = () => false;
const DEPLOY_SCRIPTS = {
    predeploy: 'npm-run-all clean build:es build:css copy:assets',
    deploy: 'echo \"Not yet implemented - now.sh or surge.sh are supported out of the box\" && exit 1'
};
const BUILD_DEPENDENCIES = [
    'cpy-cli',
    'del-cli',
    'npm-run-all'
];
const PARCEL_DEPENDENCIES = [
    'parcel@next',
    'parcel-plugin-purgecss'
];
/**
 * @type {task[]}
 * @see https://parceljs.org/
 */
export const addParcel = [
    {
        text: 'Add Parcel build tasks to package.json',
        task: async ({assetsDirectory, outputDirectory, port}) => {
            const scripts = {
                ...DEPLOY_SCRIPTS,
                clean: `del-cli ${outputDirectory}`,
                copy: 'npm-run-all --parallel copy:assets copy:index',
                'copy:assets': `cpy \"${assetsDirectory}/!(css)/**/*.*\" \"${assetsDirectory}/**/[.]*\" ${outputDirectory} --parents --recursive`,
                'copy:index': `cpy \"${assetsDirectory}/index.html\" ${outputDirectory}`,
                'prebuild:es': 'npm run clean',
                'build:es': `parcel build --dist-dir ${outputDirectory} --public-url ./ ${assetsDirectory}/index.html`,
                'watch:assets': `watch \"npm run copy\" ${assetsDirectory}`,
                'prewatch:es': 'npm run clean',
                'watch:es': `npm run build:es`,
                serve: `parcel ${assetsDirectory}/index.html --dist-dir ${outputDirectory} --port ${port} --open`,
                start: 'npm-run-all --parallel watch:assets serve'
            };
            await (new PackageJsonEditor())
                .extend({scripts})
                .commit();
        },
        condition: () => allDoExist('package.json')
    },
    {
        text: 'Configure dev task',
        task: async ({skipInstall}) => {
            const scripts = {
                dev: 'stmux [ \"npm run watch:es\" : \"npm run lint:ing\" ]'
            };
            try {
                await install(['stmux'], {dev: true, skipInstall});
            } catch (err) {
                await debug(err, 'Failed to install stmux');
            }
            await (new PackageJsonEditor())
                .extend({scripts})
                .commit();
        },
        condition: () => allDoExist('package.json', '.eslintrc.js'),
        optional: () => allDoExistSync('package.json', '.eslintrc.js')
    },
    {
        text: 'Create PurgeCSS config file',
        task: async ({assetsDirectory}) => {
            const content = [`'${assetsDirectory}/index.html'`];
            await (new PurgecssConfigEditor())
                .create()
                .extend({content})
                .commit();
        },
        condition: DISABLED,
        optional: DISABLED
    },
    {
        text: 'Install Parcel development dependencies',
        task: ({skipInstall}) => install([...BUILD_DEPENDENCIES, ...PARCEL_DEPENDENCIES], {dev: true, skipInstall}),
        condition: ({skipInstall}) => !skipInstall && allDoExist('package.json')
    }
];
export const removeParcel = [
    {
        text: 'Remove Parcel build tasks from package.json',
        task: async () => {
            const scripts = {
                clean: undefined,
                copy: undefined,
                'copy:assets': undefined,
                'copy:index': undefined,
                'watch:assets': undefined,
                dev: undefined,
                'prebuild:es': undefined,
                'build:es': undefined,
                'prewatch:es': undefined,
                'watch:es': undefined,
                serve: undefined,
                start: undefined
            };
            await (new PackageJsonEditor())
                .extend({scripts})
                .commit();
        },
        condition: () => allDoExist('package.json')
    },
    {
        text: 'Delete PurgeCSS config file',
        task: async () => {
            await (new PurgecssConfigEditor())
                .delete()
                .commit();
        },
        condition: DISABLED,
        optional: DISABLED
    },
    {
        text: 'Uninstall Parcel dependencies',
        task: () => uninstall([...BUILD_DEPENDENCIES, ...PARCEL_DEPENDENCIES, 'stmux']),
        condition: ({skipInstall}) => !skipInstall && allDoExist('package.json') && (new PackageJsonEditor()).hasAll(...PARCEL_DEPENDENCIES)
    }
];
export default addParcel;