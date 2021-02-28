import { get } from "axios";
import Utils from "../components/util/Utils";

const API_BASE = "";
const FETCH_DATA = `${API_BASE}/api/public/geo/index/data`;
const FETCH_HISTORY_DATA = `${API_BASE}/api/public/history`;

export const fetchData = async (reqParams = {}) => {
  const params = {};

  if (reqParams.tileId) {
    params.tileid = reqParams.tileId;
  }
  const { data } = await get(FETCH_DATA, { params })
  return data;
};

export const fetchHistoryData = async (reqParams = {}) => {
  const params = {};

  if (reqParams.startDate) {
    params.date = Utils.formatDate(reqParams.startDate);
  }
  if (reqParams.endDate) {
    params.date2 = Utils.formatDate(reqParams.endDate);
  }
  if (reqParams.requestFilter) {
    params.requestFilter = reqParams.requestFilter;
  }

  const { data } = await get(FETCH_HISTORY_DATA, { params })
  return data;
};