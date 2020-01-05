"use strict";var _interopRequireWildcard=require("@babel/runtime/helpers/interopRequireWildcard"),_interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");require("core-js/modules/es.array.includes"),require("core-js/modules/es.array.iterator"),require("core-js/modules/es.object.entries"),require("core-js/modules/es.object.get-own-property-descriptors"),require("core-js/modules/es.string.split"),Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _defineProperty2=_interopRequireDefault(require("@babel/runtime/helpers/defineProperty")),_is2=_interopRequireDefault(require("ramda/src/is")),_react=_interopRequireWildcard(require("react")),_propTypes=_interopRequireDefault(require("prop-types")),_conf=_interopRequireDefault(require("conf")),_figures=require("figures"),_ink=require("ink"),_api=require("./api");function ownKeys(a,b){var c=Object.keys(a);if(Object.getOwnPropertySymbols){var d=Object.getOwnPropertySymbols(a);b&&(d=d.filter(function(b){return Object.getOwnPropertyDescriptor(a,b).enumerable})),c.push.apply(c,d)}return c}function _objectSpread(a){for(var b,c=1;c<arguments.length;c++)b=null==arguments[c]?{}:arguments[c],c%2?ownKeys(Object(b),!0).forEach(function(c){(0,_defineProperty2.default)(a,c,b[c])}):Object.getOwnPropertyDescriptors?Object.defineProperties(a,Object.getOwnPropertyDescriptors(b)):ownKeys(Object(b)).forEach(function(c){Object.defineProperty(a,c,Object.getOwnPropertyDescriptor(b,c))});return a}const AnimatedIndicator=({complete:a,elapsed:b})=>{const c=()=>_react.default.createElement(_ink.Color,{cyan:!0},_figures.play),d=()=>_react.default.createElement(_ink.Color,{dim:!0},_figures.play),e=+b.split(":")[2]%3;return a?_react.default.createElement(_ink.Color,{dim:!0},"runtime"):_react.default.createElement(_ink.Box,null,0===e?_react.default.createElement(c,null):_react.default.createElement(d,null),1===e?_react.default.createElement(c,null):_react.default.createElement(d,null),2===e?_react.default.createElement(c,null):_react.default.createElement(d,null))},Timer=()=>{const[a]=process.hrtime(),[b,c]=(0,_react.useState)(!1),[d,e]=(0,_react.useState)("00:00:00");// eslint-disable-line react-hooks/exhaustive-deps
return(0,_react.useEffect)(()=>{const b=setInterval(()=>{e((0,_api.getElapsedTime)(a))},1e3);// eslint-disable-line no-magic-numbers
global._tomo_tasklist_callback=()=>{c(!0),clearInterval(b)}},[]),_react.default.createElement(_ink.Box,{marginTop:1,marginLeft:1},_react.default.createElement(AnimatedIndicator,{elapsed:d,complete:b}),_react.default.createElement(_ink.Text,null," ",d))};/**
 * Main tomo UI component
 * @param {Object} props Component props
 * @return {ReactComponent} Main tomo UI component
 */class UI extends _react.Component{constructor(a){super(a);const{commands:b,flags:c,input:d,namespace:e}=a,{ignoreWarnings:f}=c,[g,...h]=d,i=(0,_is2.default)(String)(g),j=i&&(a=>Object.entries(b).filter(([,a])=>"string"==typeof a).map(([a])=>a).includes(a))(g),k=0<h.length,{intendedCommand:l,intendedTerms:m}=i&&!j?(0,_api.getIntendedInput)(b,g,h):{intendedCommand:g,intendedTerms:h},n=(g!==l||k&&m.map((a,b)=>a!==h[b]).some(Boolean))&&!f;this.store=new _conf.default({projectName:e}),this.state={hasTerms:k,hasCommand:i,showWarning:n,intendedTerms:m,intendedCommand:l,isTerminalCommand:j},this.updateWarning=this.updateWarning.bind(this),this.updateTerms=this.updateTerms.bind(this)}render(){const a=this,{commands:b,descriptions:c,done:d,flags:e,customCommands:f}=a.props,{hasCommand:g,hasTerms:h,intendedCommand:i,intendedTerms:j,isTerminalCommand:k,showWarning:l}=a.state,m=a.props.store||a.store,n=()=>{const a=(0,_api.dict)(f||{}),b=a.has(i)?a.get(i):_api.UnderConstruction;return _react.default.createElement(b,{descriptions:c,done:d,options:e,store:m,terms:j})};return _react.default.createElement(_api.ErrorBoundary,null,l?_react.default.createElement(_api.Warning,{callback:this.updateWarning},_react.default.createElement(_ink.Text,null,"Did you mean ",_react.default.createElement(_ink.Color,{bold:!0,green:!0},i," ",j.join(" ")),"?")):g&&h?k?_react.default.createElement(n,null):_react.default.createElement(_react.Fragment,null,_react.default.createElement(Timer,{callback:d,options:{store:m}}),_react.default.createElement(_api.TaskList,{commands:b,command:i,terms:j,options:_objectSpread({},e,{store:m}),done:d})):g?k?_react.default.createElement(n,null):_react.default.createElement(_api.SubCommandSelect,{command:i,descriptions:c,items:Object.keys(b[i]).map(a=>({label:a,value:a})),onSelect:this.updateTerms}):_react.default.createElement(_api.UnderConstruction,null))}/**
     * Callback function for warning component
     * @param {string} data Character data from stdin
     * @return {undefined} Returns nothing
     */updateWarning(a){"\r"==a+""?this.setState({showWarning:!1}):process.exit(0)}/**
     * @param {Object} args Function options
     * @param {string} args.value Intended term
     * @return {undefined} Returns nothing
     */updateTerms({value:a}){this.setState({hasTerms:!0,intendedTerms:[a]})}}exports.default=UI,AnimatedIndicator.propTypes={complete:_propTypes.default.bool,elapsed:_propTypes.default.string},Timer.propTypes={callback:_propTypes.default.func,options:_propTypes.default.object},UI.propTypes={commands:_propTypes.default.object,descriptions:_propTypes.default.object,done:_propTypes.default.func,flags:_propTypes.default.object,input:_propTypes.default.array,namespace:_propTypes.default.string,stdin:_propTypes.default.string,store:_propTypes.default.oneOfType([_propTypes.default.array,_propTypes.default.object]),customCommands:_propTypes.default.object},UI.defaultProps={input:[],flags:{}};