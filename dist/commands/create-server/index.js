"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=exports.tasks=void 0;var _asyncToGenerator2=_interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator")),_path=require("path"),_api=require("../../api");const DEPENDENCIES=["apollo-server-express","compression","config","cookie-session","dotenv","ejs","express","express-session","feature-policy","fs-extra","graphql","helmet","lusca","remarkable","highlight.js","uuid","npmlog","protocolify","ws"],DEV_DEPENDENCIES=["autocannon","clinic","nodemon","open-cli","stmux","supertest"],tasks=[{text:"Copy server files",task:function(){var _ref=(0,_asyncToGenerator2.default)(function*({overwrite}){yield new _api.Scaffolder((0,_path.join)(__dirname,"templates")).overwrite(overwrite).target("./").copy(".env").copy("favicon.ico").copy("_gitignore",".gitignore").copy("index.js").copy("server.js").copy("socket.js").copy("graphql.js").copy("db.json").target("config").copy("default.js").copy("default.js","test.js").target("ssl").copy("server.key").copy("server.cert").target("public").copy("index.html").copy("main.js").copy("example.md").target("__tests__").overwrite(!0).copy("example.test.js").commit()});return function task(){return _ref.apply(this,arguments)}}(),condition:()=>!0},{text:"Configure metadata and add tasks to package.json",task:function(){var _ref2=(0,_asyncToGenerator2.default)(function*(){const main="index.js",PORT=8111;yield new _api.PackageJsonEditor().extend({description:"Node.js HTTP(S), WebSocket, and GraphQL servers with an 80% solution for security 'baked in'",main,name:"server-made-with-tomo",scripts:{predev:"npm run open",dev:`stmux [ "nodemon ${main}" : "npm run lint:ing" ]`,prestart:"npm audit --production",start:`node ${main}`,open:`open-cli http://localhost:${PORT}`,"perf:measure":`autocannon -c 1000 -d 30 http://localhost:${PORT}`,"perf:analyze":`clinic doctor -- node ${main}`}}).commit()});return function task(){return _ref2.apply(this,arguments)}}(),condition:()=>(0,_api.allDoExist)("package.json")},{text:"Configure .eslintrc.js for use with Node.js",task:function(){var _ref3=(0,_asyncToGenerator2.default)(function*({browser}){yield new _api.EslintConfigModuleEditor().extend({env:{browser,node:!0}}).commit()});return function task(){return _ref3.apply(this,arguments)}}(),condition:()=>(0,_api.allDoExist)(".eslintrc.js"),optional:()=>(0,_api.allDoExistSync)(".eslintrc.js")},{text:"Install server dependencies",task:function(){var _ref4=(0,_asyncToGenerator2.default)(function*({skipInstall}){yield(0,_api.install)(DEPENDENCIES,{skipInstall}),yield(0,_api.install)(DEV_DEPENDENCIES,{dev:!0,skipInstall})});return function task(){return _ref4.apply(this,arguments)}}(),condition:({skipInstall})=>!skipInstall&&(0,_api.allDoExist)("package.json")}];exports.tasks=tasks;var _default=tasks;exports.default=_default;