"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");require("core-js/modules/es.array.iterator"),Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _utils=require("../utils"),_common=require("./common"),_addA11y=_interopRequireDefault(require("./add-a11y")),_addBabel=_interopRequireDefault(require("./add-babel")),_addBrowsersync=require("./add-browsersync"),_addElectron=_interopRequireDefault(require("./add-electron")),_addEsdoc=_interopRequireDefault(require("./add-esdoc")),_addEslint=_interopRequireDefault(require("./add-eslint")),_addJest=_interopRequireDefault(require("./add-jest")),_addMakefile=_interopRequireDefault(require("./add-makefile")),_addMarionette=_interopRequireDefault(require("./add-marionette")),_addParcel=require("./add-parcel"),_addPostcss=require("./add-postcss"),_addRollup=require("./add-rollup"),_addWebpack=require("./add-webpack"),_createServer=_interopRequireDefault(require("./create-server"));/* eslint-disable no-magic-numbers */const createProject=[..._common.createPackageJson,..._common.createSourceDirectory,..._addBabel.default,..._addEslint.default],create={project:createProject,app:[(0,_utils.withOptions)({browser:!0}),...createProject,..._addPostcss.addPostcss,..._addJest.default,(0,_utils.choose)({default:_addWebpack.addWebpack,useRollup:_addRollup.addRollup,useParcel:_addParcel.addParcel}),(0,_utils.choose)({default:_addMarionette.default,native:[(0,_utils.withOptions)({outputDirectory:"./dist",sourceDirectory:"./renderer/src",assetsDirectory:"./renderer/assets"}),..._addMarionette.default,..._addElectron.default],useReact:[]// under construction
}),(0,_utils.choose)({default:_addBrowsersync.addBrowsersync,native:[],// do nothing
useParcel:[]// do nothing
})],server:[(0,_utils.withOptions)({sourceDirectory:".",useReact:!1}),..._common.createPackageJson,..._addEslint.default,..._addJest.default,..._createServer.default]},add={a11y:_addA11y.default,babel:_addBabel.default,browsersync:_addBrowsersync.addBrowsersync,electron:_addElectron.default,esdoc:_addEsdoc.default,eslint:[..._addBabel.default,..._addEslint.default],jest:[..._addBabel.default,..._addJest.default],makefile:_addMakefile.default,marionette:_addMarionette.default,parcel:[(0,_utils.withOptions)({useParcel:!0}),..._addBabel.default,..._addParcel.addParcel],postcss:_addPostcss.addPostcss,rollup:[..._addBabel.default,..._addRollup.addRollup],webpack:[..._addBabel.default,..._addWebpack.addWebpack]},remove={browsersync:_addBrowsersync.removeBrowsersync,parcel:_addParcel.removeParcel,postcss:_addPostcss.removePostcss,rollup:_addRollup.removeRollup,webpack:_addWebpack.removeWebpack};var _default={add,remove,create,new:create// alias for create
};/**
 * @typedef {Object} task
 * @property {string} text Display text for task
 * @property {function} task Task to execute
 * @property {function} condition Predicate to decide when to execute the task (true) or not (false) - can be async or sync
 * @property {function} [optional] Predicate to decide when to show the task (true) or not (false) - MUST be sync
 */exports.default=_default;