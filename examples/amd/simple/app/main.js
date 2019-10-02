function main() {
  require(['packages/@dynamics/core/dist/amd/index.min.js'], function (module) {
    module.dynamic({
      log: {
        level: 5
      }
    });
  });
}
