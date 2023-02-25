export const serverMessageConstants: { [key: string]: { msg: string; code: number } } = {
    DB_MODEL_CONNECTIVITY_ISSUE: {
        msg: "Issue while updating database",
        code: 0
    },
    LOGIN_SUCCESS: {
        msg: "Logged in successful!!",
        code: 1
    },
    SIGNUP_SUCCESS: {
        msg: "Signup successful, Login to continue",
        code: 2
    },
    UNREGISTERED_USER: {
        msg: "User not registered! Signup if you are a new user.",
        code: 3
    },
    INCORRECT_PASS: {
        msg: "Username or password is incorrect!",
        code: 4
    },
    USER_REGISTERED: {
        msg: "User already registered!",
        code: 5
    },
    BOOKING_SUCCESS: {
        msg: "Booking Successful!",
        code: 6
    },
    DUPLICATE_BOOKING: {
        msg: "duplicate insertion - something is not right!",
        code: 7
    },
    CANCEL_BOOKING: {
        msg: "booking cancelled!",
        code: 8
    },
    NO_BOOKING_RECORD:{
        msg: "No bookings found.",
        code: 9
    },
    BOOKINGS_FOUND:{
        msg: "%0 bookings found!",
        code: 10
    }
}