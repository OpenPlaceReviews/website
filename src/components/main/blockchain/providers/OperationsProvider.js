import React, {useEffect, useState} from "react";

import config from '../../../../config';

import OperationsContext from './OperationsContext';
import {getOperations} from "../../../../api/data";

export default ({children}) => {
  const [state, setState] = useState({
    loading: true,
    types: {}
  });
  const [operations, setOperations] = useState({
    operations: [],
    count: 0,
  });
  const [error, setError] = useState('');

  if (error) {
    throw new Error(error);
  }

  useEffect(() => {
    const script = document.createElement("script");
    script.src = config.blockchain.opsTransformSrc;
    script.async = true;
    script.onload = () => {
      if (!Array.isArray(OP_SYS_TYPES)) {
        setError('Blockchain operation types not loaded!');
        return;
      }

      const types = {};
      OP_SYS_TYPES.forEach((Op) => {
        if (!Op.hasOwnProperty('key')) {
          return;
        }

        types[Op.key()] = new Op();
      });

      setState({
        types,
        loading: false,
      })
    }

    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const results = await getOperations();
      setOperations(results);
    };

    fetchData();
  }, []);

  const contextValue = {
    ...state,
    ...operations,
  }

  return <OperationsContext.Provider value={contextValue}>
    {children}
  </OperationsContext.Provider>;
};

