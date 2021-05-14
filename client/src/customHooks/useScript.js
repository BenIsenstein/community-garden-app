import { useEffect } from 'react';

const useScript = url => {
  useEffect(() => {
    const script = document.createElement('script');

    script.src = url;
    script.defer = false;
    script.async = false;

    document.body.appendChild(script);

    // return () => {
    //   document.body.removeChild(script);
    // }
  }, [url]);
};

// The url passed into this custom useEffect() hook must not have the '&callback=' parameter. It will get added by the hook.
const useScriptWithCallback = (url, callback) => {
  useEffect(() => {
    // Create a script tag
    // Define a variable "callbackName", with the callback function's "name" attribute
    const script = document.createElement('script');
    let callbackName = callback.name;

    // Add the callback function as a global variable to the window
    // Add the src to the script tag
    window[callbackName] = callback;
    script.src = url + `&callback=${callbackName}`;
    script.async = true;

    // Append the script tag, run the script, then remove the tag
    document.body.appendChild(script);
    return () => {document.body.removeChild(script);}

  }, [url, callback]);
};


/* 
Example of loading a script containing a callback, with the component that uses the script:

import {useScriptWithCallback} from '../customHooks/useScript';
import initMap from './gardenMap'


const MyComponent = props => {
  useScriptWithCallback(url, initMap);

  //Then, provide `googleCallbackName` prop to your component.
  <MapComponent
    googleCallbackName="myCallbackFunc"
  >

  // rest of your component
}


*/

export {useScript, useScriptWithCallback}