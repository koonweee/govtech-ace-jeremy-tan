import * as trpc from "@trpc/server";
import { z } from "zod";

import { Context } from "./context";
import { formatMatches } from "./formatters/matches";
import { formatTeamsByRanking } from "./formatters/teams";
import { prisma } from './prisma';
import superjson from 'superjson';
import { Team } from "@prisma/client";

export const serverRouter = trpc
  .router<Context>()
  .transformer(superjson)
  .query("getTeamRankingByGroup", {
    input: z.object({
      groupNumber: z.number(),
    }),
    resolve: async ({ ctx, input }) => {
      // returns a list of teams in the input group, sorted by ranking
      const matches = await prisma.match.findMany({
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
      const teams = await prisma.team.findMany({
        where: {
          groupNumber: input.groupNumber,
        },
      });
      return formatTeamsByRanking(teams, matches);
    },
  })
  .query("findAllMatches", {
    resolve: async ({ ctx }) => {
      const matches = await prisma.match.findMany();
      const teams = await prisma.team.findMany();
      return formatMatches(matches, teams);
    },
  })
  .query("getAllTeamsByNames", {
    resolve: async ({ ctx }) => {
      const teams = await prisma.team.findMany();
      // create map of team name to team object
      const teamNameMap = new Map<string, Team>();
      teams.forEach((team) => {
        teamNameMap.set(team.name, team);
      });
      return teamNameMap;
    },
  })
  .mutation("removeMatches", {
    input: z.array(z.number()),
    resolve: async ({ ctx, input }) => {
      return await prisma.match.deleteMany({
        where: {
          id: {
            in: input,
          },
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
      const teams = await prisma.team.findMany();
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
      await prisma.match.createMany({
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
      await prisma.team.createMany({
        data: teams,
      });
    },
  })
  .mutation("deleteAllData", {
    resolve: async ({ input, ctx }) => {
      // delete all data in teams and matches
      await prisma.match.deleteMany({});
      await prisma.team.deleteMany({});
    },
  });

export type ServerRouter = typeof serverRouter;
