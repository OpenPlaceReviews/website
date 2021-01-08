import {get} from "axios";
import { trackPromise } from 'react-promise-tracker'
import { NotFoundError } from './errors';


const getRawHash = (hash) => hash.split(":").pop();
const getShortHash = (hash) => {
  const rawHash = getRawHash(hash);
  return rawHash.substring(0, 16);
}

const splitSignedBy = (signed_by) => {
  if (Array.isArray(signed_by)){
    return signed_by.join(', ');
  }

  return signed_by;
}

const transformBlock = (block) => ({
  ...block,
  clientData: {
    rawHash: getRawHash(block.hash),
    shortHash: getShortHash(block.hash),
    signedByStr: splitSignedBy(block.signed_by),
  }
});

const transformObject = (object) => ({
  ...object,
  clientData: {
    id: Array.isArray(object.id) ? object.id.join(',') : object.id,
    type: object.eval.parentType,
    parentHash: object.eval.parentHash,
    shortHash: object.eval.parentHash.substring(0, 16),
  }
});

const transformOperation = (op) =>  {
  if (op.create) {
    op.new = [ ...op.create ];
    delete op.create;
  }
  if (op.delete) {
    op.old = [ ...op.delete ];
    delete op.delete;
  }

  return {
    ...op,
    ...transformBlock(op),
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

  const { data } = await trackPromise(get('/api/blocks', { params }));
  const blocks = data.blocks.map((b) => transformBlock(b));

  return {
    blocks,
    count: data.blockDepth,
  };
};

export const getBlock = async ({blockId, hash}) => {
  let url;
  const params = {};
  if (!!hash) {
    url = '/api/block-by-hash';
    params.hash = hash;
  } else if(!!blockId) {
    url = '/api/block-header-by-id';
    params.blockId = blockId;
  }

  const { data: block } = await get(url, { params });

  if (Object.keys(block).length === 0) {
    throw new NotFoundError('Block not found')
  }

  return transformBlock(block);
}

export const getQueue = async () => {
  const { data: { ops }} = await get('/api/queue');
  const queue = ops.map(transformOperation);

  return {
    queue,
    count: queue.length,
  };
};

export const getOperations = async () => {
  const params = { type: "sys.operation" };
  const { data } = await trackPromise(get('/api/objects', { params }));

  const operations = data.objects.map(b => ({
    ...b,
    id: b.id[0],
  }));

  return {
    operations,
    count: operations.length,
  };
};

export const getBlockTransactions = async ({blockId, hash} = {}) => {
  let url;
  const params = {};
  if (!!blockId) {
    url = '/api/ops-by-block-id';
    params.blockId = blockId;
  } else if (!!hash) {
    url = '/api/ops-by-block-hash';
    params.hash = hash;
  }

  const { data: { ops }} = await trackPromise(get(url, {params}));

  const operations = ops.map(transformOperation);

  return {
    operations,
    count: operations.length,
  };
}

export const getTransaction = async (hash) => {
  const params = {
    hash,
  };

  const { data } = await get('/api/op-by-hash-in-block', { params });

  if (data.ops.length === 0) {
    throw new NotFoundError('Transaction not found')
  }

  return transformOperation(data.ops[0]);
};

export const getObjects = async (reqParams = {}) => {
  const params = {
    limit: 3,
  };

  if (!!reqParams.limit) {
    params.limit = reqParams.limit;
  }

  if (!!reqParams.type) {
    params.type = reqParams.type;
  }

  const { data } = await get('/api/objects', { params });
  const objects = data.objects.map((ob) => transformObject(ob));

  return {
    objects,
    count: data.count,
  };
};

export const getObjectsById = async (objectId) => {
  const params = {
    type: 'opr.place',
    key: objectId,
  };

  const { data } = await get('/api/objects-by-id', { params });
  const objects = data.objects.map((ob) => transformObject(ob));

  return {
    objects,
    count: data.count,
  };
};
