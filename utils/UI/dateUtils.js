const pad = n => String(n).padStart(2, '0');

export function daysFromToday(offset = 0) {
    // used in 'AssignLeave.spec.js' to set todays day and tommorow
    const d = new Date();
    d.setDate(d.getDate() + offset);

    // format: yyyy-dd-mm 
    return `${d.getFullYear()}-${pad(d.getDate())}-${pad(d.getMonth() + 1)}`;
}