export function formatDateTime(dateTime = '2020-02-22 15:10:00'){
    /* Input Date Format: = '2020-02-22 15:10:00' */
    /* Return Date Format: '22 Feb 2020, 3:10 PM' */

    let [fullDate, time] = dateTime.split(' ')
    let [year, month, date ] = fullDate.split('-')
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    month = monthNames[parseInt(month) - 1]

    let [hr, min, sec] = time.split(':')
    let AM_PM = 'AM'

    if(hr > 12) {
        AM_PM = 'PM'
        hr = hr - 12
    }

    return `${date} ${month} ${year}, ${hr}:${min} ${AM_PM}`
}