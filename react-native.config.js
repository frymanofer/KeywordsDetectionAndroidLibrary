module.exports = {
    dependencies: {
        'keyword-detection-rn': {
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

