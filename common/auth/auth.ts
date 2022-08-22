import { NextApiRequest } from "next";
import jwt, { JwtPayload } from "jsonwebtoken";

/**
 * Fetches the token from the current request
 * @param req  NextAPIRequest to fetch from
 * @returns the token or null if none present
 */
const getToken = (req: NextApiRequest): string | null => req.headers["x-access-token"] as string;

/**
 * Checks the users token for validity. 
 * @param req NextAPIRequest to fetch from
 * @returns true if authenticated and false otherwise
 */
export const isAuthenticated = (req: NextApiRequest): boolean => {
    const token = getToken(req);
    // verify token attached to request
    if (!token) {
        return false;
    } else {
        // verify token is valid
        try {
            jwt.verify(token, "secretToken") as JwtPayload;
            return true;
        } catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                return false;
            } else {
                throw error;
            }
        }
    }
}

/**
 * Retrieves the user id from the token payload.
 * Can only be called on authenticated requests.
 * @param req NextAPIRequest to fetch from
 * @returns the userId or throws an error if not authenticated
 */
export const getUserId = (req: NextApiRequest): string => {
    if (!isAuthenticated(req)) {
        throw new Error("Not authenticated");
    }
    // will be not null since authenticated
    const token = getToken(req) as string;
    const payload = jwt.verify(token, "secretToken") as JwtPayload;
    return payload.id;
}
