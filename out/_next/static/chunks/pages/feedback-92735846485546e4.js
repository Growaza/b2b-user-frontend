(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[862],{9837:function(e,n,r){"use strict";r.d(n,{Z:function(){return h}});var t=r(7462),a=r(3366),i=r(7294),o=r(6010),s=r(4780),l=r(1719),c=r(8884),u=r(918),m=r(1588),d=r(4867);function f(e){return(0,d.Z)("MuiCard",e)}(0,m.Z)("MuiCard",["root"]);var v=r(5893);const p=["className","raised"],b=(0,l.ZP)(u.Z,{name:"MuiCard",slot:"Root",overridesResolver:(e,n)=>n.root})((()=>({overflow:"hidden"})));var h=i.forwardRef((function(e,n){const r=(0,c.Z)({props:e,name:"MuiCard"}),{className:i,raised:l=!1}=r,u=(0,a.Z)(r,p),m=(0,t.Z)({},r,{raised:l}),d=(e=>{const{classes:n}=e;return(0,s.Z)({root:["root"]},f,n)})(m);return(0,v.jsx)(b,(0,t.Z)({className:(0,o.Z)(d.root,i),elevation:l?8:void 0,ref:n,ownerState:m},u))}))},1359:function(e,n,r){"use strict";r.d(n,{Z:function(){return b}});var t=r(7462),a=r(3366),i=r(7294),o=r(6010),s=r(4780),l=r(1719),c=r(8884),u=r(1588),m=r(4867);function d(e){return(0,m.Z)("MuiCardContent",e)}(0,u.Z)("MuiCardContent",["root"]);var f=r(5893);const v=["className","component"],p=(0,l.ZP)("div",{name:"MuiCardContent",slot:"Root",overridesResolver:(e,n)=>n.root})((()=>({padding:16,"&:last-child":{paddingBottom:24}})));var b=i.forwardRef((function(e,n){const r=(0,c.Z)({props:e,name:"MuiCardContent"}),{className:i,component:l="div"}=r,u=(0,a.Z)(r,v),m=(0,t.Z)({},r,{component:l}),b=(e=>{const{classes:n}=e;return(0,s.Z)({root:["root"]},d,n)})(m);return(0,f.jsx)(p,(0,t.Z)({as:l,className:(0,o.Z)(b.root,i),ownerState:m,ref:n},u))}))},8409:function(e,n,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/feedback",function(){return r(6396)}])},6691:function(e,n,r){"use strict";var t=r(5893),a=(r(7294),r(3950)),i=r(7161);function o(e,n,r){return n in e?Object.defineProperty(e,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[n]=r,e}n.Z=function(e){var n=e.notify,r=e.setNotify,s=function(e,t){"clickaway"!==t&&r(function(e){for(var n=1;n<arguments.length;n++){var r=null!=arguments[n]?arguments[n]:{},t=Object.keys(r);"function"===typeof Object.getOwnPropertySymbols&&(t=t.concat(Object.getOwnPropertySymbols(r).filter((function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable})))),t.forEach((function(n){o(e,n,r[n])}))}return e}({},n,{isOpen:!1}))};return(0,t.jsx)(a.Z,{open:n.isOpen,autoHideDuration:3e3,anchorOrigin:{vertical:"top",horizontal:"right"},onClose:s,children:(0,t.jsx)(i.Z,{severity:n.type,variant:"filled",onClose:s,children:n.message})})}},4545:function(e,n){"use strict";var r=/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,t=/^\d{10}$/,a={validatePostBookingForm:function(e){var n={},r=e.pick_up,a=e.drop,i=e.date_of_jorney,o=e.pickup_time,s=e.prefer_car,l=e.cost_of_jorney,c=e.commission_of_vendor,u=e.customer_name,m=e.customer_mobile_number;e.is_driver_request_form;return r||(n.pick_up="Please enter pickup location"),a||(n.drop="Please enter drop location"),i||(n.date_of_jorney="Please enter date of jorney"),o||(n.pickup_time="Please select pickup time"),s||(n.prefer_car="Please Enter prefer_car"),l||(n.cost_of_jorney="Please Enter cost of jorney"),c||(n.commission_of_vendor="Please Enter commission of vendor"),u||(n.customer_name="Please Enter customer name"),m||(n.customer_mobile_number="Please Enter customer mobile number"),m&&!t.test(m.trim().toString())&&(n.customer_mobile_number="Please Enter valid customer mobile number"),n},validateContactUsForm:function(e){var n={},a=e.name,i=e.email,o=e.phone_number,s=e.msg;return a||(n.name="Please enter name"),i||(n.email="Please enter email"),i&&!r.test(i.trim().toString())&&(n.email="Please enter valid email"),o||(n.phone_number="Please enter phone number"),o&&!t.test(o.trim().toString())&&(n.phone_number="Please Enter valid phone number"),s||(n.msg="Please enter message"),n},validateFeedbackForm:function(e){var n={},a=e.name,i=e.email,o=e.phone_number,s=e.feedback;return a||(n.name="Please enter name"),i||(n.email="Please enter email"),i&&!r.test(i.trim().toString())&&(n.email="Please enter valid email"),o||(n.phone_number="Please enter phone number"),o&&!t.test(o.trim().toString())&&(n.phone_number="Please Enter valid phone number"),s||(n.feedback="Please enter message"),n},validatePostTestimonialsForm:function(e){var n={},r=e.name,t=e.testimonials;return r||(n.name="Please enter name"),t||(n.testimonials="Please enter testimonials"),n},validateMyProfileForm:function(e){var n={},a=e.first_name,i=e.last_name,o=e.email,s=e.password,l=e.phone_number,c=e.razorpay_account_id,u=e.state,m=e.city,d=e.dob;return a||(n.first_name="Please enter first_name"),i||(n.last_name="Please enter last_name"),o||(n.email="Please enter email"),o&&!r.test(o.trim().toString())&&(n.email="Please enter valid email"),s||(n.password="Please select password"),l||(n.phone_number="Please Enter phone_number"),l&&!t.test(l.trim().toString())&&(n.phone_number="Please Enter valid phone number"),c||(n.razorpay_account_id="Please Enter razorpay_account_id"),u||(n.state="Please Enter state"),m||(n.city="Please Enter city"),d||(n.dob="Please Enter date of birth"),n},validateDriverForm:function(e){var n={},a=e.driver_name,i=e.driver_email,o=e.driver_mobile_number,s=e.driver_licence_number,l=e.driver_vehicle_number;return a||(n.driver_name="Please enter driver name"),i||(n.driver_email="Please enter driver email"),i&&!r.test(i.trim().toString())&&(n.driver_email="Please enter valid email"),o||(n.driver_mobile_number="Please enter driver mobile number"),o&&!t.test(o.trim().toString())&&(n.driver_mobile_number="Please Enter valid driver mobile number"),s||(n.driver_licence_number="Please enter driver licence number"),l||(n.driver_vehicle_number="Please enter driver vehicle number"),n}};n.Z=a},6396:function(e,n,r){"use strict";r.r(n);var t=r(4051),a=r.n(t),i=r(5893),o=r(7294),s=r(6513),l=r(2052),c=r(7650),u=r(811),m=r(7594),d=r(6691),f=r(463),v=r(1163),p=r(9072),b=r(9837),h=r(1359),_=r(9630),x=r(8316),g=r(2853),P=r(1953),y=r(754),j=r(4545);function Z(e,n,r,t,a,i,o){try{var s=e[i](o),l=s.value}catch(c){return void r(c)}s.done?n(l):Promise.resolve(l).then(t,a)}function w(e,n,r){return n in e?Object.defineProperty(e,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[n]=r,e}n.default=function(e){var n=e.isNav,r=void 0===n||n,t=((0,v.useRouter)(),(0,o.useState)({name:"",email:"",phone_number:"",feedback:""})),k=t[0],C=t[1],E=(0,o.useState)({}),O=E[0],S=E[1],N=(0,o.useState)("h-auto w-80 p-1 bg-[#fec601] rounded-full mt-20"),F=N[0],M=N[1],z=(0,o.useState)({isOpen:!1,message:"",type:""}),R=z[0],D=z[1],T=(0,o.useState)(),W=T[0],A=T[1],B=function(e){console.log(k,"data");var n=e.target,r=n.name,t=n.value;C(function(e){for(var n=1;n<arguments.length;n++){var r=null!=arguments[n]?arguments[n]:{},t=Object.keys(r);"function"===typeof Object.getOwnPropertySymbols&&(t=t.concat(Object.getOwnPropertySymbols(r).filter((function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable})))),t.forEach((function(n){w(e,n,r[n])}))}return e}({},k,w({},r,t)))};(0,o.useEffect)((function(){M(r?"h-auto w-80 p-1 bg-[#fec601] rounded-full mt-40":"h-auto w-80 p-1 bg-[#fec601] rounded-full mt-20")}),[r]);var I=function(){var e,n=(e=a().mark((function e(n){var r,t;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n.preventDefault(),r=j.Z.validateFeedbackForm(k),console.log("allError",r),0!==Object.entries(r).length||r.constructor!==Object){e.next=19;break}return e.prev=4,A(!0),e.next=8,f.Z.post("/api/v1/common/create-feedback/",k);case 8:t=e.sent,console.log("result",t),t&&t.data&&t.data.valid?D({isOpen:!0,message:(null===t||void 0===t?void 0:t.data.message)?null===t||void 0===t?void 0:t.data.message:"submited successfully",type:"success"}):D({isOpen:!0,message:t.data.message?t.data.message:"this email is already feedbacked",type:"error"}),A(!1),C({name:"",email:"",phone_number:"",feedback:""}),e.next=19;break;case 15:e.prev=15,e.t0=e.catch(4),D({isOpen:!0,message:"please fill the all the values",type:"error"}),A(!1);case 19:S(r);case 20:case"end":return e.stop()}}),e,null,[[4,15]])})),function(){var n=this,r=arguments;return new Promise((function(t,a){var i=e.apply(n,r);function o(e){Z(i,t,a,o,s,"next",e)}function s(e){Z(i,t,a,o,s,"throw",e)}o(void 0)}))});return function(e){return n.apply(this,arguments)}}(),L=(0,s._)(),X=(0,c.YD)({root:null,rootMargin:"0px",threshold:.2}),$=X.ref,q=X.inView;return(0,o.useEffect)((function(){q&&L.start("show")}),[L,q]),(0,i.jsxs)(i.Fragment,{children:[r&&(0,i.jsx)(m.Z,{}),(0,i.jsxs)(l.E.div,{ref:$,animate:L,initial:"hidden",className:"min-h-screen blur-0 flex flex-col items-center justify-evenly bg-stone-800 text-white",id:"contact",children:[(0,i.jsx)(l.E.div,{ref:$,initial:"hidden",variants:(0,u.L7)(.4),animate:L,onChange:function(e){return console.log("Inview:",e)},className:F,children:(0,i.jsx)("h1",{className:"font-semibold text-white text-center text-3xl underline pt-2 pb-2",children:"Feedback"})}),(0,i.jsx)(p.ZP,{container:!0,sx:{width:"100%",display:"flex",justifyContent:"center"},children:(0,i.jsx)(p.ZP,{item:!0,md:6,children:(0,i.jsx)(l.E.div,{ref:$,initial:"hidden",variants:(0,u.L7)(.8),animate:L,onChange:function(e){return console.log("Inview:",e)},className:"grid justify-items-end",children:(0,i.jsx)(b.Z,{sx:{background:"#1261A0",my:4,mx:{md:0,sm:2,xs:4}},children:(0,i.jsx)(h.Z,{sx:{backgroundColor:"#1261A0"},children:(0,i.jsx)("form",{onSubmit:function(e){return e.preventDefault()},children:(0,i.jsxs)(p.ZP,{container:!0,spacing:5,children:[(0,i.jsxs)(p.ZP,{item:!0,xs:12,children:[(0,i.jsx)(_.Z,{variant:"h6",sx:{fontWeight:600,color:"#fff"},children:"Feedback"}),(0,i.jsx)(_.Z,{variant:"subtitle",component:"p",sx:{color:"#fff"},children:"Get in touch using the form below"})]}),(0,i.jsxs)(p.ZP,{item:!0,xs:12,children:[(0,i.jsx)(x.Z,{sx:{color:"#fff"},children:"Name"}),(0,i.jsx)(g.Z,{sx:{borderRadius:"6px",color:"#fff"},type:"text",name:"name",id:"name",autoComplete:"given-name",value:null===k||void 0===k?void 0:k.name,onChange:function(e){return B(e)},fullWidth:!0,error:!(!O||!O.name),helperText:O&&O.name})]}),(0,i.jsxs)(p.ZP,{item:!0,xs:12,children:[(0,i.jsx)(x.Z,{sx:{color:"#fff"},children:"Email"}),(0,i.jsx)(g.Z,{type:"text",name:"email",id:"email",autoComplete:"given-email",value:null===k||void 0===k?void 0:k.email,onChange:function(e){return B(e)},fullWidth:!0,error:!(!O||!O.email),helperText:O&&O.email})]}),(0,i.jsxs)(p.ZP,{item:!0,xs:12,children:[(0,i.jsx)(x.Z,{sx:{color:"#fff"},children:"Phone Number"}),(0,i.jsx)(g.Z,{type:"text",name:"phone_number",id:"phone_number",value:null===k||void 0===k?void 0:k.phone_number,onChange:function(e){return B(e)},fullWidth:!0,error:!(!O||!O.phone_number),helperText:O&&O.phone_number})]}),(0,i.jsxs)(p.ZP,{item:!0,xs:12,children:[(0,i.jsx)(x.Z,{sx:{color:"#fff"},children:"Message"}),(0,i.jsx)(g.Z,{type:"text",name:"feedback",id:"message",value:null===k||void 0===k?void 0:k.feedback,onChange:function(e){return B(e)},fullWidth:!0,error:!(!O||!O.feedback),helperText:O&&O.feedback})]}),(0,i.jsx)(p.ZP,{item:!0,xs:12,sx:{display:"flex",justifyContent:"space-between"},children:W?(0,i.jsx)(P.Z,{sx:{display:"flex",justifyContent:"center"},children:(0,i.jsx)(y.Z,{size:25})}):(0,i.jsx)("button",{className:"inline-flex justify-center py-2 px-8 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#fec601] hover:bg-[#FFCC33] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",onClick:I,children:"Send Feedback"})})]})})})})})})})]}),(0,i.jsx)(d.Z,{notify:R,setNotify:D})]})}}},function(e){e.O(0,[441,522,853,674,568,984,417,774,888,179],(function(){return n=8409,e(e.s=n);var n}));var n=e.O();_N_E=n}]);