import {get} from "axios";
import { trackPromise } from 'react-promise-tracker'

const API_BASE = "";
const FETCH_BLOCKS = `${API_BASE}/api/blocks`;
const FETCH_QUEUE = `${API_BASE}/api/queue`;
const FETCH_OBJECTS = `${API_BASE}/api/objects`;
const FETCH_QUEUE_BY_ID = `${API_BASE}/api/ops-by-block-id`;
const FETCH_QUEUE_BY_HASH = `${API_BASE}/api/ops-by-block-hash`;
const FETCH_TRANSACTION = `${API_BASE}/api/op-by-hash-in-block`;

const getShortHash = (hash) => {
  const rawHash = hash.split(":").pop();
  return rawHash.substring(0, 16);
}

const getRawHash = (hash) => hash.split(":").pop();

const transformOperation = (op) =>  {
  let objects = [];
  let objects_type = '';

  if (op.create) {
    objects_type = 'create';
  }
  if (op.edit) {
    objects_type = 'edit';
  }
  if (op.delete) {
    objects_type = 'delete';
  }

  const rawObjects = op[objects_type];
  if (Array.isArray(rawObjects)){
    objects = rawObjects.flat();
  } else {
    objects.push(rawObjects);
  }

  if (op.delete) {
    objects = objects.map((o) => ({ id: o }));
  }

  return {
    ...op,
    objects,
    objects_type,
    fullHash: op.hash,
    hash: getRawHash(op.hash),
    shortHash: getShortHash(op.hash),
  };
};

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
    return {
      ...b,
      id: b.block_id,
      block_date: b.date,
      hash: getRawHash(b.hash),
      shortHash: getShortHash(b.hash),
    };
  });

  return {
    blocks: blocks,
    count: data.blockDepth,
  };
};

export const getQueue = async (reqParams = {}) => {
  const {blockId, blockHash} = reqParams;

  let url;
  const params = {};
  if (!!blockId) {
    url = FETCH_QUEUE_BY_ID;
    params.blockId = blockId;
  } else if (!!blockHash) {
    url = FETCH_QUEUE_BY_HASH;
    params.hash = blockHash;
  } else {
    url = FETCH_QUEUE;
  }

  const responce = await trackPromise(get(url, {params}));

  const ops = responce.data.ops.map(transformOperation);

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

  const { data } = await trackPromise(get(FETCH_OBJECTS, { params }));

  const objects = data.objects.map(b => {
    return {
      ...b,
      id: b.id[0],
    }
  });

  return {
    objects,
    count: objects.length,
  };
};

export const getTransaction = async (hash) => {
  const params = {
    hash,
  };

  const { data } = await get(FETCH_TRANSACTION, { params });
  return transformOperation(data.ops[0]);
};
