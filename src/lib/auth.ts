import { SignJWT, jwtVerify } from "jose";
const getSecret = () => {
    const s = process.env.ADMIN_JWT_SECRET;
    if (!s || s.length < 16) {
        throw new Error("ADMIN_JWT_SECRET kamida 16 belgi bo‘lishi kerak");
    }
    return new TextEncoder().encode(s);
};
export async function createAdminToken(adminId: string) {
    return new SignJWT({ sub: adminId })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("7d")
        .sign(getSecret());
}
export async function verifyAdminToken(token: string) {
    const { payload } = await jwtVerify(token, getSecret());
    const sub = payload.sub;
    if (typeof sub !== "string")
        throw new Error("Invalid token");
    return sub;
}
