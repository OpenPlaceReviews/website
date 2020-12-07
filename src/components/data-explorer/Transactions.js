import React, {useEffect, useState} from 'react';

import {Box} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import { usePromiseTracker } from "react-promise-tracker";

import { getQueue } from "../../api/data";
import BlockItem from "./list-items/BlockItem";
import Breadcrumbs from "./Breadcrumbs";
import Loader from "../Loader";

const useStyles = makeStyles({
  h1: {
    marginBottom: "20px",
    fontSize: "40px",
    letterSpacing: "0.01em",
  },
  list: {
    borderTop: "1px solid #E4E8F2",
    position: "relative",
    minHeight: "200px",
    paddingBottom: "20px",
  },
});

export default ({match}) => {
  const { promiseInProgress } = usePromiseTracker();
  const [objectsList, setObjects] = useState([]);
  const [isLoaded, setLoaded] = useState(false);
  const classes = useStyles();

  const { params: { id }} = match;

  const params = {}
  if (isNaN(id)) {
    params.blockHash = id;
  } else {
    params.blockId = id;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { queue } = await getQueue(params);

        if (!isLoaded) {
          setLoaded(true);
        }

        setObjects(queue);
      } catch (e) {
        console.warn('Network request failed');
      }
    };

    fetchData();
  }, []);

  let content;
  if (objectsList.length) {
    content = objectsList.map((entity) => <BlockItem key={entity.hash} entity={entity}/>)
  } else {
    content = (<Box display="flex" justifyContent="center"><p>No entities available</p></Box>);
  }

  if (!isLoaded || promiseInProgress) {
    return <Loader/>;
  }

  let crumbs = [
    {url: '/data', text: 'Data'}
  ];
  let header = 'Transactions';

  console.log(!!params.blockId);

  if (!!params.blockId) {
    crumbs = crumbs.concat([
      {url: '/data/blocks', text: 'Blocks'},
      {url: `/data/blocks/#${params.blockId}`, text: `#${params.blockId}`},
      {url: `/data/blocks/#${params.blockId}/transactions`, text: `Transactions`},
    ]);
    header = `Transactions Block#${params.blockId}`;
  } else if(!!params.blockHash) {
    crumbs = crumbs.concat([
      {url: '/data/blocks', text: 'Blocks'},
      {url: `/data/blocks/#${params.blockHash}`, text: params.blockHash.substring(0, 16)},
      {url: `/data/blocks/#${params.blockHash}/transactions`, text: `Transactions`},
    ]);

    header = `Transactions Block ${params.blockHash.substring(0, 16)}`;
  }

  return <div className={classes.list}>
      <Breadcrumbs crumbs={crumbs}/>
      <h1 className={classes.h1}>{header}</h1>

      {content}
    </div>;
};
