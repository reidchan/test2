const _ = require('lodash');

describe('feature1.js', () => {
  let consoleLogSpy;
  let lodashRandomSpy;
  
  beforeEach(() => {
    // Mock console.log to capture output
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    
    // Mock lodash.random to control the output
    lodashRandomSpy = jest.spyOn(_, 'random');
    
    // Clear the module cache to ensure fresh execution
    delete require.cache[require.resolve('./feature1')];
  });
  
  afterEach(() => {
    // Restore original functions
    consoleLogSpy.mockRestore();
    lodashRandomSpy.mockRestore();
  });

  describe('basic functionality', () => {
    test('should call lodash.random with correct parameters (1, 100)', () => {
      lodashRandomSpy.mockReturnValue(50);
      
      require('./feature1');
      
      expect(lodashRandomSpy).toHaveBeenCalledWith(1, 100);
      expect(lodashRandomSpy).toHaveBeenCalledTimes(1);
    });

    test('should output the random number to console', () => {
      const expectedValue = 42;
      lodashRandomSpy.mockReturnValue(expectedValue);
      
      require('./feature1');
      
      expect(consoleLogSpy).toHaveBeenCalledWith(expectedValue);
      expect(consoleLogSpy).toHaveBeenCalledTimes(1);
    });

    test('should execute the complete flow: random generation -> console output', () => {
      const testValue = 75;
      lodashRandomSpy.mockReturnValue(testValue);
      
      require('./feature1');
      
      expect(lodashRandomSpy).toHaveBeenCalledWith(1, 100);
      expect(consoleLogSpy).toHaveBeenCalledWith(testValue);
    });
  });

  describe('boundary value testing', () => {
    test('should handle minimum boundary value (1)', () => {
      lodashRandomSpy.mockReturnValue(1);
      
      require('./feature1');
      
      expect(consoleLogSpy).toHaveBeenCalledWith(1);
      expect(lodashRandomSpy).toHaveBeenCalledWith(1, 100);
    });

    test('should handle maximum boundary value (100)', () => {
      lodashRandomSpy.mockReturnValue(100);
      
      require('./feature1');
      
      expect(consoleLogSpy).toHaveBeenCalledWith(100);
      expect(lodashRandomSpy).toHaveBeenCalledWith(1, 100);
    });

    test('should handle mid-range values', () => {
      const midRangeValues = [25, 50, 75];
      
      midRangeValues.forEach(value => {
        // Reset mocks for each iteration
        consoleLogSpy.mockClear();
        lodashRandomSpy.mockClear();
        lodashRandomSpy.mockReturnValue(value);
        delete require.cache[require.resolve('./feature1')];
        
        require('./feature1');
        
        expect(consoleLogSpy).toHaveBeenCalledWith(value);
        expect(lodashRandomSpy).toHaveBeenCalledWith(1, 100);
      });
    });
  });

  describe('edge cases and error handling', () => {
    test('should handle when lodash.random returns decimal values', () => {
      const decimalValue = 45.67;
      lodashRandomSpy.mockReturnValue(decimalValue);
      
      require('./feature1');
      
      expect(consoleLogSpy).toHaveBeenCalledWith(decimalValue);
    });

    test('should handle when lodash.random returns zero', () => {
      lodashRandomSpy.mockReturnValue(0);
      
      require('./feature1');
      
      expect(consoleLogSpy).toHaveBeenCalledWith(0);
    });

    test('should handle when lodash.random returns negative values', () => {
      lodashRandomSpy.mockReturnValue(-1);
      
      require('./feature1');
      
      expect(consoleLogSpy).toHaveBeenCalledWith(-1);
    });

    test('should handle when lodash.random returns undefined', () => {
      lodashRandomSpy.mockReturnValue(undefined);
      
      require('./feature1');
      
      expect(consoleLogSpy).toHaveBeenCalledWith(undefined);
    });

    test('should handle when lodash.random returns null', () => {
      lodashRandomSpy.mockReturnValue(null);
      
      require('./feature1');
      
      expect(consoleLogSpy).toHaveBeenCalledWith(null);
    });

    test('should handle when lodash.random returns NaN', () => {
      lodashRandomSpy.mockReturnValue(NaN);
      
      require('./feature1');
      
      expect(consoleLogSpy).toHaveBeenCalledWith(NaN);
    });

    test('should handle when lodash.random returns Infinity', () => {
      lodashRandomSpy.mockReturnValue(Infinity);
      
      require('./feature1');
      
      expect(consoleLogSpy).toHaveBeenCalledWith(Infinity);
    });

    test('should propagate errors from lodash.random', () => {
      const errorMessage = 'Random generation failed';
      lodashRandomSpy.mockImplementation(() => {
        throw new Error(errorMessage);
      });
      
      expect(() => {
        require('./feature1');
      }).toThrow(errorMessage);
    });

    test('should handle TypeError from lodash.random', () => {
      lodashRandomSpy.mockImplementation(() => {
        throw new TypeError('Invalid arguments');
      });
      
      expect(() => {
        require('./feature1');
      }).toThrow(TypeError);
    });

    test('should handle RangeError from lodash.random', () => {
      lodashRandomSpy.mockImplementation(() => {
        throw new RangeError('Number out of range');
      });
      
      expect(() => {
        require('./feature1');
      }).toThrow(RangeError);
    });
  });

  describe('dependency validation', () => {
    test('should verify lodash is properly imported', () => {
      expect(_).toBeDefined();
      expect(typeof _.random).toBe('function');
    });

    test('should use lodash.random function specifically', () => {
      lodashRandomSpy.mockReturnValue(88);
      
      require('./feature1');
      
      expect(lodashRandomSpy).toHaveBeenCalled();
    });

    test('should verify lodash object structure', () => {
      expect(_).toHaveProperty('random');
      expect(typeof _.random).toBe('function');
      expect(_.random).toBeDefined();
    });
  });

  describe('module execution behavior', () => {
    test('should execute immediately when required', () => {
      lodashRandomSpy.mockReturnValue(33);
      
      const startTime = Date.now();
      require('./feature1');
      const endTime = Date.now();
      
      expect(consoleLogSpy).toHaveBeenCalledTimes(1);
      expect(lodashRandomSpy).toHaveBeenCalledTimes(1);
      // Should execute quickly
      expect(endTime - startTime).toBeLessThan(100);
    });

    test('should not execute multiple times when cached', () => {
      lodashRandomSpy.mockReturnValue(55);
      
      // First require
      require('./feature1');
      const firstCallCount = consoleLogSpy.mock.calls.length;
      
      // Second require (should use cache)
      require('./feature1');
      const secondCallCount = consoleLogSpy.mock.calls.length;
      
      expect(firstCallCount).toBe(1);
      expect(secondCallCount).toBe(1); // No additional calls due to caching
    });

    test('should execute fresh when cache is cleared', () => {
      lodashRandomSpy.mockReturnValue(66);
      
      // First execution
      require('./feature1');
      expect(consoleLogSpy).toHaveBeenCalledTimes(1);
      
      // Clear cache and execute again
      delete require.cache[require.resolve('./feature1')];
      require('./feature1');
      expect(consoleLogSpy).toHaveBeenCalledTimes(2);
    });

    test('should handle multiple cache clears and re-executions', () => {
      const testValues = [10, 20, 30, 40, 50];
      
      testValues.forEach((value, index) => {
        lodashRandomSpy.mockReturnValue(value);
        delete require.cache[require.resolve('./feature1')];
        require('./feature1');
        
        expect(consoleLogSpy).toHaveBeenNthCalledWith(index + 1, value);
      });
      
      expect(consoleLogSpy).toHaveBeenCalledTimes(testValues.length);
    });
  });

  describe('output verification', () => {
    test('should pass exact value from random to console.log', () => {
      const testValues = [1, 15, 42, 73, 100];
      
      testValues.forEach(value => {
        consoleLogSpy.mockClear();
        lodashRandomSpy.mockClear();
        lodashRandomSpy.mockReturnValue(value);
        delete require.cache[require.resolve('./feature1')];
        
        require('./feature1');
        
        expect(consoleLogSpy.mock.calls[0][0]).toBe(value);
        expect(consoleLogSpy.mock.calls[0][0]).toEqual(value);
      });
    });

    test('should maintain data type consistency', () => {
      const numberValue = 42;
      lodashRandomSpy.mockReturnValue(numberValue);
      
      require('./feature1');
      
      const loggedValue = consoleLogSpy.mock.calls[0][0];
      expect(typeof loggedValue).toBe('number');
      expect(loggedValue).toBe(numberValue);
    });

    test('should handle floating point precision', () => {
      const preciseValue = 42.123456789;
      lodashRandomSpy.mockReturnValue(preciseValue);
      
      require('./feature1');
      
      const loggedValue = consoleLogSpy.mock.calls[0][0];
      expect(loggedValue).toBe(preciseValue);
      expect(loggedValue.toString()).toBe(preciseValue.toString());
    });

    test('should handle very large numbers', () => {
      const largeNumber = Number.MAX_SAFE_INTEGER;
      lodashRandomSpy.mockReturnValue(largeNumber);
      
      require('./feature1');
      
      expect(consoleLogSpy).toHaveBeenCalledWith(largeNumber);
    });

    test('should handle very small numbers', () => {
      const smallNumber = Number.MIN_VALUE;
      lodashRandomSpy.mockReturnValue(smallNumber);
      
      require('./feature1');
      
      expect(consoleLogSpy).toHaveBeenCalledWith(smallNumber);
    });
  });

  describe('console.log behavior verification', () => {
    test('should call console.log with single argument', () => {
      lodashRandomSpy.mockReturnValue(77);
      
      require('./feature1');
      
      expect(consoleLogSpy.mock.calls[0]).toHaveLength(1);
    });

    test('should not call console.log with additional arguments', () => {
      lodashRandomSpy.mockReturnValue(88);
      
      require('./feature1');
      
      expect(consoleLogSpy).toHaveBeenCalledTimes(1);
      expect(consoleLogSpy.mock.calls[0]).toEqual([88]);
    });

    test('should verify console.log is called synchronously', () => {
      let executionOrder = [];
      
      lodashRandomSpy.mockImplementation((min, max) => {
        executionOrder.push('random');
        return 50;
      });
      
      consoleLogSpy.mockImplementation((value) => {
        executionOrder.push('log');
      });
      
      require('./feature1');
      
      expect(executionOrder).toEqual(['random', 'log']);
    });
  });
});

