import {get} from "axios";
import { trackPromise } from 'react-promise-tracker'
import { NotFoundError } from './errors';

const getShortHash = (hash) => {
  const rawHash = hash.split(":").pop();
  return rawHash.substring(0, 16);
}

const getRawHash = (hash) => hash.split(":").pop();

const transformOperation = (op) =>  {
  let action = '';
  if (op.edit) {
    //TODO: "edit" type is new or old?
    action = 'edit';
  } else if (op.create) {
    action = 'create';
    op.new = [ ...op.create ];
    delete op.create;
  } else if (op.delete) {
    action = 'delete';
    op.old = [ ...op.delete ];
    delete op.delete;
  }

  return {
    ...op,
    action,
    fullHash: op.hash,
    hash: getRawHash(op.hash),
    shortHash: getShortHash(op.hash),
  };
};

const transformBlock = (block) => ({
  ...block,
  id: block.block_id,
  block_date: block.date,
  hash: getRawHash(block.hash),
  shortHash: getShortHash(block.hash),
});

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
    blocks: blocks,
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
