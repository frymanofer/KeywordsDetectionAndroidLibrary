export class KeyWordRNBridgeInstance {
    constructor(instanceId: any, isSticky: any);
    instanceId: any;
    listeners: any[];
    isFirstInstance: boolean;
    isSticky: any;
    createInstance(modelName: any, threshold: any, bufferCnt: any): Promise<any>;
    setKeywordDetectionLicense(license: any): Promise<any>;
    replaceKeywordDetectionModel(modelName: any, threshold: any, bufferCnt: any): Promise<any>;
    setKeywordLicense(license: any): Promise<any>;
    startKeywordDetection(threshold: any): Promise<any>;
    stopKeywordDetection(): Promise<any>;
    destroyInstance(): Promise<any>;
    onKeywordDetectionEvent(callback: any): void;
    removeListeners(): void;
}
export function removeAllRNBridgeListeners(): Promise<void>;
export function createKeyWordRNBridgeInstance(instanceId: any, isSticky: any): Promise<KeyWordRNBridgeInstance>;
