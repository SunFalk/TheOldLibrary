import { cookies } from "next/headers";

export default async function UserProfile() {
    const store = await cookies();
    const token = store.get('session-token')?.value;

    const res = await fetch("http://localhost:3000/api/get-data/user", {
        headers: {
            "Cookie": store.toString()
        }
    });
    const data = await res.json();

    console.log(data);

    return (
        <>
            <h1>Profile</h1>
            <span>{data.username}</span> <span>{data.email}</span>
        </>
    )
}