import React, {useEffect, useState} from 'react';
import {useParams} from "react-router";

import {getBlock} from "../../../api/data";

import Loader from "../blocks/Loader";
import BlockInfo from "./blocks/BlockInfo";
import BlocksHeader from "./blocks/BlocksHeader";
import Error404 from "../Error404";
import JSONViewer from "./blocks/JSONViewer/JSONViewer";

export default () => {
  const { param } = useParams();

  const [state, setState] = useState({
    loading: true,
    block: null,
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let blockId = null;
        let hash = null;
        if (Number(param) > 0) {
          blockId = param;
        } else {
          hash = param;
        }

        const block = await getBlock({blockId, hash});

        setState({
          block,
          loading: false,
        });
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, []);

  if (error) {
    if (error.code === 404) {
      return <Error404/>;
    }

    throw error;
  }

  const {block, loading} = state;
  if (loading) {
    return <Loader/>;
  }

  return <div>
    <BlocksHeader>Block #{block.block_id}</BlocksHeader>
    <BlockInfo block={block}/>
    <JSONViewer open={true} json={block}/>
  </div>;
};