// Integration tests without mocking to test real behavior
describe('feature1.js integration tests', () => {
  let consoleOutput = [];
  
  beforeEach(() => {
    consoleOutput = [];
    // Capture console.log output without mocking lodash
    jest.spyOn(console, 'log').mockImplementation((output) => {
      consoleOutput.push(output);
    });
    delete require.cache[require.resolve('./feature1')];
  });
  
  afterEach(() => {
    console.log.mockRestore();
  });

  describe('real lodash.random behavior', () => {
    test('should generate valid numbers in range 1-100', () => {
      require('./feature1');
      
      const result = consoleOutput[0];
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(1);
      expect(result).toBeLessThanOrEqual(100);
      expect(Number.isInteger(result)).toBe(true);
    });

    test('should generate different values across multiple runs', () => {
      const results = [];
      
      // Run multiple times to check randomness
      for (let i = 0; i < 20; i++) {
        consoleOutput = [];
        delete require.cache[require.resolve('./feature1')];
        require('./feature1');
        results.push(consoleOutput[0]);
      }
      
      // All results should be valid
      results.forEach(result => {
        expect(typeof result).toBe('number');
        expect(result).toBeGreaterThanOrEqual(1);
        expect(result).toBeLessThanOrEqual(100);
        expect(Number.isInteger(result)).toBe(true);
      });
      
      // Should have some variation (very unlikely to get all identical values)
      const uniqueResults = [...new Set(results)];
      expect(uniqueResults.length).toBeGreaterThan(1);
    });

    test('should consistently use lodash.random with correct parameters', () => {
      const originalRandom = _.random;
      const spy = jest.fn().mockImplementation(originalRandom);
      _.random = spy;
      
      require('./feature1');
      
      expect(spy).toHaveBeenCalledWith(1, 100);
      expect(spy).toHaveBeenCalledTimes(1);
      
      // Restore original
      _.random = originalRandom;
    });

    test('should produce statistically reasonable distribution', () => {
      const results = [];
      const sampleSize = 100;
      
      for (let i = 0; i < sampleSize; i++) {
        consoleOutput = [];
        delete require.cache[require.resolve('./feature1')];
        require('./feature1');
        results.push(consoleOutput[0]);
      }
      
      // Check that we have a reasonable spread
      const min = Math.min(...results);
      const max = Math.max(...results);
      const uniqueCount = new Set(results).size;
      
      expect(min).toBeGreaterThanOrEqual(1);
      expect(max).toBeLessThanOrEqual(100);
      expect(uniqueCount).toBeGreaterThan(sampleSize * 0.5); // At least 50% unique values
    });
  });

  describe('performance characteristics', () => {
    test('should execute efficiently', () => {
      const startTime = process.hrtime.bigint();
      require('./feature1');
      const endTime = process.hrtime.bigint();
      
      const executionTimeMs = Number(endTime - startTime) / 1000000;
      expect(executionTimeMs).toBeLessThan(10); // Should execute in less than 10ms
      expect(consoleOutput).toHaveLength(1);
    });

    test('should handle multiple rapid executions', () => {
      const executionTimes = [];
      const iterations = 10;
      
      for (let i = 0; i < iterations; i++) {
        const startTime = process.hrtime.bigint();
        delete require.cache[require.resolve('./feature1')];
        require('./feature1');
        const endTime = process.hrtime.bigint();
        
        executionTimes.push(Number(endTime - startTime) / 1000000);
      }
      
      // All executions should be reasonably fast
      executionTimes.forEach(time => {
        expect(time).toBeLessThan(10);
      });
      
      // Average execution time should be very low
      const avgTime = executionTimes.reduce((a, b) => a + b, 0) / executionTimes.length;
      expect(avgTime).toBeLessThan(5);
    });

    test('should not have memory leaks with repeated executions', () => {
      const initialMemory = process.memoryUsage().heapUsed;
      
      for (let i = 0; i < 100; i++) {
        delete require.cache[require.resolve('./feature1')];
        require('./feature1');
      }
      
      // Force garbage collection if available
      if (global.gc) {
        global.gc();
      }
      
      const finalMemory = process.memoryUsage().heapUsed;
      const memoryIncrease = finalMemory - initialMemory;
      
      // Memory increase should be reasonable (less than 1MB)
      expect(memoryIncrease).toBeLessThan(1024 * 1024);
    });
  });

  describe('error resilience', () => {
    test('should work correctly after lodash.random temporarily fails', () => {
      const originalRandom = _.random;
      
      // Temporarily break lodash.random
      _.random = () => { throw new Error('Temporary failure'); };
      
      expect(() => {
        delete require.cache[require.resolve('./feature1')];
        require('./feature1');
      }).toThrow('Temporary failure');
      
      // Restore and verify it works again
      _.random = originalRandom;
      delete require.cache[require.resolve('./feature1')];
      
      expect(() => {
        require('./feature1');
      }).not.toThrow();
      
      expect(consoleOutput).toHaveLength(1);
      expect(typeof consoleOutput[0]).toBe('number');
    });

    test('should handle console.log being temporarily unavailable', () => {
      const originalConsoleLog = console.log;
      
      // Temporarily break console.log
      console.log = () => { throw new Error('Console unavailable'); };
      
      expect(() => {
        delete require.cache[require.resolve('./feature1')];
        require('./feature1');
      }).toThrow('Console unavailable');
      
      // Restore console.log
      console.log = originalConsoleLog;
    });
  });
});