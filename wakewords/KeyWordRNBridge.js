// KeyWordRNBridge.js
import { NativeModules, NativeEventEmitter, Platform } from 'react-native';

const { KeyWordRNBridge } = NativeModules;
const keywordRNBridgeEmitter = new NativeEventEmitter(KeyWordRNBridge);

if (KeyWordRNBridge) {
    console.log("KeyWordRNBridge is loaded:", KeyWordRNBridge);
  } else {
    console.error("KeyWordRNBridge is not linked correctly.");
  }
  
export class KeyWordRNBridgeInstance {
    instanceId;
    listeners = [];
    isFirstInstance = false;
  
    constructor(instanceId, isSticky) {
      this.instanceId = instanceId;
      this.isSticky = isSticky;
    }
  
    async createInstance(modelName, threshold, bufferCnt) {
      instance = await KeyWordRNBridge.createInstance(
        this.instanceId,
        modelName,
        threshold,
        bufferCnt);
      if (instance && this.isFirstInstance)
      {
        this.isFirstInstance = false;
        await KeyWordRNBridge.startForegroundService(this.instanceId); 
      }
      return instance;
    }

    async setKeywordDetectionLicense(license) {
        return KeyWordRNBridge.setKeywordDetectionLicense(this.instanceId, license);
    }

    async replaceKeywordDetectionModel(modelName, threshold, bufferCnt) {
        return KeyWordRNBridge.replaceKeywordDetectionModel(this.instanceId, modelName, threshold, bufferCnt);
    }
    /*startForegroundService() {
        return KeyWordRNBridge.startForegroundService(this.instanceId);
    }

    stopForegroundService() {
        return KeyWordRNBridge.stopForegroundService(this.instanceId);
    }*/
    async setKeywordLicense(license) {
        return KeyWordRNBridge.setKeywordLicense(this.instanceId, license);
    }

    async startKeywordDetection(threshold) {
        return KeyWordRNBridge.startKeywordDetection(this.instanceId, threshold);
    }

    async stopKeywordDetection() {
        return KeyWordRNBridge.stopKeywordDetection(this.instanceId);
    }

    async destroyInstance() {
        return KeyWordRNBridge.destroyInstance(this.instanceId);
    }

    onKeywordDetectionEvent(callback) {
        const listener = keywordRNBridgeEmitter.addListener('onKeywordDetectionEvent', (event) => {
            if (event.instanceId === this.instanceId) {
                callback(event.phrase);
            }
        });
        this.listeners.push(listener);
    }

    removeListeners() {
        this.listeners.forEach((listener) => listener.remove());
        this.listeners = [];
    }
}

export const removeAllRNBridgeListeners = async () => {
    keywordRNBridgeEmitter.removeAllListeners('onKeywordDetectionEvent');
}

export const createKeyWordRNBridgeInstance = async (instanceId, isSticky) => {
    return new KeyWordRNBridgeInstance(instanceId, isSticky);
};
