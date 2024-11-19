Error - the podsepc must be called KeyWordDetection.podspec and align with sname of KeyWordDetection
also podspec was moved to ../

Pod::Spec.new do |s|
    s.name         = "react-native-wakeword"
    s.version      = "1.0.0" # Update to your package version
    s.summary      = "Wake word detection for React Native."
    s.description  = <<-DESC
                     A React Native module for wake word detection .
                     DESC
    s.homepage     = "https://github.com/frymanofer/KeywordsDetectionAndroidLibrary.git" # Update with your repo URL
    s.license      = { :type => "MIT" } # Update if different
    s.author       = { "Your Name" => "ofer@davoice.io" } # Update with your info
    s.platform     = :ios, "11"
#   s.source       = { :git => "https://github.com/frymanofer/KeywordsDetectionAndroidLibrary.git", :tag => s.version.to_s } # Update accordingly
    s.source       = { :path => "." }

#    s.source_files = "ios/*.{h,m,mm}"
#    s.resources    = "ios/models/*"
  
#    s.vendored_frameworks = "ios/KeyWordDetection.xcframework"
#    s.source_files = "*.{h,m,mm}"
    s.source_files = "*.{h,m,mm,swift}"
    s.resources    = "models/*"
  
    s.vendored_frameworks = "KeyWordDetection.xcframework"


    s.dependency "React"
    s.dependency "onnxruntime-objc", "~> 1.18.0"
    s.dependency "ios-voice-processor", "~> 1.1.0"
  
    s.pod_target_xcconfig = {
      "FRAMEWORK_SEARCH_PATHS" => "\"$(PODS_ROOT)/react-native-wakeword/ios\"",
      "DEFINES_MODULE" => "YES"
    }
  
    s.requires_arc = true
  end
  