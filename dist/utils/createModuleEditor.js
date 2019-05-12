"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");require("core-js/modules/es.string.replace"),Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=exports.createModuleEditor=void 0;var _defineProperty2=_interopRequireDefault(require("@babel/runtime/helpers/defineProperty")),_path=require("path"),_fsExtra=require("fs-extra"),_lodash=require("lodash"),_common=require("./common"),_BasicEditor=_interopRequireDefault(require("./BasicEditor"));const{assign}=Object,silent=()=>{},createModuleEditor=(a,b="module.exports = {};",c="")=>{var d;return d=class extends _BasicEditor.default{constructor(d=process.cwd()){super(),(0,_defineProperty2.default)(this,"contents",b),(0,_defineProperty2.default)(this,"prependedContents",c),(0,_defineProperty2.default)(this,"created",!1);const e=(0,_path.join)(d,a);assign(this,{path:e})}create(){const a=this,{contents:b,path:c}=a;return a.created||(0,_fsExtra.existsSync)(c)||a.write(b),a}read(){const{fs:a,path:b}=this;return a.exists(b)?a.read(b):""}write(a){const b=this,{fs:c,path:d,prependedContents:e,queue:f}=b,g=`${e}module.exports = ${(0,_common.format)(a)}`.replace(/\r*\n$/g,";");return f.add(()=>c.write(d,g)).then(()=>b.created=(0,_fsExtra.existsSync)(d)).catch(silent),assign(b,{contents:a})}extend(a){return this.contents=(0,_lodash.merge)(b,a),this.write(this.contents),this}prepend(a){const b=this,{contents:c,prependedContents:d}=b;return b.prependedContents=`${a}\n${d}`.replace(/\n*$/,"\n\n"),b.write(c)}},d};exports.createModuleEditor=createModuleEditor;var _default=createModuleEditor;exports.default=_default;