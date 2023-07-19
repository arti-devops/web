export function readUserData(){
  return JSON.parse(localStorage.getItem("userData"))
}

export const currentDate = () => {
  const date = new Date()
  
  return date.toLocaleDateString('fr-FR')
}

export function currentDateYmd(){
  // Create a new Date object for the current date
  const currentDate = new Date()

  // Get the year, month, and day components of the current date
  const year = currentDate.getFullYear()
  const month = String(currentDate.getMonth() + 1).padStart(2, '0') // Add 1 to month as it is zero-indexed
  const day = String(currentDate.getDate()).padStart(2, '0')

  // Format the date as "Y-m-d"
  return `${year}-${month}-${day}`
}

export function fullTimeToHourMinuteFormatter(timeString){
  const [hours, minutes] = timeString.split(':')
  
  return `${hours}:${minutes}`
}

export function resolveLocalDateVariantLong (d) {
  const date = new Date(d)
  const options = { year: 'numeric', month: 'long', day: '2-digit' }
  
  return date.toLocaleDateString('fr-FR', options)
}

export function resolveLocalDateVariantShort (d) {
  const date = new Date(d)
  const options = { year: 'numeric', month: 'short', day: '2-digit' }
  
  return date.toLocaleDateString('fr-FR', options)
}

export function subStringNameForAvatar (name) {
  let split = name.split(" ", 2)
  
  return split[0] + " " + split[1]
}

export function resolveProjectStatusVariantWithoutColor(stat) {
  if (stat === 'Schedulled' || stat === 'SCHEDULED')
    return 'Non Demarré'
  if (stat === 'In Progress'|| stat === 'IN_PROGRESS')
    return 'En Cours'
  if (stat === 'Stopped' || stat === 'STOPPED')
    return 'Suspendu'
  if (stat === 'Finished' || stat === 'FINISHED')
    return 'Terminé'
  else {
    return stat
  }
}

export function getWorkDaysInMonth(dateString) {
  const date = new Date(dateString)
  const month = date.getMonth()
  const year = date.getFullYear()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  let workDays = 0
  
  for (let i = 1; i <= daysInMonth; i++) {
    const day = new Date(year, month, i).getDay()
    if (day !== 0 && day !== 6) {
      workDays++
    }
  }
  
  return workDays
}

export function getFirstAndLastWorkDaysInMonth(dateString) {
  const date = new Date(dateString)
  const month = date.getMonth()
  const year = date.getFullYear()
  const firstDayOfMonth = new Date(year, month, 1)
  const lastDayOfMonth = new Date(year, month + 1, 0)

  let firstWorkDay = new Date(firstDayOfMonth)
  let lastWorkDay = new Date(lastDayOfMonth)

  while (firstWorkDay.getDay() === 0 || firstWorkDay.getDay() === 6) {
    firstWorkDay.setDate(firstWorkDay.getDate() + 1)
  }

  while (lastWorkDay.getDay() === 0 || lastWorkDay.getDay() === 6) {
    lastWorkDay.setDate(lastWorkDay.getDate() - 1)
  }

  return {
    firstWorkDay: firstWorkDay.toLocaleDateString(),
    lastWorkDay: lastWorkDay.toLocaleDateString(),
  }
}

export function zerofill(number) {
  return number.toString().padStart(2, '0')
}

export function getFirstDateOfMonth(datestring){
  var givenDate = new Date(datestring)
  var firstDateOfMonth = new Date(givenDate.getFullYear(), givenDate.getMonth(), 1)
  
  return firstDateOfMonth.toISOString().split('T')[0]
}

export function getLastDateOfMonth(datestring){
  // Create a new Date object for the current date
  const currentDate = new Date(datestring)

  // Get the current year and month
  const currentYear = currentDate.getFullYear()
  const currentMonth = currentDate.getMonth()

  // Create a new Date object for the first day of the next month
  const firstDayOfNextMonth = new Date(currentYear, currentMonth + 1, 1)

  // Subtract one day to get the last day of the current month
  const lastDayOfCurrentMonth = new Date(firstDayOfNextMonth.getTime() - (24 * 60 * 60 * 1000))

  // Format the date as 'YYYY-mm-dd'
  return lastDayOfCurrentMonth.toISOString().slice(0, 10)
}

export function resolveLocalDateVariantMY (d) {
  const date = new Date(d)
  const options = { year: 'numeric', month: 'long' }
  
  return date.toLocaleDateString('fr-FR', options)
}

export function sortObjectsByCheckIn(array) {
  return array.sort((a, b) => {
    // Convert checkIn time strings to total seconds
    const timeA = a.checkIn.split(':').reduce((acc, val) => (acc * 60) + +val, 0)
    const timeB = b.checkIn.split(':').reduce((acc, val) => (acc * 60) + +val, 0)

    if (timeA > timeB) {
      return -1
    }
    if (timeA < timeB) {
      return 1
    }
    
    return 0
  })
}

export function resolveXOFCurrencyFormat(xof){
  try {
    return xof.toLocaleString('fr-FR', { style: 'currency', currency: 'XOF' })
  } catch (error) {
    console.log(error.String)
  }
}

export const resolveProjectStatusVariant = stat => {
  const statLowerCase = stat.toLowerCase()
  if (statLowerCase === 'finished')
    return { "color": "secondary", "status_name": "Terminé" }
  if (statLowerCase === 'failed')
    return { "color": "error", "status_name": "Echec" }
  if (statLowerCase === 'on hold')
    return { "color": "warning", "status_name": "Halt" }
  if (statLowerCase === 'in progress')
    return { "color": "success", "status_name": "En cours" }
  if (statLowerCase === 'pending' | statLowerCase === 'scheduled')
    return { "color": "primary", "status_name": "En attente" }
  
  return { "color": "secondary", "status_name": "Statut inconnu" }
}
