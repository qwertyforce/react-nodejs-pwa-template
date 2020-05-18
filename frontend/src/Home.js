import React from "react";
import {useSelector} from 'react-redux';
import {selectEmail} from './redux_slices/userDataSlice';

function App_Bar (props) {
  const Email = useSelector(selectEmail);
  return (
    <div>
     <h2>{(Email===null)?<p>please,<a href="/login">log in</a></p>:`Welcome,${Email}`}</h2>
    </div>
  );
}

export default App_Bar;