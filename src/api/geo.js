import {get} from "axios";

const API_BASE = "";
const FETCH_DATA = `${API_BASE}/api/public/geo/index/data`;

export const fetchData = async (reqParams = {}) => {
  const params = {};

  if (reqParams.tileId) {
    params.tileid = reqParams.tileId;
  }

  const { data } = await get(FETCH_DATA, { params })
  return data;
};
