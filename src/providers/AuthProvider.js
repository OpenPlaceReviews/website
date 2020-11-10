import React, {useEffect, useState} from "react";

import {UserContext} from "../context";
import auth from "../api/auth";
import storage from "../storage";

export default (props) => {
  const authName = storage.get('opr-nickname') || "";
  const initialAuthData = {
    data: {
      token: storage.get('opr-token') || "",
      name: authName,
    },
    actions: {
      doLogout: false,
    }
  };
  const [authData, setAuthData] = useState(initialAuthData);

  const signUp = ({ name }) => {
    storage.set('opr-nickname', name);
    setAuthData((state) => {
      return {
        ...state,
        data: {
          ...state.data,
          name,
        }
      }
    });
  };

  const logIn = ({name, token = ""}) => {
    storage.set('opr-nickname', name);
    storage.set('opr-token', token);

    setAuthData((state) => {
      return {
        ...state,
        data: {
          name,
          token,
        }
      }
    })
  };

  const logOut = () => {
    setAuthData((state) => {
      return {
        ...state,
        actions: {
          ...state.actions,
          doLogout: true,
        }
      }
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await auth.checkToken(authData.data);
      if (data && data.result === 'OK') return;

      logOut(authData.data.name);
    };

    if (authData.data.token) {
      fetchData();
    }
  }, [authData.data.token]);

  useEffect(() => {
    const fetchData = async () => {
      await auth.logOut(authData.data.name);
    };

    if (authData.actions.doLogout) {
      storage.clear();
      setAuthData((state) => {
        return {
          data: {
            name: "",
            token: "",
          },
          actions: {
            ...state,
            doLogout: false,
          },
        };
      });

      fetchData();
    }
  }, [authData.actions.doLogout]);

  const userContextValue = {
    authData: authData.data,
    signUp,
    logOut,
    logIn,
  };

  return <UserContext.Provider value={userContextValue}>
    {props.children}
  </UserContext.Provider>;
};
