// export const API_ROOT = process.env.NEXT_PUBLIC_API_ROOT;
export const API_ROOT = "https://auth";

const API = {
  AUTH: {
    LOGIN: `${API_ROOT}/auth/login`,
  },
};

export default API;
