import {get} from "axios";
import { trackPromise } from 'react-promise-tracker'

const API_BASE = "";
const FETCH_BLOCKS = `${API_BASE}/api/blocks`;
const FETCH_OBJECTS = `${API_BASE}/api/objects`;

export const getBlocks = async (reqParams = {}) => {
  const params = {
    depth: 3,
  };

  if (!!reqParams.limit) {
    params.depth = reqParams.limit;
  }
  if (!!reqParams.from) {
    params.from = reqParams.from;
  }
  if (!!reqParams.to) {
    params.to = reqParams.to;
  }

  const { data } = await trackPromise(get(FETCH_BLOCKS, { params }));
  return data.blocks;
};

export const getObjects = async (reqParams = {}) => {
  const params = {
    limit: 5,
    type: "all",
  };

  if (!!reqParams.limit) {
    params.limit = reqParams.limit;
  }
  if (!!reqParams.type) {
    params.type = reqParams.type;
  }

  const { data } = await trackPromise(get(FETCH_OBJECTS, { params }));
  return data.objects;
};
