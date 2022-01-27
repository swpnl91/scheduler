import {useState} from 'react';


const useVisualMode = function(initial) {
  const [history, setHistory] = useState([initial]);

  
  const transition = function(newMode, replace = false) {
    
    setHistory((prev) => { 
      const copyPrev = [...history];
      if (replace) {
        copyPrev.pop();
      }
      return [...copyPrev, newMode];
    });
  }
  
  
  const back = function() {

    if (history.length === 1) {
      return;
    }

    setHistory((prev) => {
      return [...history].slice(0,-1);
    });
  }

  const mode = history[(history.length - 1)];

  return { mode, transition, back };
}

export default useVisualMode;