import { Match, Team } from "@prisma/client";

enum RESULT {
  WIN = "WIN",
  DRAW = "DRAW",
  LOSS = "LOSS",
}

const POINTS = {
  WIN: 3,
  DRAW: 1,
  LOSS: 0,
};

const ALT_POINTS = {
  WIN: 5,
  DRAW: 3,
  LOSS: 1,
};

type ResultSummary = {
  id: number;
  name: string;
  groupNumber: number;
  points: number;
  goals: number;
  altPoints: number;
  registrationDate: Date;
};

export function formatTeamsByRanking(teams: Team[], matches: Match[]) {
  // transform match array into map of team id, loss/win/draw , goals scored
  const teamMatchMap = new Map<number, {id: number, result: RESULT, goals: number}[]>();
  matches.forEach((match) => {
    if (teamMatchMap.has(match.homeTeamId)) {
      teamMatchMap.get(match.homeTeamId)!.push({
        id: match.homeTeamId,
        result: match.homeTeamScore > match.awayTeamScore ? RESULT.WIN : match.homeTeamScore === match.awayTeamScore ? RESULT.DRAW : RESULT.LOSS,
        goals: match.homeTeamScore,
      });
    } else {
      teamMatchMap.set(match.homeTeamId, [{
        id: match.homeTeamId,
        result: match.homeTeamScore > match.awayTeamScore ? RESULT.WIN : match.homeTeamScore === match.awayTeamScore ? RESULT.DRAW : RESULT.LOSS,
        goals: match.homeTeamScore,
      }]);
    }
    if (teamMatchMap.has(match.awayTeamId)) {
      teamMatchMap.get(match.awayTeamId)!.push({
        id: match.awayTeamId,
        result: match.awayTeamScore > match.homeTeamScore ? RESULT.WIN : match.awayTeamScore === match.homeTeamScore ? RESULT.DRAW : RESULT.LOSS,
        goals: match.awayTeamScore,
      });
    } else {
      teamMatchMap.set(match.awayTeamId, [{
        id: match.awayTeamId,
        result: match.awayTeamScore > match.homeTeamScore ? RESULT.WIN : match.awayTeamScore === match.homeTeamScore ? RESULT.DRAW : RESULT.LOSS,
        goals: match.awayTeamScore,
      }]);
    }
  });
  // for each team, output total match points, total goals scored, alternate match points, and registration date
  const teamResults: ResultSummary[] = teams.map((team) => {
    const results = teamMatchMap.get(team.id);
    if (results) {
      const points = results.reduce((acc, result) => {
        return acc + POINTS[result.result];
      }, 0);
      const altPoints = results.reduce((acc, result) => {
        return acc + ALT_POINTS[result.result];
      }, 0);
      const goals = results.reduce((acc, result) => {
        return acc + result.goals;
      }, 0);
      return {
        id: team.id,
        name: team.name,
        groupNumber: team.groupNumber,
        points,
        goals,
        altPoints,
        registrationDate: team.registrationDate,
      };
    } else {
      return {
        id: team.id,
        name: team.name,
        groupNumber: team.groupNumber,
        points: 0,
        goals: 0,
        altPoints: 0,
        registrationDate: team.registrationDate,
      };
    }
  });
  // sort by points, then goals, then alt points, then registration date
  return teamResults.sort(sortResults);
}

function sortResults(a: ResultSummary, b: ResultSummary): number {
  // sort by points, then goals, then alt points, then registration date
  if (a.points > b.points) {
    return -1;
  } else if (a.points < b.points) {
    return 1;
  } else {
    if (a.goals > b.goals) {
      return -1;
    } else if (a.goals < b.goals) {
      return 1;
    } else {
      if (a.altPoints > b.altPoints) {
        return -1;
      } else if (a.altPoints < b.altPoints) {
        return 1;
      } else {
        if (a.registrationDate < b.registrationDate) {
          return -1;
        } else if (a.registrationDate > b.registrationDate) {
          return 1;
        } else {
          return 0;
        }
      }
    }
  }
}
