import { AddTeamsInput } from "@/shared/types"
import { Team } from "@prisma/client"
import moment from "moment"

export function validateTeamInput(teamNameMap: Map<string, Team>): (input: string) => string[] {
  return (input: string) => {
    const teamInputLines = input.trim().split(/\r?\n/)
    /**
     * check each line for following criteria:
     * 1. 3 distinct values <name>, <registration date>, <group number>
     * 2. <registration date> is a valid date of format dd/mm
     * 3. <group number> is a number between 1 and 2 inclusive
     */
    const errors: string[] = []
    teamInputLines.forEach((line, index) => {
      const trimmedLine = line.trim()
      const lineValues = trimmedLine.split(' ')
      if (lineValues.length !== 3) {
        errors.push(`Line ${index + 1}: not in the correct format`)
      } else {
        const [name, registrationDate, groupNumber] = lineValues
        if (teamNameMap.has(name)) {
          errors.push(`Line ${index + 1}: ${name} is already an existing team name`)
        }
        if (!isValidDate(registrationDate)) {
          errors.push(`Line ${index + 1}: ${registrationDate} is not in the format DD/MM`)
        }
        if (!isValidGroupNumber(groupNumber)) {
          errors.push(`Line ${index + 1}: Group number must be 1 or 2`)
        }
      }
    })
    return errors
  }
}

function isValidGroupNumber(groupNumber: string): boolean {
  return groupNumber === '1' || groupNumber === '2'
}

function isValidDate(date: string): boolean {
  const dateRegex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))/
  return dateRegex.test(date)
}

export function formatTeamMutationInput(input: string): AddTeamsInput[] {
  const teamInputLines = input.trim().split(/\r?\n/)
  const teamInputs: AddTeamsInput[] = []
  teamInputLines.forEach((line) => {
    const trimmedLine = line.trim()
    const lineValues = trimmedLine.split(' ')
    const [name, registrationDate, groupNumber] = lineValues
    const year = moment().format('YYYY')
    teamInputs.push({
      teamName: name,
      registrationDate: moment(`${registrationDate}/${year}`, "DD/MM/YYYY").toDate(),
      groupNumber: parseInt(groupNumber),
    })
  })
  return teamInputs
}
