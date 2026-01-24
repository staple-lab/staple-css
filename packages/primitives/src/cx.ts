/**
 * Tiny class name utility
 *
 * Combines class names, filtering out falsy values.
 * This is intentionally minimal - no runtime overhead from a heavy library.
 *
 * @example
 * cx("st-Box", pad && `st-Box--pad-${pad}`, className)
 * // => "st-Box st-Box--pad-4 custom-class"
 */
export function cx(
  ...args: (string | false | null | undefined)[]
): string {
  let result = "";
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg) {
      if (result) result += " ";
      result += arg;
    }
  }
  return result;
}
