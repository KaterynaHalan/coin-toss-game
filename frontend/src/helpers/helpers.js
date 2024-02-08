import {jwtDecode} from "jwt-decode";

export const decodeUserInformation = (user) => (user?.token ? {
    ...user,
    ...jwtDecode(user.token)
} : user)