

export function newPasswordValid(pwd: string) {
    if (pwd.length < 8) {
        return "Error: Password must be at least 8 characters long!";
    }
}