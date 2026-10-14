export function generateEmployeeId() {
    return String(Date.now()).slice(-8);
}