import Storage from 'react-native-storage';

const storage = new Storage({ storageBackend: localStorage });

const config = {
  setItem: (key, value) => { storage.save({ key, rawData: value }); },
  getItem: async key => storage.load({ key }),
  removeItem: (key) => { storage.remove({ key }); },
};

Object.freeze(config);

export default config;
