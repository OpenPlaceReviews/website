import {get} from "axios";
import { trackPromise } from 'react-promise-tracker'

const API_BASE = "";
const FETCH_BLOCKS = `${API_BASE}/api/blocks`;
const FETCH_QUEUE = `${API_BASE}/api/queue`;
const FETCH_OBJECTS = `${API_BASE}/api/objects`;
const FETCH_QUEUE_BY_ID = `${API_BASE}/api/ops-by-block-id`;
const FETCH_QUEUE_BY_HASH = `${API_BASE}/api/ops-by-block-hash`;

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

  const blocks = data.blocks.map((b) => {
    const hash = b.hash.split(":").pop();
    const shortHash = hash.substring(0, 16);

    return {
      ...b,
      hash,
      shortHash,
    };
  });

  return {
    blocks: blocks,
    count: data.blockDepth,
  };
};

export const getQueue = async (reqParams = {}) => {
  const {blockId, blockHash} = reqParams;

  let responce;
  if (!!blockId) {
    responce = await get(FETCH_QUEUE_BY_ID, {params: { blockId }});
  } else if (!!blockHash) {
    responce = await get(FETCH_QUEUE_BY_HASH, {params: { hash: blockHash }});
  } else {
    responce = await get(FETCH_QUEUE);
  }

  const { data: { ops } } = responce;
  return {
    queue: ops,
    count: ops.length,
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
