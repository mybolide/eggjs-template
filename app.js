const ObjectIdRegex = /^[a-fA-F0-9]{24}$/;
/**
 *  全局定义
 * @param app
 */
class AppHooks {
  constructor(app) {
    this.app = app;
    app.root_path = __dirname;
  }

  configWillLoad() {
    // Ready to call configDidLoad,
    // Config, plugin files are referred,
    // this is the last chance to modify the config.
  }

  configDidLoad() {
    // Config, plugin files have been loaded.
  }

  async didLoad() {
    // All files have loaded, start plugin here.
  }

  async willReady() {
    // All plugins have started, can do some thing before app ready
    this.app.validator.addRule('ObjectId', (rule, value) => {
      if (!ObjectIdRegex.test(value)) {
        return 'should be an ObjectId';
      }
    });
  }

  async didReady() {
    
  }

  async serverDidReady() {

  }

  async beforeClose() {
    // Do some thing before app close.
  }
}

module.exports = AppHooks;

