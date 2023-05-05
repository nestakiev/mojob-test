

const changeDateFormat = (date: string | undefined): string | void => {
    if (typeof date === 'undefined') {
      return
    }
    return new Date(date)
      .toLocaleTimeString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'UTC'
      })
      .split(',')[0]
  }

  export default changeDateFormat
  