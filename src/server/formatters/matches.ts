import { Match, Team } from "@prisma/client";

export function formatMatches(matches: Match[], teams: Team[]) {
  // create id to team name map from teams array
  const teamMap = new Map<number, string>();
  teams.forEach((team) => {
    teamMap.set(team.id, team.name);
  });
  // create the formatted matches
  return matches.map((match) => {
    return {
      id: match.id,
      homeTeamName: teamMap.get(match.homeTeamId)!,
      awayTeamName: teamMap.get(match.awayTeamId)!,
      homeTeamGoals: match.homeTeamScore,
      awayTeamGoals: match.awayTeamScore,
    };
  });
}
