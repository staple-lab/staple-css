import { useMemo } from "react";
import {
  getAllTokens,
  colorTokens,
  spaceTokens,
  typographyTokens,
  elevationTokens,
  borderTokens,
  motionTokens,
  layoutTokens,
  type TokenRegistry,
} from "@staple-css/tokens";

/**
 * Returns the full token registry and individual category arrays.
 * Memoized so the object references are stable across renders.
 */
export function useTokens() {
  return useMemo(() => {
    const registry: TokenRegistry = getAllTokens();
    return {
      registry,
      colorTokens,
      spaceTokens,
      typographyTokens,
      elevationTokens,
      borderTokens,
      motionTokens,
      layoutTokens,
    };
  }, []);
}
