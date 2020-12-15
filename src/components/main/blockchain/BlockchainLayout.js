import React, {useEffect, useState} from 'react';
import {Grid} from "@material-ui/core";

import {getOperations} from "../../../api/data";

import Sidebar from "./blocks/sidebar/Sidebar";
import BlockchainRouter from "./BlockchainRouter";

export default function BlockchainLayout() {
  const [opsTypes, setOpsTypes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responce = await getOperations();
        setOpsTypes(responce);
      } catch (e) {
        console.warn('Network request failed ops');
      }
    }

    fetchData();
  }, []);


  return <div className="container">
    <Grid container justify="center" spacing={3}>
      <Grid item xs={9}>
        <BlockchainRouter/>
      </Grid>
      <Grid item xs={3}>
        <Sidebar opsTypes={opsTypes}/>
      </Grid>
    </Grid>
  </div>;
};
