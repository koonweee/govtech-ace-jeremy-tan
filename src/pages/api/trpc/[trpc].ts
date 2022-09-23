import * as trpcNext from "@trpc/server/adapters/next";

import { serverRouter } from "@/server/router";
import { createContext } from "@/server/context";
import { withCors } from "./cors";

export default withCors(trpcNext.createNextApiHandler({
  router: serverRouter,
  createContext,
}));
