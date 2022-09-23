import { ServerRouter } from "@/server/router";
import { inferProcedureOutput } from "@trpc/server";

export type ResultSummary = inferProcedureOutput<ServerRouter['_def']['queries']['getTeamRankingByGroup']>[number];
