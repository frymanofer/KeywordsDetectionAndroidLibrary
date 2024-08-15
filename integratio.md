## Installation

1. Download the AAR file from the [releases page](https://github.com/yourusername/MyLibrary-Binary/releases).
2. Copy the `MyLibrary-release.aar` file to your project's `libs` directory.

3. Add the following to your app directory `build.gradle` file:

```groovy
repositories {
    flatDir {
        dirs 'libs'
    }
}

dependencies {
    implementation fileTree(dir: "libs", include: ["*.aar"])
    }

## Usage

```java
import com.davoice.keywordsdetection.keywordslibrary.KeyWordsDetection;

// Some java file in your project:
    private String licenseKey = "[Your license file]";

... initKeyWordsDetection(...)
// Make sure you have context of some sort such as reactContext
    keyWordsDetection = new KeyWordsDetection(reactContext, modelName, threshold, buffer_cnt);
    if (keyWordsDetection != null) {
        keyWordsDetection.setLicenseKey(licenseKey);
        keyWordsDetection.initialize(onKeywordDetected);

    void onKeywordDetected(Boolean detected) {
        if (detected) {
            // Perform your desired action here
            callback();
        } else {
    }

    ... 
    // Start listening with a threashold:
    keyWordsDetection.startListening(keyThreshold);
    ...
    // Stop Listening:
    keyWordsDetection.stopListening();