// Logging utility for the beauty academy website

export interface LogEntry {
  timestamp: Date;
  level: 'info' | 'warn' | 'error' | 'debug';
  message: string;
  context?: Record<string, any>;
}

class Logger {
  private logs: LogEntry[] = [];
  private maxLogs = 1000; // Keep only the last 1000 logs

  /**
   * Log an info message
   * @param message The message to log
   * @param context Optional context information
   */
  info(message: string, context?: Record<string, any>): void {
    this.addLog('info', message, context);
  }

  /**
   * Log a warning message
   * @param message The message to log
   * @param context Optional context information
   */
  warn(message: string, context?: Record<string, any>): void {
    this.addLog('warn', message, context);
  }

  /**
   * Log an error message
   * @param message The message to log
   * @param context Optional context information
   */
  error(message: string, context?: Record<string, any>): void {
    this.addLog('error', message, context);
  }

  /**
   * Log a debug message
   * @param message The message to log
   * @param context Optional context information
   */
  debug(message: string, context?: Record<string, any>): void {
    this.addLog('debug', message, context);
  }

  /**
   * Get all logs
   * @returns Array of all log entries
   */
  getLogs(): LogEntry[] {
    return [...this.logs]; // Return a copy to prevent external modification
  }

  /**
   * Get logs filtered by level
   * @param level The log level to filter by
   * @returns Array of log entries with the specified level
   */
  getLogsWithLevel(level: LogEntry['level']): LogEntry[] {
    return this.logs.filter(log => log.level === level);
  }

  /**
   * Clear all logs
   */
  clearLogs(): void {
    this.logs = [];
  }

  /**
   * Internal method to add a log entry
   * @param level The log level
   * @param message The message to log
   * @param context Optional context information
   */
  private addLog(level: LogEntry['level'], message: string, context?: Record<string, any>): void {
    const logEntry: LogEntry = {
      timestamp: new Date(),
      level,
      message,
      context
    };

    this.logs.push(logEntry);

    // Keep only the last maxLogs entries
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs);
    }

    // Also output to console
    this.outputToConsole(logEntry);
  }

  /**
   * Output log to console
   * @param log The log entry to output
   */
  private outputToConsole(log: LogEntry): void {
    const formattedTime = log.timestamp.toISOString();
    const output = `[${formattedTime}] ${log.level.toUpperCase()}: ${log.message}`;
    
    switch (log.level) {
      case 'error':
        console.error(output);
        if (log.context) console.error('Context:', log.context);
        break;
      case 'warn':
        console.warn(output);
        if (log.context) console.warn('Context:', log.context);
        break;
      case 'info':
        console.info(output);
        if (log.context) console.info('Context:', log.context);
        break;
      case 'debug':
        console.debug(output);
        if (log.context) console.debug('Context:', log.context);
        break;
    }
  }
}

// Create a singleton logger instance
export const logger = new Logger();

// Export the logger instance
export default logger;