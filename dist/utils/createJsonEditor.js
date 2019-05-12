"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");require("core-js/modules/es.array.includes"),require("core-js/modules/es.array.iterator"),Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=exports.createJsonEditor=void 0;var _defineProperty2=_interopRequireDefault(require("@babel/runtime/helpers/defineProperty")),_path=require("path"),_fsExtra=require("fs-extra"),_BasicEditor=_interopRequireDefault(require("./BasicEditor")),_common=require("./common");const{assign}=Object,INDENT_SPACES=4,createJsonEditor=(a,b={})=>{var c;return c=class extends _BasicEditor.default{constructor(c=process.cwd()){super(),(0,_defineProperty2.default)(this,"contents",b);const d=(0,_path.join)(c,a);assign(this,{path:d})}create(){const a=this,{contents:b,fs:c,path:d,queue:e}=a;return(0,_fsExtra.existsSync)(d)||e.add(()=>c.writeJSON(d,b,null,INDENT_SPACES)),a}read(){const{fs:a,path:b}=this;return a.readJSON(b)||""}extend(a){const b=this,{fs:c,path:d,queue:e}=b;return e.add(()=>c.extendJSON(d,a,null,INDENT_SPACES)),b}/**
     * Check if package.json manifest file has dependencies (dependencies or devDependencies)
     * @param  {...string} modules npm module names
     * @return {Boolean} Has at least one dependency (true) or none (false)
     */hasSome(...a){const{keys:b}=Object,c=this.read(),{dependencies:d,devDependencies:e}=(0,_common.parse)(c),f=[...b(d?d:{}),...b(e?e:{})];return a.some(a=>f.includes(a))}/**
     * Check if package.json manifest file has dependencies (dependencies or devDependencies)
     * @param  {...string} modules npm module names
     * @return {Boolean} Has all dependencies (true) or not all (false)
     */hasAll(...a){const{keys:b}=Object,c=this.read(),{dependencies:d,devDependencies:e}=(0,_common.parse)(c),f=[...b(d?d:{}),...b(e?e:{})];return a.every(a=>f.includes(a))}},c};exports.createJsonEditor=createJsonEditor;var _default=createJsonEditor;exports.default=_default;