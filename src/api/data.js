import {get} from "axios";
import { trackPromise } from 'react-promise-tracker'

const API_BASE = "";
const FETCH_BLOCKS = `${API_BASE}/api/blocks`;
const FETCH_QUEUE = `${API_BASE}/api/queue`;
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
  return {
    blocks: data.blocks,
    count: data.blockDepth,
  };
};

export const getQueue = async () => {
  const { data } = await get(FETCH_QUEUE);
  return {
    queue: data.ops,
    count: data.ops.length,
  };
};

export const getOperations = async () => {
  const params = {
    type: "sys.operation",
    limit: 50,
  };

  const { data } = await get(FETCH_OBJECTS, { params });

  const objects = data.objects.map(o => {
    return {
      ...o,
      object_id: o.id[0],
    }
  });

  return {
    objects,
    count: data.objects.length,
  };
};
