"use strict";(self.webpackChunkmy_app_1=self.webpackChunkmy_app_1||[]).push([[827],{827:(e,s,a)=>{a.r(s),a.d(s,{default:()=>j});var r=a(807),t=a(791),i=a(689),o=a(134),n=a(87);const d={dialogs:"Dialogs_dialogs__JHdzQ",dialogsItems:"Dialogs_dialogsItems__UUH8K",active:"Dialogs_active__g+5X+",messages:"Dialogs_messages__SBuVe",message:"Dialogs_message__OZnZ3",dialogsError:"Dialogs_dialogsError__Go2Tn",error:"Dialogs_error__HZRWW"};var l=a(184);const g=e=>{let s="/dialogs/"+e.id;return(0,l.jsx)("div",{className:"".concat(d.dialog," ").concat(d.active),children:(0,l.jsx)(n.OL,{to:s,children:e.name})})},c=e=>(0,l.jsx)("div",{className:d.message,children:e.text});var m=a(994);const x=e=>{const{register:s,handleSubmit:a,reset:r,formState:{errors:t,touchedFields:i},trigger:n}=(0,o.cI)();return(0,l.jsxs)("form",{onSubmit:a((async s=>{await n(),0===Object.keys(t).length&&(e.addMessage(s.Textarea),r())})),children:[(0,l.jsxs)("div",{children:[(0,l.jsx)(m.ZP,{...s("Textarea",{required:!0,maxLength:{value:1e3,message:"No more than 1000 characters."}}),placeholder:"Enter your message",className:t.Textarea?d.error:""}),i.Textarea&&t.Textarea&&"required"===t.Textarea.type&&(0,l.jsx)("p",{className:d.dialogsError,children:"Textarea is required."}),t.Textarea&&"maxLength"===t.Textarea.type&&(0,l.jsx)("p",{className:d.dialogsError,children:"No more than 1000 characters."})]}),(0,l.jsx)("div",{children:(0,l.jsx)("button",{type:"submit",children:"Add message"})})]})},h=e=>{const[s,a]=(0,t.useState)(e.dialogsPage.messages);let r=e.dialogsPage,o=null===r||void 0===r?void 0:r.dialogs.map((e=>(0,l.jsx)(g,{name:e.name,id:e.id},e.id))),n=s.map((e=>(0,l.jsx)(c,{text:e.message},e.id)));if(!e.isAuth)return(0,l.jsx)(i.Fg,{to:"/login"});return(0,l.jsxs)("div",{className:d.dialogs,children:[(0,l.jsx)("div",{className:d.dialogsItems,children:o}),(0,l.jsx)("div",{className:d.messages,children:n}),(0,l.jsx)(x,{addMessage:e=>{const r=[...s,{id:s.length+1,message:e}];a(r)}})]})};var u=a(420);let _=e=>({isAuth:e.auth.isAuth});const j=(0,a(154).qC)((0,u.$j)((e=>({dialogsPage:e.dialogsPage,newMessageText:e.dialogsPage.newMessageText})),((e,s)=>({sendMessage:s=>{e((0,r.k)(s))},newMessageText:s.newMessageText}))),(e=>{class s extends t.Component{render(){return this.props.isAuth?(0,l.jsx)(e,{...this.props}):(0,l.jsx)(i.Fg,{to:"/login"})}}return(0,u.$j)(_)(s)}))(h)},994:(e,s,a)=>{a.d(s,{II:()=>l,gx:()=>d,ZP:()=>g});var r=a(791);const t="FormsControl_formControl__sZLpi",i="FormsControl_error__JhzWj";var o=a(184);const n=(0,r.forwardRef)(((e,s)=>{let{input:a,meta:r,children:n}=e;const d=r&&r.touched&&r.error;return(0,o.jsxs)("div",{className:t+" "+(d?i:""),children:[(0,o.jsx)("div",{children:n}),d&&(0,o.jsx)("span",{children:r.error})]})})),d=(0,r.forwardRef)(((e,s)=>{let{input:a,meta:r,...t}=e;return(0,o.jsx)(n,{input:a,meta:r,ref:s,children:(0,o.jsx)("textarea",{...a,...t,ref:s})})})),l=(0,r.forwardRef)(((e,s)=>{let{input:a,meta:r,...t}=e;return(0,o.jsx)(n,{input:a,meta:r,ref:s,children:(0,o.jsx)("input",{...a,...t,ref:s})})})),g=d}}]);
//# sourceMappingURL=827.93ded12c.chunk.js.map