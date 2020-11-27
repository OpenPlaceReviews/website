import {get} from "axios";

const API_BASE = "";
const FETCH_DATA = `${API_BASE}/api/blocks`;

export const getBlocks = async (reqParams = {}) => {
  const params = {
    depth: 5,
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

  const { data } = await get(FETCH_DATA, { params })
  return data.blocks;
};
