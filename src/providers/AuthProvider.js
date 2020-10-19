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
      isVerified: (storage.get('opr-verified') === 'true'),
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

  const logIn = ({name, token = "", isVerified = false}) => {
    storage.set('opr-nickname', name);
    storage.set('opr-token', token);
    storage.set('opr-verified', isVerified);

    setAuthData((state) => {
      return {
        ...state,
        data: {
          name,
          token,
          isVerified,
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

  //LogOut
  useEffect(() => {
    const fetchData = async () => {
      await auth.logOut(authData.data.name);
    };

    if (authData.actions.doLogout) {
      fetchData();

      storage.clear();
      setAuthData((state) => {
        return {
          data: {
            name: "",
            token: "",
            isVerified: false,
          },
          actions: {
            ...state,
            doLogout: false,
          },
        };
      });
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
