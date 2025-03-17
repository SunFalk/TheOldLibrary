import { cookies } from 'next/headers';
import crypto from 'crypto';
import db from '@utils/db';

/**
 * Creates a new user session.
 * @param {string} userId - The user id in database.
 * @returns {boolean} - True if the session was created, false otherwise.
 */
export async function createSession(userId) {
    const sessionToken = crypto.randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 12 * 60 * 60 * 1000);

    const cookieStore = await cookies();

    try {
        cookieStore.set('session-token', sessionToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            expires: expires,
            path: '/'
        });
    
        await db.query(
            'INSERT INTO sessions (session_token, user_id, expires) VALUES (?, ?, ?)',
            [sessionToken, userId, expires]
        );

        return true
    } catch(err) {
        console.log(err);
        return false;
    }
}

/** 
 * Update the session expires time.
 * @description Update the session expires time to 12 hours from now.
*/
export async function updateExpires() {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get('session-token')?.value;

    if (!sessionToken) {
        console.log("Session update: No session found");
        return;
    }

    if (!await checkSession(sessionToken)) {
        return;
    }

    try {
        const [result] = await db.query(
            'SELECT * FROM sessions WHERE session_token = ?',
            [sessionToken]
        );
    
        if (result.length === 0) {
            return;
        }

        // The new expires is 12 hours from now.
        const newExpires = new Date(Date.now() + 12 * 60 * 60 * 1000);
        
        try {
            const updateResult = await db.query(
                'UPDATE sessions SET expires = ? WHERE session_token = ?',
                [newExpires, sessionToken]
            );
            if (updateResult.affectedRows === 0) {
                console.log("An error has ocurred during expires update.")
                return;
            }
        } catch (err) {
            console.log("An error has ocurred during expires update: ", err);
            return;
        }

        cookieStore.set("session-token", sessionToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite:'strict',
            expires: newExpires,
            path: '/'
        })
    } catch (err) {
        console.log("An error has ocurred during session update: ", err)
        return null;
    }
}

/**
 * Get the current session.
 * @returns {boolean} - True if the user has a session, false otherwise.
 */
export async function hasSession() {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get('session-token')?.value;

    if (!sessionToken) {
        console.log("Session: No session found");
        return false;
    }

    if (!await checkSession(sessionToken)) {
        return false;
    }

    return true;
}

/**
 * Get the session data from the database.
 * @returns {object} - The session data as a object or null if not found.
 */
export async function getSession() {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get('session-token')?.value;

    if (!sessionToken) {
        console.log("Session: No session found to get");
        console.log(sessionToken);
        return null;
    }
    
    if (!await checkSession(sessionToken)) {
        return null;
    }

    try {
        const [result] = await db.query(
            'SELECT * FROM sessions WHERE session_token = ?',
            [sessionToken]
        );

        if (result.length === 0) {
            console.log("No session with this token was found")
            return null;
        } 

        return result[0];
    } catch(err) {
        console.log("An error has ocurred during session get: ", err);
        return null;
    }
}

/**
 * Delete the current session.
 */
export async function destroySession() {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get('session-token')?.value;

    if (!sessionToken) {
        console.log("Session: No session found to destroy");
        return null;
    }

    try {
        cookieStore.delete('session-token');
        const result = await db.query(
            'DELETE FROM sessions WHERE session_token =?',
            [sessionToken]
        );
        if (result.affectedRows === 0) {
            console.log("No session with this token was found in database.")
            return null;
        }

        console.log("Session destroyed.")
    } catch(err) {
        console.log("An error has ocurred during session delete: ", err);
    }
}
/**
 * @description Get the user data from database and return it.
 * @returns Return a object containing the username and email from database. return null if no user is found or no session is active.
 */
export async function getUserData() {
    const session = await getSession();

    if (!session) {
        return null;
    }

    try {
        const [res] = await db.query("SELECT username, email FROM users WHERE id = ?", [session.user_id]);
        
        if (res.length === 0) return null;

        return res[0];
    } catch(err) {
        console.log(err);
        return null;
    }
}

/**
 * 
 * @param {string} sessionToken - The session token.
 * @returns {boolean} Return true if the session is ok. Return false if the session don't exist in database or the session already expired in database. If false, the session will be destroyed.
 */
async function checkSession(sessionToken) {
    try {
        const [res] = await db.query("SELECT expires FROM sessions WHERE session_token = ?", [sessionToken]);
        
        if (res.length === 0) {
            destroySession();
            throw new Error("Session: No session found in database. Destroying session...")
        } else if (res[0].expires < new Date()) {
            destroySession()
            throw new Error("Session: The matching session already expired. Destroying session...")
        }
        return true;
    } catch(err) {
        console.log(err);
        return false;
    }
}