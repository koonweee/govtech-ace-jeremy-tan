import { AddMatchesInput, AddTeamsInput } from "@/shared/types"
import { Team } from "@prisma/client"

export function validateMatchInput(teamNameMap: Map<string, Team>): (input: string) => string[] {
  return (input: string) => {
    const matchInputLines = input.trim().split(/\r?\n/)
    /**
     * check each line for following criteria:
     * 1. 4 distinct values <team A name> <team B name> <team A score> <team B score>
     * 2. <team * name> is a valid team name
     * 3. <team * score> is a number
     */
    const errors: string[] = []
    matchInputLines.forEach((line, index) => {
      const trimmedLine = line.trim()
      const lineValues = trimmedLine.split(' ')
      if (lineValues.length !== 4) {
        errors.push(`Line ${index + 1}: not in the correct format`)
      } else {
        const [teamAName, teamBName, teamAScore, teamBScore] = lineValues
        const teamA = teamNameMap.get(teamAName)
        const teamB = teamNameMap.get(teamBName)
        if (!teamA) {
          errors.push(`Line ${index + 1}: ${teamAName} is not an existing team name`)
        }
        if (!teamB) {
          errors.push(`Line ${index + 1}: ${teamBName} is not an existing team name`)
        }
        if (!isValidScore(teamAScore)) {
          errors.push(`Line ${index + 1}: Score ${teamAScore} is not a (whole) number`)
        }
        if (!isValidScore(teamBScore)) {
          errors.push(`Line ${index + 1}: Score ${teamBScore} is not a (whole) number`)
        }
        if (teamA && teamB && teamA.groupNumber !== teamB.groupNumber) {
          errors.push(`Line ${index + 1}: ${teamAName} and ${teamBName} are not in the same group`)
        }
      }
    })
    return errors
  }
}

function isValidScore(score: string): boolean {
  // checks that score is a whole number
  const isNumeric = (num: any) => (typeof(num) === 'number' || typeof(num) === "string" && num.trim() !== '') && !isNaN(num as number);
  return isNumeric(score) && Number(score) % 1 === 0
}

export function formatMatchMutationInput(input: string): AddMatchesInput[] {
  const matchInputLines = input.trim().split(/\r?\n/)
  const matchInputs: AddMatchesInput[] = []
  matchInputLines.forEach((line) => {
    const trimmedLine = line.trim()
    const lineValues = trimmedLine.split(' ')
    const [homeTeamName, awayTeamName, homeTeamScore, awayTeamScore] = lineValues
    matchInputs.push({
      homeTeamName,
      awayTeamName,
      homeTeamScore: parseInt(homeTeamScore),
      awayTeamScore: parseInt(awayTeamScore),
    })
  })
  return matchInputs
}
