export function generateEmployeeId() {
    // function for generating unique id
    return String(Date.now()).slice(-8);
}