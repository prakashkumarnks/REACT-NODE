//import React from 'react'
import { createStore } from 'redux';
//import reducer from './reducers/reducer'

const reducer = (state, action) => { //es6 arrow function
	
	// console.log('redu');
   switch (action.type) {
      		case "ITEMS_REQUEST":
				    	  return {
				          ...state,
				          data: action.payload - 1
				      }
		    break;
      		default:
      				return state;
   }
}



const store = createStore(reducer,1);
//console.log(store.getState());
store.subscribe(()=>{ console.log(store.getState());});
store.dispatch({  type: "ITEMS_REQUEST", payload : '10000'  });
store.dispatch({  type: "ITEMS_REQUEST", payload : '10001'  });
store.dispatch({  type: "ITEMS_REQUEST", payload : '10002'  });

//export default reducer;
export default reducer;
