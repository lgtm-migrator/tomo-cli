"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=exports.addReact=void 0;var _asyncToGenerator2=_interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator")),_path=require("path"),_utils=require("../../utils"),_common=require("../../utils/common"),_Scaffolder=require("../../utils/Scaffolder");const REACT_DEPENDENCIES=["prop-types","react","react-dom"],ALWAYS=()=>!0,addReact=[{text:"Copy React boilerplate and assets",task:function(){var a=(0,_asyncToGenerator2.default)(function*({assetsDirectory:a,sourceDirectory:b,overwrite:c,useParcel:d}){const e=d?"index-in-place-react.html":"index-react.html";yield new _Scaffolder.Scaffolder((0,_path.join)(__dirname,"templates")).overwrite(c).target(b).copy("main.js").target(`${b}/components`).copy("App.js").commit(),yield new _Scaffolder.Scaffolder((0,_path.join)(__dirname,"..","common","templates")).overwrite(c).target(`${a}`).copy(e,"index.html").target(`${a}/css`).copy("style.css").target(`${a}/images`).copy(".gitkeep").target(`${a}/fonts`).copy(".gitkeep").target(`${a}/library`).copy(".gitkeep").target(`${a}/workers`).copy(".gitkeep").commit()});return function task(){return a.apply(this,arguments)}}(),condition:ALWAYS},{text:"Set package.json \"main\" attribute and add scripts tasks",task:function(){var a=(0,_asyncToGenerator2.default)(function*({sourceDirectory:a,useParcel:b}){yield new _utils.PackageJsonEditor().extend({main:`${a}/main.js`}).extend(b?{}:{scripts:{serve:"webpack-dev-server --hot --open --mode development",start:"npm-run-all --parallel build:css:watch serve"}}).commit()});return function task(){return a.apply(this,arguments)}}(),condition:()=>(0,_common.allDoExist)("package.json")},{text:"Install React dependencies",task:({skipInstall:a})=>(0,_utils.install)(REACT_DEPENDENCIES,{skipInstall:a}),condition:({isNotOffline:a})=>a&&(0,_common.allDoExist)("package.json")}];exports.addReact=addReact;var _default=addReact;exports.default=_default;