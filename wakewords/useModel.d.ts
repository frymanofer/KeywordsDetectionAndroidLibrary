/**
 * Custom hook for handling keyword detection using KeyWordRNBridge
 * @returns An object with functions and state for keyword detection
 */
export declare const useModel: () => {
    isListening: boolean;
    startListening: () => Promise<void>;
    loadModel: (state: any, callback: (phrase: string) => void) => Promise<void>;
    stopListening: () => Promise<void>;
};
export default useModel;
