module.exports = {
    dependencies: {
        'react-native-wakeword': {
            platforms: {
                android: {
                    sourceDir: './android',
                    packageImportPath: 'import com.davoice.keywordspotting.KeyWordRNBridgePackage;',
                    packageInstance: 'new KeyWordRNBridgePackage()',
                },
            },
        },
    },
};

