interface instanceConfig {
    id: string;
    modelName: string;
    threshold: number;
    bufferCnt: number;
    sticky: boolean;
}
/**
 * Custom hook for handling keyword detection using KeyWordRNBridge
 * @returns An object with functions and state for keyword detection
 */
export declare const useModel: () => {
    isListening: boolean;
    startListening: () => Promise<void>;
    loadModel: (useConfigs: instanceConfig[], callback: (phrase: string) => void) => Promise<void>;
    setKeywordDetectionLicense: (licenseKey: string) => Promise<void>;
    stopListening: () => Promise<void>;
};
export default useModel;
