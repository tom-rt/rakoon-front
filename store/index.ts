export const state = () => ({
  token: null,
  userId: null,
  isAdmin: false,
  isConnected: false,
  copiedPath: "",
  copiedPathName: "",
  uploadQueue: {},
  currentUploadsNumber: 0
});

export const getters = {
  getCopiedPath: (state) => {
    return state.copiedPath;
  },
  getCopiedPathName: (state) => {
    return state.copiedPathName;
  },
  getToken: (state) => {
    return state.token;
  },
  getIsAdmin: (state) => {
    return state.isAdmin;
  },
  getIsConnected: (state) => {
    return state.isConnected;
  },
  getUploadQueue: (state) => {
    return state.uploadQueue;
  },
  geCurrentUploadsNumber: (state) => {
    return state.currentUploadsNumber;
  },
};

export const mutations = {
  login(state, payload) {
    state.userId = payload.userId;
    state.isAdmin = payload.isAdmin;
    state.token = payload.token;
    state.isConnected = true;
    this.$cookies.set("token", state.token, {
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "none",
      secure: true,
    });
  },
  setToken(state, payload) {
    state.token = payload.token;
    state.isConnected = true;
    this.$cookies.set("token", state.token, {
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "none",
      secure: true,
    });
  },
  setStoreToken(state, payload) {
    state.token = payload.token;
  },
  setCopiedPath(state, path) {
    state.copiedPath = path;
  },
  setCopiedPathName(state, name) {
    state.copiedPathName = name;
  },
  clearUploadQueue(state, payload) {
    const idx = payload.path
    const uploads = payload.uploads
    for (let i = 0; i < uploads.length; i++) {
      state.uploadQueue[idx].splice(state.uploadQueue[idx].indexOf(uploads[i]), 1);
      state.currentUploadsNumber--;
    }
  },
  addToUploadQueue(state, uploadPayload) {
    if (!(uploadPayload.path in state.uploadQueue)) {
      state.uploadQueue[uploadPayload.path] = [];
    }
    state.uploadQueue[uploadPayload.path].push(uploadPayload.fileName);
    state.currentUploadsNumber++;
  },
  logout(state) {
    state.userId = null;
    state.token = null;
    state.isAdmin = false;
    state.isConnected = false;
    this.$cookies.remove("token");
  },
};
