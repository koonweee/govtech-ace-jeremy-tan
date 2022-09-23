import { ServerRouter } from "@/server/router";
import { inferProcedureOutput } from "@trpc/server";

export type Match = inferProcedureOutput<ServerRouter['_def']['queries']['findAllMatches']>[number];
