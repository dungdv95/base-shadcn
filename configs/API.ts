export const API_ROOT = process.env.NEXT_PUBLIC_API_ROOT;
const origin =
  typeof window !== "undefined" && window.location.origin
    ? window.location.origin
    : "";

const API = {
  AUTH: {
    LOGIN: `${API_ROOT}/auth/login`,
    CHANGE_PASSWORD: `${API_ROOT}/users/change-password`,
    // REFRESH_TOKEN: `${ADMIN_URL}/auth/refresh-token`,
  },
  MERCHANTS: {
    LIST: `${API_ROOT}/merchants`,
    CHART: `${API_ROOT}/log-request/getAnalyticInfo`,
    CREATE: `${API_ROOT}/merchants`,
    DEL: `${API_ROOT}/merchants`,
    CONFIG: `${API_ROOT}/merchants/apiCallSetting`,
    REFRESH: `${API_ROOT}/merchants/refresh-secret`,
  },
  LOG_REQUEST: {
    GET: `${API_ROOT}/log-request`,
  },
  CARD_ID: {
    GET: `${API_ROOT}/log-request/distinct`,
  },
  BLACK_LIST: {
    DOMAIN: `${API_ROOT}/blacklist-ips`,
    LIST: `${API_ROOT}/blacklist-ips`,
  },
  USER_GROUP: {
    LIST: `${API_ROOT}/users-group`,
    PERMISSION: `${API_ROOT}/users-group/permission`,
    UPDATE: `${API_ROOT}/users-group`,
  },
  LICENSE: {
    DOMAIN: `${API_ROOT}/lisences`,
    GENERATE_KEY_PAIR: `${API_ROOT}/lisences/generateKeyPair`,
    CONFIG: `${API_ROOT}/lisences/config`,
    UPDATE_CONFIG: `${API_ROOT}/lisences/updateConfig`,
    // PERMISSION: `${API_ROOT}/users-group/permission`
  },
  C06: {
    LIST: `${API_ROOT}/c06-vpn`,
    UPDATE: `${API_ROOT}/c06-vpn/update-primary`,
  },
};

export default API;
