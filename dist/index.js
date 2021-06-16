#!/usr/bin/env node
"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");require("core-js/modules/es.object.get-own-property-descriptors");var _defineProperty2=_interopRequireDefault(require("@babel/runtime/helpers/defineProperty")),_asyncToGenerator2=_interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator")),_ink=require("ink"),_meow=_interopRequireDefault(require("meow")),_getStdin=_interopRequireDefault(require("get-stdin")),_updateNotifier=_interopRequireDefault(require("update-notifier")),_api=require("./api"),_cli=require("./cli"),_commands=_interopRequireDefault(require("./commands")),_jsxRuntime=require("react/jsx-runtime");function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter(function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable})),keys.push.apply(keys,symbols)}return keys}function _objectSpread(target){for(var source,i=1;i<arguments.length;i++)source=null==arguments[i]?{}:arguments[i],i%2?ownKeys(Object(source),!0).forEach(function(key){(0,_defineProperty2.default)(target,key,source[key])}):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach(function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))});return target}// Notify updater
const pkg=require(`../package.json`);(0,_updateNotifier.default)({pkg}).notify();const{input,flags}=(0,_meow.default)(_cli.options);("version"===input[0]||flags.version)&&(0,_api.showVersion)(),(0,_asyncToGenerator2.default)(function*(){const stdin=yield(0,_getStdin.default)(),properties={commands:_commands.default,descriptions:_cli.descriptions,flags,input,stdin};(0,_ink.render)(/*#__PURE__*/(0,_jsxRuntime.jsx)(_api.Main,_objectSpread({namespace:"tomo"},properties)),{exitOnCtrlC:!0})})();