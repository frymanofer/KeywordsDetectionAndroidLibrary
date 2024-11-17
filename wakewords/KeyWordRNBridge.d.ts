export class KeyWordRNBridgeInstance {
    constructor(instanceId: any, isSticky: any);
    instanceId: any;
    listeners: any[];
    isFirstInstance: boolean;
    isSticky: any;
    createInstance(modelName: any, threshold: any, bufferCnt: any): any;
    setKeywordDetectionLicense(license: any): any;
    replaceKeywordDetectionModel(modelName: any, threshold: any, bufferCnt: any): any;
    setKeywordLicense(license: any): any;
    startKeywordDetection(threshold: any): any;
    stopKeywordDetection(): any;
    destroyInstance(): any;
    onKeywordDetectionEvent(callback: any): void;
    removeListeners(): void;
}
export function createKeyWordRNBridgeInstance(instanceId: any, isSticky: any): Promise<KeyWordRNBridgeInstance>;
