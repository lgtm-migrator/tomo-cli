"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");require("core-js/modules/es.array.iterator"),require("core-js/modules/es.promise"),require("core-js/modules/es.string.split"),Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=exports.Scaffolder=void 0;var _asyncToGenerator2=_interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator")),_path=require("path"),_pQueue=_interopRequireDefault(require("p-queue")),_memFs=_interopRequireDefault(require("mem-fs")),_memFsEditor=_interopRequireDefault(require("mem-fs-editor"));const{assign}=Object,silent=()=>{};/**
 * Class to create scaffolders when creating folders, and copying files/templates
 * @example
 * import {Scaffolder} from './utils';
 * const scaffolder = new Scaffolder();
 * await scaffolder
 *     .target('/path/to/copy/files')
 *     .copy('foo.js')
 *     .copy('bar.js')
 *     .commit();
 */class Scaffolder{/**
     *
     * @param {Object} options Scaffolding options
     * @param {string} options.sourceDirectory Source directory for template files
     */constructor(a={sourceDirectory:(0,_path.join)(__dirname,"templates")}){const{sourceDirectory:b}=a,c=_memFsEditor.default.create(_memFs.default.create()),d=new _pQueue.default({concurrency:1});assign(this,{fs:c,queue:d,sourceDirectory:b,targetDirectory:"./"})}/**
     * Set source directory
     * @param {string} sourceDirectory Source directory of template files
     * @returns {Scaffolder} Chaining OK
     */source(a){return assign(this,{sourceDirectory:a})}/**
     * Set target directory
     * @param {string} targetDirectory Target directory of template files
     * @returns {Scaffolder} Chaining OK
     */target(a){return assign(this,{targetDirectory:a})}/**
     * Copy a file
     * @param {string} path Path string of file to be copied
     * @returns {Scaffolder} Chaining OK
     */copy(a){const b=this,{fs:c,queue:d,sourceDirectory:e,targetDirectory:f}=b,g=(0,_path.join)(e,a),h=(0,_path.join)(process.cwd(),f,...a.split("/"));return d.add(()=>c.copy(g,h)).catch(silent),b}/**
     * Write changes to disk
     * @return {Promise} Resolves when queue is empty
     */commit(){var a=this;return(0,_asyncToGenerator2.default)(function*(){const{fs:b,queue:c}=a;yield new Promise(a=>b.commit(a)),yield c.onEmpty()})()}}exports.Scaffolder=Scaffolder;var _default=Scaffolder;exports.default=_default;