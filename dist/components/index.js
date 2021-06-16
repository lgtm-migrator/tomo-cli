"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");require("core-js/modules/es.array.flat-map"),require("core-js/modules/es.array.includes"),require("core-js/modules/es.array.iterator"),require("core-js/modules/es.array.sort"),require("core-js/modules/es.array.unscopables.flat-map"),require("core-js/modules/es.object.get-own-property-descriptors"),Object.defineProperty(exports,"__esModule",{value:!0}),Object.defineProperty(exports,"Main",{enumerable:!0,get:function(){return _main.default}}),exports.TaskList=exports.TaskListTitle=exports.Tasks=exports.Task=exports.WarningAndErrorsHeader=exports.Status=exports.OfflineWarning=exports.Warning=exports.UnderConstruction=exports.SubCommandMultiSelect=exports.SubCommandSelect=exports.ErrorBoundary=exports.ErrorMessage=exports.Description=exports.Debug=exports.CommandError=void 0;var _defineProperty2=_interopRequireDefault(require("@babel/runtime/helpers/defineProperty")),_complement2=_interopRequireDefault(require("ramda/src/complement")),_is2=_interopRequireDefault(require("ramda/src/is")),_react=require("react"),_propTypes=_interopRequireDefault(require("prop-types")),_chalk=require("chalk"),_pino=_interopRequireDefault(require("pino")),_ink=require("ink"),_inkSpinner=_interopRequireDefault(require("ink-spinner")),_inkSelectInput=_interopRequireDefault(require("ink-select-input")),_inkMultiSelect=_interopRequireDefault(require("ink-multi-select")),_figures=_interopRequireDefault(require("figures")),_cardinal=require("cardinal"),_api=require("../api"),_jsxRuntime=require("react/jsx-runtime"),_main=_interopRequireDefault(require("./main"));function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter(function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable})),keys.push.apply(keys,symbols)}return keys}function _objectSpread(target){for(var source,i=1;i<arguments.length;i++)source=null==arguments[i]?{}:arguments[i],i%2?ownKeys(Object(source),!0).forEach(function(key){(0,_defineProperty2.default)(target,key,source[key])}):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach(function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))});return target}const{assign}=Object,space=" ",Check=({isSkipped})=>/*#__PURE__*/(0,_jsxRuntime.jsxs)(_ink.Text,{bold:!0,color:isSkipped?"white":"green",dim:isSkipped,children:[_figures.default.tick,space]}),X=()=>/*#__PURE__*/(0,_jsxRuntime.jsxs)(_ink.Text,{bold:!0,color:"red",children:[_figures.default.cross,space]}),Pending=()=>/*#__PURE__*/(0,_jsxRuntime.jsxs)(_ink.Text,{color:"cyan",children:[/*#__PURE__*/(0,_jsxRuntime.jsx)(_inkSpinner.default,{}),space]}),Item=({isHighlighted,isSelected,label})=>/*#__PURE__*/(0,_jsxRuntime.jsx)(_ink.Text,{bold:isHighlighted||isSelected,color:isHighlighted||isSelected?"cyan":"white",children:label}),Indicator=({isHighlighted,isSelected})=>/*#__PURE__*/(0,_jsxRuntime.jsx)(_ink.Box,{marginRight:1,children:isHighlighted||isSelected?/*#__PURE__*/(0,_jsxRuntime.jsx)(_ink.Text,{bold:!0,color:"cyan",children:_figures.default.arrowRight}):/*#__PURE__*/(0,_jsxRuntime.jsx)(_ink.Text,{children:" "})}),CheckBox=({isSelected})=>/*#__PURE__*/(0,_jsxRuntime.jsx)(_ink.Box,{marginRight:1,children:/*#__PURE__*/(0,_jsxRuntime.jsx)(_ink.Text,{color:"cyan",children:isSelected?_figures.default.tick:" "})}),CommandError=errors=>{const log=(0,_pino.default)({prettyPrint:{levelFirst:!0}},_pino.default.destination("./tomo-errors.txt"));// eslint-disable-line react-hooks/exhaustive-deps
return(0,_react.useEffect)(()=>{log.error(errors)},[]),/*#__PURE__*/(0,_jsxRuntime.jsxs)(_ink.Box,{flexDirection:"column",marginTop:1,marginLeft:1,children:[/*#__PURE__*/(0,_jsxRuntime.jsxs)(_ink.Box,{children:[/*#__PURE__*/(0,_jsxRuntime.jsx)(X,{}),/*#__PURE__*/(0,_jsxRuntime.jsxs)(_ink.Text,{children:["Something has gone horribly ",/*#__PURE__*/(0,_jsxRuntime.jsx)(_ink.Text,{bold:!0,color:"red",children:"wrong"})]})]}),/*#__PURE__*/(0,_jsxRuntime.jsxs)(_ink.Box,{marginLeft:2,children:[/*#__PURE__*/(0,_jsxRuntime.jsxs)(_ink.Text,{children:["\u21B3",space]}),/*#__PURE__*/(0,_jsxRuntime.jsx)(_ink.Text,{dim:!0,children:"Details written to ./tomo-errors.txt"})]})]})};exports.CommandError=CommandError;const Debug=({data,title})=>{const{completed,errors,skipped,terms,options}=data,formatted=Object.keys(options).filter(key=>!(0,_is2.default)(String)(options[key])).map(key=>`${key} - ${options[key]}`).sort(),print=value=>{var _ref,_value;return _ref=(_value=value,(0,_api.format)(_value)),(0,_cardinal.highlight)(_ref)},DebugValue=({title="value",value})=>/*#__PURE__*/(0,_jsxRuntime.jsx)(_ink.Box,{children:/*#__PURE__*/(0,_jsxRuntime.jsxs)(_ink.Text,{children:[/*#__PURE__*/(0,_jsxRuntime.jsx)(_ink.Text,{dim:!0,children:title}),": ",print(value)]})});return DebugValue.propTypes={value:_propTypes.default.any},/*#__PURE__*/(0,_jsxRuntime.jsxs)(_ink.Box,{flexDirection:"column",marginTop:1,marginLeft:1,children:[/*#__PURE__*/(0,_jsxRuntime.jsxs)(_ink.Box,{marginBottom:1,children:[/*#__PURE__*/(0,_jsxRuntime.jsx)(_ink.Text,{bold:!0,color:"cyan",children:"DEBUG: "}),/*#__PURE__*/(0,_jsxRuntime.jsx)(_ink.Text,{bold:!0,dim:!0,children:title})]}),/*#__PURE__*/(0,_jsxRuntime.jsx)(DebugValue,{title:"Terms",value:terms}),/*#__PURE__*/(0,_jsxRuntime.jsx)(DebugValue,{title:"Options",value:formatted}),/*#__PURE__*/(0,_jsxRuntime.jsx)(DebugValue,{title:"Completed",value:completed}),/*#__PURE__*/(0,_jsxRuntime.jsx)(DebugValue,{title:"Skipped",value:skipped}),/*#__PURE__*/(0,_jsxRuntime.jsx)(DebugValue,{title:"Errors",value:errors})]})};exports.Debug=Debug;const Description=({command,descriptions})=>{return/*#__PURE__*/(0,_jsxRuntime.jsx)(_ink.Box,{marginBottom:1,children:/*#__PURE__*/(0,_jsxRuntime.jsx)(_ink.Text,{color:"cyan",children:(item=>{const lookup=(0,_api.dict)(descriptions),value=lookup.has(item)?lookup.get(item):lookup.has("default")?lookup.get("default"):item=>`${(0,_chalk.dim)("Sorry, I don't have anything to say about")} ${item}`;return"function"==typeof value?value(item):value})(command)})})};exports.Description=Description;const ErrorMessage=({info})=>/*#__PURE__*/(0,_jsxRuntime.jsxs)(_ink.Box,{flexDirection:"column",marginBottom:1,children:[/*#__PURE__*/(0,_jsxRuntime.jsx)(_ink.Box,{borderStyle:"single",borderColor:"yellow",margin:1,paddingLeft:1,paddingRight:1,width:26,children:/*#__PURE__*/(0,_jsxRuntime.jsx)(_ink.Text,{color:"yellow",children:"(\u256F\xB0\u25A1 \xB0)\u256F \u253B\u2501\u253B arrrgh..."})}),/*#__PURE__*/(0,_jsxRuntime.jsxs)(_ink.Box,{marginLeft:4,children:[/*#__PURE__*/(0,_jsxRuntime.jsxs)(_ink.Text,{children:["\u21B3",space]}),/*#__PURE__*/(0,_jsxRuntime.jsx)(_ink.Text,{dim:!0,children:"Something went wrong..."})]}),/*#__PURE__*/(0,_jsxRuntime.jsx)(_ink.Box,{marginLeft:6,marginTop:1,children:/*#__PURE__*/(0,_jsxRuntime.jsx)(_ink.Text,{dim:!0,children:info})})]});exports.ErrorMessage=ErrorMessage;class ErrorBoundary extends _react.Component{constructor(props){super(props),this.state={info:"",error:{},hasError:!1}}static getDerivedStateFromError(){return{hasError:!0}}componentDidCatch(error,info){this.setState({error,info})}render(){const{error,hasError}=this.state,{children}=this.props;return hasError?/*#__PURE__*/(0,_jsxRuntime.jsx)(ErrorMessage,{error:error}):children}}exports.ErrorBoundary=ErrorBoundary;const SubCommandSelect=({command,descriptions,items,onSelect})=>{const[highlighted,setHighlighted]=(0,_react.useState)(items[0].value),showWithRemove=`${_chalk.bold.yellow("CAUTION:")} tomo shall ${_chalk.bold.red("remove")} that which tomo would have ${_chalk.bold.green("added")}`;return/*#__PURE__*/(0,_jsxRuntime.jsxs)(_ink.Box,{flexDirection:"column",paddingTop:1,paddingBottom:1,paddingLeft:1,children:["remove"===command?/*#__PURE__*/(0,_jsxRuntime.jsx)(_ink.Text,{marginBottom:1,children:showWithRemove}):/*#__PURE__*/(0,_jsxRuntime.jsx)(Description,{command:highlighted,descriptions:descriptions}),/*#__PURE__*/(0,_jsxRuntime.jsx)(_inkSelectInput.default,{items:items,onSelect:onSelect,onHighlight:item=>{setHighlighted(item.value)},itemComponent:Item,indicatorComponent:Indicator})]})};exports.SubCommandSelect=SubCommandSelect;const SubCommandMultiSelect=({descriptions,items,onSubmit})=>{const[highlighted,setHighlighted]=(0,_react.useState)(items[0].value),[selected,setSelected]=(0,_react.useState)([]);return/*#__PURE__*/(0,_jsxRuntime.jsxs)(_ink.Box,{flexDirection:"column",paddingTop:1,paddingBottom:1,paddingLeft:1,children:[/*#__PURE__*/(0,_jsxRuntime.jsxs)(_ink.Box,{flexDirection:"column",marginBottom:1,children:[/*#__PURE__*/(0,_jsxRuntime.jsxs)(_ink.Text,{dim:!0,children:[0<selected.length?`selected ${_figures.default.pointerSmall} `:"...press spacebar to select items",selected.sort().join(", ")]}),0<selected.length?/*#__PURE__*/(0,_jsxRuntime.jsx)(_ink.Text,{dim:!0,children:" \u21B3 press ENTER to see suggestions"}):/*#__PURE__*/(0,_jsxRuntime.jsx)(_ink.Text,{children:" "})]}),/*#__PURE__*/(0,_jsxRuntime.jsx)(Description,{command:highlighted,descriptions:descriptions}),/*#__PURE__*/(0,_jsxRuntime.jsx)(_inkMultiSelect.default,{items:items,onSelect:item=>{const{value}=item;setSelected(selected.concat(value))},onSubmit:onSubmit,onUnselect:item=>{const{value}=item;setSelected(selected.filter(item=>item!==value))},onHighlight:item=>{setHighlighted(item.value)},itemComponent:Item,indicatorComponent:Indicator,checkboxComponent:CheckBox})]})};exports.SubCommandMultiSelect=SubCommandMultiSelect;const UnderConstruction=()=>/*#__PURE__*/(0,_jsxRuntime.jsx)(_ink.Box,{marginBottom:1,children:/*#__PURE__*/(0,_jsxRuntime.jsx)(_ink.Box,{borderStyle:"classic",borderColor:"yellow",margin:1,paddingLeft:1,paddingRight:1,children:/*#__PURE__*/(0,_jsxRuntime.jsx)(_ink.Text,{bold:!0,color:"yellow",children:"UNDER CONSTRUCTION"})})});/**
 * Component to display warning message requiring user input
 * @param {Object} props Function component props
 * @param {ReactNode} props.children Function component children
 * @param {function} props.callback Function to be called after user interacts with warning
 * @return {ReactComponent} Warning component
 */exports.UnderConstruction=UnderConstruction;const Warning=({callback,children})=>{const{setRawMode,stdin}=(0,_ink.useStdin)();return(0,_react.useEffect)(()=>(setRawMode&&setRawMode(!0),stdin.on("data",callback),function(){stdin.removeListener("data",callback),setRawMode&&setRawMode(!1)})),/*#__PURE__*/(0,_jsxRuntime.jsxs)(_ink.Box,{flexDirection:"column",marginBottom:1,children:[/*#__PURE__*/(0,_jsxRuntime.jsx)(_ink.Box,{borderStyle:"round",borderColor:"yellow",margin:1,paddingLeft:1,paddingRight:1,width:11,children:/*#__PURE__*/(0,_jsxRuntime.jsx)(_ink.Text,{yellow:!0,children:"oops..."})}),/*#__PURE__*/(0,_jsxRuntime.jsx)(_ink.Box,{marginLeft:4,children:/*#__PURE__*/(0,_jsxRuntime.jsxs)(_ink.Text,{children:["\u21B3",space,children]})}),/*#__PURE__*/(0,_jsxRuntime.jsxs)(_ink.Box,{marginLeft:6,marginTop:1,children:[/*#__PURE__*/(0,_jsxRuntime.jsx)(_ink.Text,{dim:!0,children:"Press "}),/*#__PURE__*/(0,_jsxRuntime.jsx)(_ink.Text,{bold:!0,children:"ENTER"}),/*#__PURE__*/(0,_jsxRuntime.jsx)(_ink.Text,{dim:!0,children:" to continue"})]})]})};exports.Warning=Warning;const OfflineWarning=()=>{const title="(\u2312_\u2312;) This is awkward...";return/*#__PURE__*/(0,_jsxRuntime.jsxs)(_ink.Box,{flexDirection:"column",marginBottom:1,children:[/*#__PURE__*/(0,_jsxRuntime.jsx)(_ink.Box,{borderStyle:"round",borderColor:"yellow",margin:1,paddingLeft:1,paddingRight:1,width:title.length+4,children:/*#__PURE__*/(0,_jsxRuntime.jsx)(_ink.Text,{color:"yellow",children:title})}),/*#__PURE__*/(0,_jsxRuntime.jsxs)(_ink.Box,{marginLeft:4,flexDirection:"column",children:[/*#__PURE__*/(0,_jsxRuntime.jsxs)(_ink.Text,{children:["\u21B3",space,/*#__PURE__*/(0,_jsxRuntime.jsxs)(_ink.Text,{children:["...you appear to be ",/*#__PURE__*/(0,_jsxRuntime.jsx)(_ink.Text,{bold:!0,color:"red",children:"offline"}),". If this is expected, "]})]}),/*#__PURE__*/(0,_jsxRuntime.jsxs)(_ink.Text,{children:["\u21B3",space,/*#__PURE__*/(0,_jsxRuntime.jsxs)(_ink.Text,{children:["feel free to ignore this warning or use the ",/*#__PURE__*/(0,_jsxRuntime.jsx)(_ink.Text,{bold:!0,color:"cyan",children:"--ignore-warnings"})," flag"]})]})]})]})};exports.OfflineWarning=OfflineWarning;const Status=({tasks,completed,skipped})=>{const tasksComplete=completed.length+skipped.length===tasks.length;return/*#__PURE__*/(0,_jsxRuntime.jsx)(_ink.Box,{flexDirection:"column",children:/*#__PURE__*/(0,_jsxRuntime.jsxs)(_ink.Box,{marginLeft:4,marginBottom:1,children:[/*#__PURE__*/(0,_jsxRuntime.jsxs)(_ink.Text,{dim:!0,children:["\u21B3",space]}),tasksComplete?/*#__PURE__*/(0,_jsxRuntime.jsx)(_ink.Text,{bold:!0,color:"green",children:"All Done!"}):/*#__PURE__*/(0,_jsxRuntime.jsxs)(_react.Fragment,{children:[/*#__PURE__*/(0,_jsxRuntime.jsx)(_ink.Text,{dim:!0,children:"Finished "}),/*#__PURE__*/(0,_jsxRuntime.jsx)(_ink.Text,{bold:!0,color:"white",children:completed.length}),/*#__PURE__*/(0,_jsxRuntime.jsx)(_ink.Text,{bold:!0,dim:!0,children:" of "}),/*#__PURE__*/(0,_jsxRuntime.jsx)(_ink.Text,{bold:!0,color:"white",children:tasks.length-skipped.length}),/*#__PURE__*/(0,_jsxRuntime.jsx)(_ink.Text,{dim:!0,children:" tasks"})]}),/*#__PURE__*/(0,_jsxRuntime.jsx)(_ink.Text,{dim:!0,children:" ("}),tasksComplete&&/*#__PURE__*/(0,_jsxRuntime.jsxs)(_react.Fragment,{children:[/*#__PURE__*/(0,_jsxRuntime.jsx)(_ink.Text,{bold:!0,children:completed.length}),/*#__PURE__*/(0,_jsxRuntime.jsx)(_ink.Text,{dim:!0,children:" completed, "})]}),/*#__PURE__*/(0,_jsxRuntime.jsx)(_ink.Text,{bold:!0,children:skipped.length}),/*#__PURE__*/(0,_jsxRuntime.jsx)(_ink.Text,{dim:!0,children:" skipped"}),/*#__PURE__*/(0,_jsxRuntime.jsx)(_ink.Text,{children:")"})]})})};exports.Status=Status;const WarningAndErrorsHeader=({errors,hasError,isOnline,options:{ignoreWarnings,skipInstall}})=>/*#__PURE__*/(0,_jsxRuntime.jsxs)(_react.Fragment,{children:[!isOnline&&!(skipInstall||ignoreWarnings)&&/*#__PURE__*/(0,_jsxRuntime.jsx)(OfflineWarning,{}),hasError&&/*#__PURE__*/(0,_jsxRuntime.jsx)(CommandError,{errors:errors})]});/**
 * Task component
 * @param {Object} props Function component props
 * @param {boolean} props.isComplete Control display of check (true) or loading (false)
 * @param {boolean} props.isErrored Control display of x (true)
 * @param {boolean} props.isSkipped Control color of check - green (false) or dim (true)
 * @param {string} props.text Task text
 * @example
 * <Task text={'This task is done before it starts'} isComplete={true}></Task>
 * @return {ReactComponent} Task component
 */exports.WarningAndErrorsHeader=WarningAndErrorsHeader;const Task=({isComplete,isErrored,isPending,isSkipped,text})=>/*#__PURE__*/(0,_jsxRuntime.jsxs)(_ink.Box,{flexDirection:"row",marginLeft:3,children:[isComplete&&/*#__PURE__*/(0,_jsxRuntime.jsx)(Check,{isSkipped:isSkipped}),isErrored&&/*#__PURE__*/(0,_jsxRuntime.jsx)(X,{}),isPending&&/*#__PURE__*/(0,_jsxRuntime.jsx)(Pending,{}),/*#__PURE__*/(0,_jsxRuntime.jsx)(_ink.Text,{dim:isComplete,children:text})]});exports.Task=Task;const Tasks=({debug,options,state,tasks})=>/*#__PURE__*/(0,_jsxRuntime.jsx)(_ink.Box,{flexDirection:"column",marginBottom:1,children:tasks.filter(_api.isValidTask).filter(_api.isUniqueTask).map(({optional,text},index)=>{const{completed,errors,skipped}=state,isSkipped=skipped.includes(index),isComplete=completed.includes(index)||isSkipped,isErrored=errors.map(error=>error.payload.index).includes(index),isPending=[isComplete,isSkipped,isErrored].every(val=>!val),showDebug=debug&&/*#__PURE__*/(0,_jsxRuntime.jsxs)(_ink.Text,{color:"cyan",children:[index," - ",text]}),shouldBeShown=((val,options)=>val===void 0||(0,_is2.default)(Function)(val)&&val(options))(optional,options),isCurrentOrPrevious=index<=Math.max(...completed,...skipped)+1;return isCurrentOrPrevious&&shouldBeShown?/*#__PURE__*/(0,_jsxRuntime.jsx)(Task,{text:text,isSkipped:isSkipped,isComplete:isComplete,isErrored:isErrored,isPending:isPending},text):/*#__PURE__*/(0,_jsxRuntime.jsx)(_ink.Text,{children:showDebug},text)})});exports.Tasks=Tasks;const TaskListTitle=({command,hasError,isComplete,terms})=>{const title=`${command} ${terms.join(" ")}`;return/*#__PURE__*/(0,_jsxRuntime.jsx)(_ink.Box,{borderColor:isComplete?"green":hasError?"red":"cyan",borderStyle:"round",margin:1,paddingLeft:1,paddingRight:1,width:title.length+4,children:/*#__PURE__*/(0,_jsxRuntime.jsx)(_ink.Text,{bold:!0,children:title})})};/**
 * Task list component
 * @param {Object} props Function component props
 * @param {string} props.command Command - new | create | add
 * @param {Object} props.options Command line flags (see help)
 * @param {string[]} props.terms Terms - eslint | babel | jest | postcss | docs
 * @example
 * <TaskList command={'add'} terms={'eslint'} options={{skipInstall: true}}></TaskList>
 * @return {ReactComponent} Task list component
 */exports.TaskListTitle=TaskListTitle;const TaskList=({command,commands,options,terms,done})=>{const[state,dispatch]=(0,_react.useReducer)((state,{type,payload})=>{const{completed,errors,skipped}=state,update=val=>assign({},state,val),lookup=(0,_api.dict)({complete:()=>update({completed:[...completed,payload]}),skipped:()=>update({skipped:[...skipped,payload]}),error:()=>update({errors:[...errors,{payload}]}),status:()=>update({status:payload})});return lookup.has(type)?lookup.get(type)():state},{completed:[],skipped:[],errors:[],status:{online:!0}}),{completed,errors,skipped,status:{online}}=state,{debug}=options,tasks=terms.flatMap(term=>commands[command][term]).flatMap(val=>(0,_api.maybeApply)(val,options)).flatMap(val=>(0,_api.maybeApply)(val,options)),customOptions=assign(tasks.filter((0,_complement2.default)(_api.isValidTask)).reduce((acc,val)=>_objectSpread(_objectSpread({},acc),val),options),{isNotOffline:online}),validTasks=tasks.filter(_api.isValidTask).filter(_api.isUniqueTask),tasksComplete=completed.length+skipped.length===validTasks.length,hasError=0<errors.length;return(0,_react.useEffect)(()=>{(0,_api.populateQueue)({tasks,dispatch,options:customOptions})},[]),tasksComplete&&(0,_api.maybeApply)(done,customOptions),/*#__PURE__*/(0,_jsxRuntime.jsxs)(ErrorBoundary,{children:[debug&&/*#__PURE__*/(0,_jsxRuntime.jsx)(Debug,{data:{tasks,terms,errors,skipped,completed,options:customOptions},title:"Tasklist data"}),/*#__PURE__*/(0,_jsxRuntime.jsx)(WarningAndErrorsHeader,{errors:errors,hasError:hasError,isOnline:online,options:customOptions}),/*#__PURE__*/(0,_jsxRuntime.jsxs)(_ink.Box,{flexDirection:"column",marginBottom:1,children:[/*#__PURE__*/(0,_jsxRuntime.jsx)(TaskListTitle,{command:command,hasError:hasError,isComplete:tasksComplete,terms:terms}),/*#__PURE__*/(0,_jsxRuntime.jsx)(Status,{completed:completed,skipped:skipped,tasks:validTasks}),/*#__PURE__*/(0,_jsxRuntime.jsx)(Tasks,{debug:debug,options:customOptions,state:state,tasks:tasks})]})]})};exports.TaskList=TaskList,Check.propTypes={isSkipped:_propTypes.default.bool},Check.defaultProps={isSkipped:!1},CheckBox.propTypes={isSelected:_propTypes.default.bool},CheckBox.defaultProps={isSelected:!1},Debug.propTypes={data:_propTypes.default.any,title:_propTypes.default.string},Description.propTypes={command:_propTypes.default.string,descriptions:_propTypes.default.object},SubCommandSelect.propTypes={command:_propTypes.default.string,descriptions:_propTypes.default.object,items:_propTypes.default.arrayOf(_propTypes.default.object),onSelect:_propTypes.default.func},SubCommandMultiSelect.propTypes={descriptions:_propTypes.default.object,items:_propTypes.default.arrayOf(_propTypes.default.object),onSubmit:_propTypes.default.func},Indicator.propTypes={isHighlighted:_propTypes.default.bool,isSelected:_propTypes.default.bool},Indicator.defaultProps={isHighlighted:!1,isSelected:!1},Item.propTypes={isHighlighted:_propTypes.default.bool,isSelected:_propTypes.default.bool,label:_propTypes.default.string.isRequired},Item.defaultProps={isHighlighted:!1,isSelected:!1},ErrorMessage.propTypes={info:_propTypes.default.string},ErrorBoundary.propTypes={children:_propTypes.default.node},Status.propTypes={completed:_propTypes.default.array,skipped:_propTypes.default.array,tasks:_propTypes.default.arrayOf(_propTypes.default.object)},Task.propTypes={isComplete:_propTypes.default.bool,isErrored:_propTypes.default.bool,isSkipped:_propTypes.default.bool,isPending:_propTypes.default.bool,text:_propTypes.default.string},Task.defaultProps={isComplete:!1,isErrored:!1,isSkipped:!1,isPending:!1,text:"task description"},TaskList.propTypes={command:_propTypes.default.string,commands:_propTypes.default.object,options:_propTypes.default.any,terms:_propTypes.default.arrayOf(_propTypes.default.string),done:_propTypes.default.func},TaskList.defaultProps={command:"",options:{skipInstall:!1},terms:[]},TaskListTitle.propTypes={command:_propTypes.default.string,hasError:_propTypes.default.bool,isComplete:_propTypes.default.bool,terms:_propTypes.default.arrayOf(_propTypes.default.string)},Tasks.propTypes={debug:_propTypes.default.bool,options:_propTypes.default.object,state:_propTypes.default.object,tasks:_propTypes.default.arrayOf(_propTypes.default.object)},Warning.propTypes={callback:_propTypes.default.func,children:_propTypes.default.node},WarningAndErrorsHeader.propTypes={errors:_propTypes.default.array,hasError:_propTypes.default.bool,isOnline:_propTypes.default.bool,options:_propTypes.default.object};