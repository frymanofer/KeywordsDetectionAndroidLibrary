import { useState, useEffect, useCallback } from "react";
import {
    createKeyWordRNBridgeInstance,
    KeyWordRNBridgeInstance,
  } from './KeyWordRNBridge';
import { Platform } from "react-native";
  
type DetectionCallback = (event: any) => void;

var license = "MTczMjkxNzYwMDAwMA==-DDwBWs914KpHbWBBSqi28vhiM4l5CYG+YgS2n9Z3DMI=";
interface keyWordRNBridgeInstanceConfig {
    id: string;
    instance: KeyWordRNBridgeInstance;
}

interface instanceConfig {
    id: string;
    modelName: string;
    threshold: number;
    bufferCnt: number;
    sticky: boolean;
}

const keyWordRNBridgeInstances: keyWordRNBridgeInstanceConfig[] = [];
function findInstanceById(id: string): keyWordRNBridgeInstanceConfig | undefined {
    return keyWordRNBridgeInstances.find(config => config.id === id);
}

// Create an array of instance configurations
var instanceConfigs:instanceConfig[] = [
    { id: 'need_help_now', modelName: 'need_help_now.onnx', threshold: 0.9999, bufferCnt: 3 , sticky: false },
];

// Function to add a new instance dynamically
//async function addInstance(
//    conf: instanceConfig) 
async function addInstance(
    conf: instanceConfig,
    callback: (phrase: string) => void
): Promise<KeyWordRNBridgeInstance | null> {
    const id = conf.id;
    const instanceConf = findInstanceById(id);
    if (instanceConf != null) {
        console.log("Found Instance: ", id, "starting to listen");
        const instance = instanceConf.instance;
        instance.startKeywordDetection(conf.threshold);
        return instance;
    }
    const instance = await createKeyWordRNBridgeInstance(id, conf.sticky);
    let isLicesed = false;
  
    if (!instance) {
        console.error(`Failed to create instance ${id}`);
        return null;
    }
    console.log(`Instance ${id} created ${instance}`);
    await instance.createInstance(conf.modelName, conf.threshold, conf.bufferCnt);
    console.log(`Instance ${id} createInstance() called`);

    isLicesed = await instance.setKeywordDetectionLicense(license);
    console.log(`Instance ${id} created ${instance} and licensed ${isLicesed}`);
  
    keyWordRNBridgeInstances.push({ id, instance });
      // Set up event listener
    instance.onKeywordDetectionEvent((phrase: string) => {
      console.log(`Instance ${id} detected: ${id} with phrase`, phrase);
      // callback(phrase); Does not work on IOS
      callback(id);
    });
    console.log(`Instance ${id} calling startKeywordDetection()`);
    instance.startKeywordDetection(conf.threshold);
    console.log(`Instance ${id} started Keyword Detection`);
    return instance;
  }
  
  // Function to remove an instance dynamically
function removeInstance(id: string): void {
    const instanceIndex = keyWordRNBridgeInstances.findIndex((item) => item.id === id);
  
    if (instanceIndex !== -1) {
      const { instance } = keyWordRNBridgeInstances[instanceIndex];
  
      instance
        .stopKeywordDetection()
        .then(() => instance.destroyInstance())
        .then(() => {
          instance.removeListeners();
          console.log(`Instance ${id} stopped and destroyed`);
          keyWordRNBridgeInstances.splice(instanceIndex, 1);
        })
        .catch((error: Error) =>
          console.error(`Error stopping instance ${id}: ${error.message}`)
        );
    } else {
      console.error(`Instance ${id} not found`);
    }
  }
  
/**
 * Custom hook for handling keyword detection using KeyWordRNBridge
 * @returns An object with functions and state for keyword detection
 */
export const useModel = () => {
    // State to track whether the keyword detection is currently active
    const [isListening, setIsListening] = useState(false);
    let currentEventListener: any[] = [];
    /**
     * Set the keyword detection license
     * @param licenseKey - The license key
     */
    // const setLicense = useCallback(async (licenseKey: any) => {
    //     try {
    //         await KeyWordRNBridge.setKeywordDetectionLicense(licenseKey);
    //     } catch (error) {
    //         console.error("[useModel] Error setting license:", error);
    //     }
    // }, []);

        /**
     * Sets the keyword detection license
     * @param licenseKey - The linceseKey
     */
    const setKeywordDetectionLicense = useCallback(        
        async (licenseKey: string): Promise<void> => {
        license = licenseKey;
    }, []);

    
    /**
     * Load the keyword detection model
     * @param modelFileName - The name of the model file to load
     * @param threshold - The detection threshold
     * @param bufferCount - The number of audio buffers
     */
    const loadModel = useCallback(
        async (useConfigs: instanceConfig[], callback: (phrase: string) => void): Promise<void> => {

        console.log("loadModel()");
        instanceConfigs = useConfigs;
        let element:any = null;
        console.log("loadModel() - instanceConfigs == ", instanceConfigs)
        try {
            instanceConfigs.forEach(element => {
            console.log('Adding element:', element);
            const id = addInstance(element, callback);
            });
        } catch (error) {
            console.error("[useModel] Error loading model:", error);
        }
    }, []);

    /**
     * Stop listening for the keyword
     */
    const startListening = useCallback(async () => {
        try {
            keyWordRNBridgeInstances.forEach(element => {
                const instance = element.instance;
                const conf = instanceConfigs.find(element => element.id === instance.instanceId);
                if (conf) {
                    instance.startKeywordDetection(conf.threshold);
                } else {
                    console.error(`No configuration found for instance ID: ${instance.instanceId}`);
                }
                /*if (instance.isSticky == false) {
                    instance.stopKeywordDetection();
                } else if (Platform.OS != 'ios') {
                    instance.stopKeywordDetection();
                }*/
            }); 
            setIsListening(true);
        } catch (error) {
            console.error("Error starting keyword detection:", error);
        }
    }, []);
    
    /**
     * Stop listening for the keyword
     */
    const stopListening = useCallback(async () => {
        try {
            keyWordRNBridgeInstances.forEach(element => {
                const instance = element.instance;
                instance.stopKeywordDetection();
                /*if (instance.isSticky == false) {
                    instance.stopKeywordDetection();
                } else if (Platform.OS != 'ios') {
                    instance.stopKeywordDetection();
                }*/
            }); 
            setIsListening(false);
        } catch (error) {
            console.error("Error stopping keyword detection:", error);
        }
    }, []);

    /**
     * Cleanup effect to stop listening when the component unmounts
     * or when the isListening state changes
     */
    useEffect(() => {
        console.log("isListening updated:", isListening);
        return () => {
            if (isListening) {
                stopListening();
            }
        };
    }, [isListening, stopListening]);

    // Return an object with the necessary functions and state
    return {
        isListening,
        startListening,
        loadModel,
        setKeywordDetectionLicense,
        stopListening,
    };
};

export default useModel; // Add this line to allow default import
