import {isNil, toString} from 'lodash';

export class ConfigurationError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, ConfigurationError.prototype);
  }
}

export const getConfigValueOrError = <T1, T2 = string>(
  config: T1,
  prop: keyof T1,
  message?: string,
  isValid = (val: T2) => !isNil(val)
): T2 => {
  const value = config[prop] as unknown as T2;
  if (!isValid(value)) {
    throw new ConfigurationError(
      message || `${toString(prop)} is expected to be set`
    );
  }
  return value;
};

export const getConfigValueWithDefault = <T1, T2 = string>(
  config: T1,
  prop: keyof T1,
  defaultValue: T2
): T2 => {
  const value = config[prop] as unknown as T2;
  if (!isNil(value)) {
    return value;
  }
  return defaultValue;
};

export const getConfigValue = <T1, T2 = string>(
  config: T1,
  prop: keyof T1,
  defaultValue?: T2
): T2 | undefined => {
  const value = config[prop] as unknown as T2;
  if (!isNil(value)) {
    return value;
  }
  return defaultValue;
};
