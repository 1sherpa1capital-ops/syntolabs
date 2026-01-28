function o(e,l){let t=!1;return function(...n){t||(e.apply(null,n),t=!0,setTimeout(()=>t=!1,l))}}export{o as t};
