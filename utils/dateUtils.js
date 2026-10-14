const pad = n => String(n).padStart(2, '0');

export function daysFromToday(offset = 0) {
    const d = new Date();
    d.setDate(d.getDate() + offset);
    return `${d.getFullYear()}-${pad(d.getDate())}-${pad(d.getMonth() + 1)}`;
}