"use strict";var _interopRequireWildcard=require("@babel/runtime/helpers/interopRequireWildcard"),_interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");require("core-js/modules/es.array.flat-map"),require("core-js/modules/es.array.includes"),require("core-js/modules/es.array.iterator"),require("core-js/modules/es.array.sort"),require("core-js/modules/es.array.unscopables.flat-map"),require("core-js/modules/es.object.get-own-property-descriptors"),Object.defineProperty(exports,"__esModule",{value:!0}),exports.TaskList=exports.TaskListTitle=exports.Tasks=exports.Task=exports.WarningAndErrorsHeader=exports.Status=exports.OfflineWarning=exports.Warning=exports.UnderConstruction=exports.SubCommandMultiSelect=exports.SubCommandSelect=exports.ErrorBoundary=exports.ErrorMessage=exports.Description=exports.Debug=exports.CommandError=void 0;var _defineProperty2=_interopRequireDefault(require("@babel/runtime/helpers/defineProperty")),_complement2=_interopRequireDefault(require("ramda/src/complement")),_is2=_interopRequireDefault(require("ramda/src/is")),_react=_interopRequireWildcard(require("react")),_propTypes=_interopRequireDefault(require("prop-types")),_chalk=require("chalk"),_pino=_interopRequireDefault(require("pino")),_ink=require("ink"),_inkBox=_interopRequireDefault(require("ink-box")),_inkSpinner=_interopRequireDefault(require("ink-spinner")),_inkSelectInput=_interopRequireDefault(require("ink-select-input")),_inkMultiSelect=_interopRequireDefault(require("ink-multi-select")),_figures=_interopRequireDefault(require("figures")),_cardinal=require("cardinal"),_api=require("./api");function ownKeys(a,b){var c=Object.keys(a);if(Object.getOwnPropertySymbols){var d=Object.getOwnPropertySymbols(a);b&&(d=d.filter(function(b){return Object.getOwnPropertyDescriptor(a,b).enumerable})),c.push.apply(c,d)}return c}function _objectSpread(a){for(var b,c=1;c<arguments.length;c++)b=null==arguments[c]?{}:arguments[c],c%2?ownKeys(b,!0).forEach(function(c){(0,_defineProperty2.default)(a,c,b[c])}):Object.getOwnPropertyDescriptors?Object.defineProperties(a,Object.getOwnPropertyDescriptors(b)):ownKeys(b).forEach(function(c){Object.defineProperty(a,c,Object.getOwnPropertyDescriptor(b,c))});return a}const{assign}=Object,space=" ",Check=({isSkipped:a})=>_react.default.createElement(_ink.Color,{bold:!0,green:!a,dim:a},_figures.default.tick,space),X=()=>_react.default.createElement(_ink.Color,{bold:!0,red:!0},_figures.default.cross,space),Pending=()=>_react.default.createElement(_ink.Color,{cyan:!0},_react.default.createElement(_inkSpinner.default,null),space),Item=({isHighlighted:a,isSelected:b,label:c})=>_react.default.createElement(_ink.Color,{bold:a||b,cyan:a||b},c),Indicator=({isHighlighted:a,isSelected:b})=>_react.default.createElement(_ink.Box,{marginRight:1},a||b?_react.default.createElement(_ink.Color,{bold:!0,cyan:!0},_figures.default.arrowRight):" "),CommandError=a=>{const b=(0,_pino.default)({prettyPrint:{levelFirst:!0}},_pino.default.destination("./tomo-errors.txt"));// eslint-disable-line react-hooks/exhaustive-deps
return(0,_react.useEffect)(()=>{b.error(a)},[]),_react.default.createElement(_ink.Box,{flexDirection:"column",marginTop:1,marginLeft:1},_react.default.createElement(_ink.Box,null,_react.default.createElement(X,null),_react.default.createElement(_ink.Text,null,"Something has gone horribly ",_react.default.createElement(_ink.Color,{bold:!0,red:!0},"wrong"))),_react.default.createElement(_ink.Box,{marginLeft:2},"\u21B3",space,_react.default.createElement(_ink.Color,{dim:!0},"Details written to ./tomo-errors.txt")))};exports.CommandError=CommandError;const Debug=({data:a,title:b})=>{const{completed:c,errors:d,skipped:e,terms:f,options:g}=a,h=Object.keys(g).filter(a=>!(0,_is2.default)(String)(g[a])).map(a=>`${a} - ${g[a]}`).sort(),i=a=>{var b,c;return b=(c=a,(0,_api.format)(c)),(0,_cardinal.highlight)(b)},j=({title:b="value",value:a})=>_react.default.createElement(_ink.Box,null,_react.default.createElement(_react.Fragment,null,_react.default.createElement(_ink.Color,{dim:!0},b),": ",i(a)));return j.propTypes={value:_propTypes.default.any},_react.default.createElement(_ink.Box,{flexDirection:"column",marginTop:1,marginLeft:1},_react.default.createElement(_ink.Box,{marginBottom:1},_react.default.createElement(_ink.Color,{bold:!0,cyan:!0},"DEBUG: "),_react.default.createElement(_ink.Color,{bold:!0,dim:!0},b)),_react.default.createElement(j,{title:"Terms",value:f}),_react.default.createElement(j,{title:"Options",value:h}),_react.default.createElement(j,{title:"Completed",value:c}),_react.default.createElement(j,{title:"Skipped",value:e}),_react.default.createElement(j,{title:"Errors",value:d}))};exports.Debug=Debug;const Description=({command:a,descriptions:b})=>{return _react.default.createElement(_ink.Box,{marginBottom:1},_react.default.createElement(_ink.Color,{cyan:!0},(a=>{const c=(0,_api.dict)(b),d=c.has(a)?c.get(a):c.has("default")?c.get("default"):a=>`${(0,_chalk.dim)("Sorry, I don't have anything to say about")} ${a}`;return"function"==typeof d?d(a):d})(a)))};exports.Description=Description;const ErrorMessage=({info:a})=>_react.default.createElement(_ink.Box,{flexDirection:"column",marginBottom:1},_react.default.createElement(_inkBox.default,{borderColor:"yellow",margin:{left:1,top:1},padding:{left:1,right:1}},_react.default.createElement(_ink.Color,{yellow:!0},"(\u256F\xB0\u25A1 \xB0)\u256F \u253B\u2501\u253B arrrgh...")),_react.default.createElement(_ink.Box,{marginLeft:4},"\u21B3",space,_react.default.createElement(_ink.Color,{dim:!0},"Something went wrong...")),_react.default.createElement(_ink.Box,{marginLeft:6,marginTop:1},_react.default.createElement(_ink.Color,{dim:!0},_react.default.createElement(_ink.Box,null,a))));exports.ErrorMessage=ErrorMessage;class ErrorBoundary extends _react.Component{constructor(a){super(a),this.state={info:"",error:{},hasError:!1}}static getDerivedStateFromError(){return{hasError:!0}}componentDidCatch(a,b){this.setState({error:a,info:b})}render(){const{error:a,hasError:b}=this.state,{children:c}=this.props;return b?_react.default.createElement(ErrorMessage,{error:a}):c}}exports.ErrorBoundary=ErrorBoundary;const SubCommandSelect=({command:a,descriptions:b,items:c,onSelect:d})=>{const[e,f]=(0,_react.useState)(c[0].value),g=`${_chalk.bold.yellow("CAUTION:")} tomo shall ${_chalk.bold.red("remove")} that which tomo would have ${_chalk.bold.green("added")}`;return _react.default.createElement(_ink.Box,{flexDirection:"column",paddingTop:1,paddingBottom:1,paddingLeft:1},"remove"===a?_react.default.createElement(_ink.Box,{marginBottom:1},g):_react.default.createElement(Description,{command:e,descriptions:b}),_react.default.createElement(_inkSelectInput.default,{items:c,onSelect:d,onHighlight:a=>{f(a.value)},itemComponent:Item,indicatorComponent:Indicator}))};exports.SubCommandSelect=SubCommandSelect;const SubCommandMultiSelect=({descriptions:a,items:b,onSubmit:c})=>{const[d,e]=(0,_react.useState)(b[0].value),[f,g]=(0,_react.useState)([]);return _react.default.createElement(_ink.Box,{flexDirection:"column",paddingTop:1,paddingBottom:1,paddingLeft:1},_react.default.createElement(_ink.Box,null,_react.default.createElement(_ink.Color,{dim:!0},"selected - ",f.join(", "))),_react.default.createElement(Description,{command:d,descriptions:a}),_react.default.createElement(_inkMultiSelect.default,{items:b,onSubmit:c,onSelect:a=>{const{value:b}=a;g(f.concat(b))},onUnselect:a=>{const{value:b}=a;g(f.filter(a=>a!==b))},onHighlight:a=>{e(a.value)},itemComponent:Item,indicatorComponent:Indicator}))};exports.SubCommandMultiSelect=SubCommandMultiSelect;const UnderConstruction=()=>_react.default.createElement(_ink.Box,{marginBottom:1},_react.default.createElement(_inkBox.default,{padding:{left:1,right:1},margin:{left:1,top:1}},_react.default.createElement(_ink.Color,{bold:!0,yellow:!0},"UNDER CONSTRUCTION")));/**
 * Component to display warning message requiring user input
 * @param {Object} props Function component props
 * @param {ReactNode} props.children Function component children
 * @param {function} props.callback Function to be called after user interacts with warning
 * @return {ReactComponent} Warning component
 */exports.UnderConstruction=UnderConstruction;const Warning=({callback:a,children:b})=>{const{setRawMode:c,stdin:d}=(0,_react.useContext)(_ink.StdinContext);return(0,_react.useEffect)(()=>(c&&c(!0),d.on("data",a),function(){d.removeListener("data",a),c&&c(!1)})),_react.default.createElement(_ink.Box,{flexDirection:"column",marginBottom:1},_react.default.createElement(_inkBox.default,{borderColor:"yellow",margin:{left:1,top:1},padding:{left:1,right:1}},_react.default.createElement(_ink.Color,{yellow:!0},"oops...")),_react.default.createElement(_ink.Box,{marginLeft:4},"\u21B3",space,b),_react.default.createElement(_ink.Box,{marginLeft:6,marginTop:1},_react.default.createElement(_ink.Color,{dim:!0},"Press "),_react.default.createElement(_ink.Text,{bold:!0},"ENTER"),_react.default.createElement(_ink.Color,{dim:!0}," to continue")))};exports.Warning=Warning;const OfflineWarning=()=>_react.default.createElement(_ink.Box,{flexDirection:"column",marginBottom:1},_react.default.createElement(_inkBox.default,{borderColor:"yellow",margin:{left:1,top:1},padding:{left:1,right:1}},_react.default.createElement(_ink.Color,{yellow:!0},"(\u2312_\u2312;) This is awkward...")),_react.default.createElement(_ink.Box,{marginLeft:4,flexDirection:"column"},_react.default.createElement(_ink.Box,null,"\u21B3",space,_react.default.createElement(_ink.Text,null,"...you appear to be ",_react.default.createElement(_ink.Color,{bold:!0,red:!0},"offline"))),_react.default.createElement(_ink.Box,null,"\u21B3",space,_react.default.createElement(_ink.Text,null,"Please connect to the internet and ",_react.default.createElement(_ink.Color,{bold:!0,cyan:!0},"try again")))),_react.default.createElement(_ink.Box,{marginLeft:6,marginTop:1},_react.default.createElement(_ink.Color,{dim:!0},"No dependencies will be installed")));exports.OfflineWarning=OfflineWarning;const Status=({tasks:a,completed:b,skipped:c})=>{const d=b.length+c.length===a.length;return _react.default.createElement(_ink.Box,{flexDirection:"column"},_react.default.createElement(_ink.Box,{marginLeft:4,marginBottom:1},_react.default.createElement(_ink.Color,{dim:!0},"\u21B3",space),d?_react.default.createElement(_ink.Color,{bold:!0,green:!0},"All Done!"):_react.default.createElement(_react.Fragment,null,_react.default.createElement(_ink.Color,{dim:!0},"Finished "),_react.default.createElement(_ink.Color,{bold:!0,white:!0},b.length),_react.default.createElement(_ink.Color,{bold:!0,dim:!0}," of "),_react.default.createElement(_ink.Color,{bold:!0,white:!0},a.length-c.length),_react.default.createElement(_ink.Color,{dim:!0}," tasks")),_react.default.createElement(_ink.Color,{dim:!0}," ("),_react.default.createElement(_ink.Color,{bold:!0},b.length),_react.default.createElement(_ink.Color,{dim:!0}," completed, "),_react.default.createElement(_ink.Color,{bold:!0},c.length),_react.default.createElement(_ink.Color,{dim:!0}," skipped"),_react.default.createElement(_ink.Color,null,")")))};exports.Status=Status;const WarningAndErrorsHeader=({errors:a,hasError:b,isOnline:c,options:{skipInstall:d}})=>_react.default.createElement(_react.Fragment,null,!c&&!d&&_react.default.createElement(OfflineWarning,null),b&&_react.default.createElement(CommandError,{errors:a}));/**
 * Task component
 * @param {Object} props Function component props
 * @param {boolean} props.isComplete Control display of check (true) or loading (false)
 * @param {boolean} props.isErrored Control display of x (true)
 * @param {boolean} props.isSkipped Control color of check - green (false) or dim (true)
 * @param {string} props.text Task text
 * @example
 * <Task text={'This task is done before it starts'} isComplete={true}></Task>
 * @return {ReactComponent} Task component
 */exports.WarningAndErrorsHeader=WarningAndErrorsHeader;const Task=({isComplete:a,isErrored:b,isPending:c,isSkipped:d,text:e})=>_react.default.createElement(_ink.Box,{flexDirection:"row",marginLeft:3},a&&_react.default.createElement(Check,{isSkipped:d}),b&&_react.default.createElement(X,null),c&&_react.default.createElement(Pending,null),_react.default.createElement(_ink.Text,null,_react.default.createElement(_ink.Color,{dim:a},e)));exports.Task=Task;const Tasks=({debug:a,options:b,state:c,tasks:d})=>_react.default.createElement(_ink.Box,{flexDirection:"column",marginBottom:1},d.filter(_api.isValidTask).filter(_api.isUniqueTask).map(({optional:d,text:e},f)=>{const{completed:g,errors:h,skipped:i}=c,j=i.includes(f),k=g.includes(f)||j,l=h.map(a=>a.payload.index).includes(f),m=[k,j,l].every(a=>!a),n=a&&_react.default.createElement(_ink.Color,{cyan:!0},f," - ",e),o=((a,b)=>a===void 0||(0,_is2.default)(Function)(a)&&a(b))(d,b),p=f<=Math.max(...g,...i)+1;return p&&o?_react.default.createElement(Task,{key:e,text:e,isSkipped:j,isComplete:k,isErrored:l,isPending:m}):_react.default.createElement(_ink.Box,{key:e},n)}));exports.Tasks=Tasks;const TaskListTitle=({command:a,hasError:b,isComplete:c,terms:d})=>_react.default.createElement(_inkBox.default,{margin:{left:1,top:1},padding:{left:1,right:1},borderColor:c?"green":b?"red":"cyan",borderStyle:"round"},_react.default.createElement(_ink.Color,{bolds:!0},a," ",d.join(" ")));/**
 * Task list component
 * @param {Object} props Function component props
 * @param {string} props.command Command - new | create | add
 * @param {Object} props.options Command line flags (see help)
 * @param {string[]} props.terms Terms - eslint | babel | jest | postcss | docs
 * @example
 * <TaskList command={'add'} terms={'eslint'} options={{skipInstall: true}}></TaskList>
 * @return {ReactComponent} Task list component
 */exports.TaskListTitle=TaskListTitle;const TaskList=({command:a,commands:b,options:c,terms:d,done:e})=>{const[f,g]=(0,_react.useReducer)((a,{type:b,payload:c})=>{const{completed:d,errors:e,skipped:f}=a,g=b=>assign({},a,b),h=(0,_api.dict)({complete:()=>g({completed:[...d,c]}),skipped:()=>g({skipped:[...f,c]}),error:()=>g({errors:[...e,{payload:c}]}),status:()=>g({status:c})});return h.has(b)?h.get(b)():a},{completed:[],skipped:[],errors:[],status:{online:!0}}),{completed:h,errors:i,skipped:j,status:{online:k}}=f,{debug:l}=c,m=d.flatMap(c=>b[a][c]).flatMap(a=>(0,_api.maybeApply)(a,c)).flatMap(a=>(0,_api.maybeApply)(a,c)),n=assign(m.filter((0,_complement2.default)(_api.isValidTask)).reduce((a,b)=>_objectSpread({},a,{},b),c),{isNotOffline:k}),o=m.filter(_api.isValidTask).filter(_api.isUniqueTask),p=h.length+j.length===o.length,q=0<i.length;return(0,_react.useEffect)(()=>{(0,_api.populateQueue)({tasks:m,dispatch:g,options:n})},[]),p&&(0,_api.maybeApply)(e),_react.default.createElement(ErrorBoundary,null,l&&_react.default.createElement(Debug,{data:{tasks:m,terms:d,errors:i,skipped:j,completed:h,options:n},title:"Tasklist data"}),_react.default.createElement(WarningAndErrorsHeader,{errors:i,hasError:q,isOnline:k,options:n}),_react.default.createElement(_ink.Box,{flexDirection:"column",marginBottom:1},_react.default.createElement(TaskListTitle,{command:a,hasError:q,isComplete:p,terms:d}),_react.default.createElement(Status,{completed:h,skipped:j,tasks:o}),_react.default.createElement(Tasks,{debug:l,options:n,state:f,tasks:m})))};exports.TaskList=TaskList,Check.propTypes={isSkipped:_propTypes.default.bool},Check.defaultProps={isSkipped:!1},Debug.propTypes={data:_propTypes.default.any,title:_propTypes.default.string},Description.propTypes={command:_propTypes.default.string,descriptions:_propTypes.default.object},SubCommandSelect.propTypes={command:_propTypes.default.string,descriptions:_propTypes.default.object,items:_propTypes.default.arrayOf(_propTypes.default.object),onSelect:_propTypes.default.func},SubCommandMultiSelect.propTypes={descriptions:_propTypes.default.object,items:_propTypes.default.arrayOf(_propTypes.default.object),onSubmit:_propTypes.default.func},Indicator.propTypes={isHighlighted:_propTypes.default.bool,isSelected:_propTypes.default.bool},Indicator.defaultProps={isHighlighted:!1,isSelected:!1},Item.propTypes={isHighlighted:_propTypes.default.bool,isSelected:_propTypes.default.bool,label:_propTypes.default.string.isRequired},Item.defaultProps={isHighlighted:!1,isSelected:!1},ErrorMessage.propTypes={info:_propTypes.default.string},ErrorBoundary.propTypes={children:_propTypes.default.node},Status.propTypes={completed:_propTypes.default.array,skipped:_propTypes.default.array,tasks:_propTypes.default.arrayOf(_propTypes.default.object)},Task.propTypes={isComplete:_propTypes.default.bool,isErrored:_propTypes.default.bool,isSkipped:_propTypes.default.bool,isPending:_propTypes.default.bool,text:_propTypes.default.string},Task.defaultProps={isComplete:!1,isErrored:!1,isSkipped:!1,isPending:!1,text:"task description"},TaskList.propTypes={command:_propTypes.default.string,commands:_propTypes.default.object,options:_propTypes.default.any,terms:_propTypes.default.arrayOf(_propTypes.default.string),done:_propTypes.default.func},TaskList.defaultProps={command:"",options:{skipInstall:!1},terms:[]},TaskListTitle.propTypes={command:_propTypes.default.string,hasError:_propTypes.default.bool,isComplete:_propTypes.default.bool,terms:_propTypes.default.arrayOf(_propTypes.default.string)},Tasks.propTypes={debug:_propTypes.default.bool,options:_propTypes.default.object,state:_propTypes.default.object,tasks:_propTypes.default.arrayOf(_propTypes.default.object)},Warning.propTypes={callback:_propTypes.default.func,children:_propTypes.default.node},WarningAndErrorsHeader.propTypes={errors:_propTypes.default.array,hasError:_propTypes.default.bool,isOnline:_propTypes.default.bool,options:_propTypes.default.object};