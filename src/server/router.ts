import * as trpc from "@trpc/server";
import { z } from "zod";

import { Context } from "./context";
import { formatTeamsByRanking } from "./formatters";

export const serverRouter = trpc
  .router<Context>()
  .query("getTeamRankingByGroup", {
    input: z.object({
      groupNumber: z.number(),
    }),
    resolve: async ({ ctx, input }) => {
      // returns a list of teams in the input group, sorted by ranking
      const matches = await ctx.prisma.match.findMany({
        where: {
          OR: [
            {
              homeTeam: {
                groupNumber: input.groupNumber,
              },
            },
            {
              awayTeam: {
                groupNumber: input.groupNumber,
              },
            },
          ],
        },
      });
      const teams = await ctx.prisma.team.findMany({
        where: {
          groupNumber: input.groupNumber,
        },
      });
      return formatTeamsByRanking(teams, matches);
    },
  })
  .query("findAllMatches", {
    resolve: async ({ ctx }) => {
      return await ctx.prisma.match.findMany();
    },
  })
  .mutation("removeMatch", {
    input: z.object({
      id: z.number(),
    }),
    resolve: async ({ ctx, input }) => {
      return await ctx.prisma.match.delete({
        where: {
          id: input.id,
        },
      });
    },
  })
  .mutation("addMatches", {
    input: z.array(
      z.object({
        homeTeamName: z.string(),
        awayTeamName: z.string(),
        homeTeamScore: z.number(),
        awayTeamScore: z.number(),
      })
    ),
    resolve: async ({ input, ctx }) => {
      // get all teams as a map of team name to team id
      const teams = await ctx.prisma.team.findMany();
      const teamMap = new Map<string, number>();
      teams.forEach((team) => {
        teamMap.set(team.name, team.id);
      });
      // create the neccessary matches
      const matches = input.map((match) => {
        return {
          homeTeamId: teamMap.get(match.homeTeamName)!,
          awayTeamId: teamMap.get(match.awayTeamName)!,
          homeTeamScore: match.homeTeamScore,
          awayTeamScore: match.awayTeamScore,
        };
      });
      // insert the matches
      await ctx.prisma.match.createMany({
        data: matches,
      });
    },
  })
  .mutation("addTeams", {
    input: z.array(
      z.object({
        teamName: z.string(),
        registrationDate: z.date(),
        groupNumber: z.number(),
      })
    ),
    resolve: async ({ input, ctx }) => {
      // create the neccessary teams
      const teams = input.map((team) => {
        return {
          name: team.teamName,
          registrationDate: team.registrationDate,
          groupNumber: team.groupNumber,
        };
      });
      // insert the teams
      await ctx.prisma.team.createMany({
        data: teams,
      });
    },
  });

export type ServerRouter = typeof serverRouter;
