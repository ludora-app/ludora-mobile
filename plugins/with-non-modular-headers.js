const fs = require("fs");
const path = require("path");
const { withDangerousMod } = require("expo/config-plugins");

const NON_MODULAR_SNIPPET = `
    installer.pods_project.targets.each do |target|
      target.build_configurations.each do |build_config|
        build_config.build_settings['CLANG_ALLOW_NON_MODULAR_INCLUDES_IN_FRAMEWORK_MODULES'] = 'YES'
      end

      if target.name.start_with?("RNFB")
        target.build_configurations.each do |build_config|
          build_config.build_settings['DEFINES_MODULE'] = 'NO'
        end
      end
    end`;

function withNonModularHeaders(config) {
  return withDangerousMod(config, [
    "ios",
    async (cfg) => {
      const podfilePath = path.join(cfg.modRequest.platformProjectRoot, "Podfile");
      let podfile = fs.readFileSync(podfilePath, "utf-8");

      if (podfile.includes("CLANG_ALLOW_NON_MODULAR_INCLUDES_IN_FRAMEWORK_MODULES")) {
        return cfg;
      }

      podfile = podfile.replace(
        /post_install do \|installer\|/,
        `post_install do |installer|${NON_MODULAR_SNIPPET}`
      );

      fs.writeFileSync(podfilePath, podfile);
      return cfg;
    },
  ]);
}

module.exports = withNonModularHeaders;
