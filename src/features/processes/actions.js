export const openProcess = (name, maxOpenedProcesses) => ({
  type: 'OPEN_PROCESS',
  name,
  maxOpenedProcesses
})

export const closeProcess = (name) => ({
  type: 'CLOSE_PROCESS',
  name
})

export const closeInstance = (name) => ({
  type: 'CLOSE_INSTANCE',
  name
})

export const fetchProcesses = (fetched) => ({
  type: 'FETCH_PROCESSES',
  fetched
})
