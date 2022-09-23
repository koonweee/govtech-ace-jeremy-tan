import { ServerRouter } from "@/server/router";
import { inferProcedureInput, inferProcedureOutput } from "@trpc/server";

export type AddTeamsInput = inferProcedureInput<ServerRouter['_def']['mutations']['addTeams']>[number];
export type AddMatchesInput = inferProcedureInput<ServerRouter['_def']['mutations']['addMatches']>[number];
