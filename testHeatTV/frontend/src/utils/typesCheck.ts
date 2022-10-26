export function isString(payload: unknown): payload is string {
  return typeof payload === 'string' || payload instanceof String;
}
