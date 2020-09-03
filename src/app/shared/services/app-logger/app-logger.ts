/*eslint no-console: ["off"] */
import { environment } from "@/environment/environment";

/**
 * @description Logger class
 * This is responsible for logging of all kind of stuff in the application
 * Default, we are using the console api for logging and this provides the basic level of logging such as
 * you can use the available method of console in developement but in production these will be replaced with empty methods
 * This can be extended with the help of adding Log level functionality
 */
class AppLogger {
  public log: OmitThisParameter<any>;
  public debug: OmitThisParameter<any>;
  public info: OmitThisParameter<any>;
  public warn: OmitThisParameter<any>;
  public error: OmitThisParameter<any>;


  /**
   * @constructor AppLogger
   */
  constructor() {
    /** Initializing the configuration of logger */
    this.initLogger();
  }

  /**
   * @description Initializing the configuration such as if environment is production then all log method will be replaced with empty methods
   * except logToServer, which will be responsible for logging the important stuff on server
   */
  private initLogger() {
    this.log()

    /** Checking the environment */
    if (environment !== "production") {
      this.log = console.log.bind(console);

      this.debug = console.debug.bind(console);

      this.info = console.info.bind(console);

      this.warn = console.warn.bind(console);

      this.error = console.error.bind(console);
    } else {
      /** In case of production replace the functions definition */
      this.log = this.debug = this.info = this.warn = this.error = () => {};
    }
  }
}

/** Creating the instance of logger */
const logger = new AppLogger();

export { logger };
