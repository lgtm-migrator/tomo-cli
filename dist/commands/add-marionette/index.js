"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=exports.tasks=void 0;var _asyncToGenerator2=_interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator")),_path=require("path"),_utils=require("../../utils"),_common=require("../../utils/common"),_Scaffolder=require("../../utils/Scaffolder");const MARIONETTE_DEPENDENCIES=["jquery","backbone","backbone.marionette","backbone.radio","marionette.approuter","morphdom","lodash-es","redux"],ALWAYS=/*#__PURE__*/function(){var a=(0,_asyncToGenerator2.default)(function*(){return!0});return function(){return a.apply(this,arguments)}}(),tasks=[{text:"Copy Marionette.js boilerplate and assets",task:function(){var a=(0,_asyncToGenerator2.default)(function*({assetsDirectory:a,overwrite:b,sourceDirectory:c,useParcel:d,usePika:e}){const f=d||e?"index-in-place.html":"index.html",g=d?"fonts-in-place.css":"fonts.css";yield new _Scaffolder.Scaffolder((0,_path.join)(__dirname,"templates")).overwrite(b).target(c).copy("main.js").target(`${c}/components`).copy("app.js").target(`${c}/shims`).copy("mn.renderer.shim.js").target(`${c}/plugins`).copy("mn.radio.logging.js").copy("mn.redux.state.js").commit(),yield new _Scaffolder.Scaffolder((0,_path.join)(__dirname,"..","common","templates")).overwrite(b).target(`${a}`).copy(f,"index.html").target(`${a}/css`).copy("style.css").copy(g,"fonts.css").target(`${a}/images`).copy("blank_canvas.png").copy("preferences.png").target(`${a}/fonts`).copy("SansForgetica-Regular.eot").copy("SansForgetica-Regular.svg").copy("SansForgetica-Regular.ttf").copy("SansForgetica-Regular.woff").copy("SansForgetica-Regular.woff2").target(`${a}/library`).copy(".gitkeep").target(`${a}/workers`).copy(".gitkeep").commit()});return function task(){return a.apply(this,arguments)}}(),condition:ALWAYS},{text:"Set package.json \"main\" attribute",task:function(){var a=(0,_asyncToGenerator2.default)(function*({sourceDirectory:a}){yield new _utils.PackageJsonEditor().extend({main:`${a}/main.js`}).commit()});return function task(){return a.apply(this,arguments)}}(),condition:()=>(0,_common.allDoExist)("package.json")},{text:"Install Marionette.js dependencies",task:({skipInstall:a})=>(0,_utils.install)(MARIONETTE_DEPENDENCIES,{skipInstall:a}),condition:({isNotOffline:a})=>a&&(0,_common.allDoExist)("package.json")}];exports.tasks=tasks;var _default=tasks;exports.default=_default;