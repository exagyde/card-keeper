export function sanitizeForClient(data) {
    if (Array.isArray(data)) {
        return data.map(sanitizeForClient);
    }

    if (data && typeof data === "object") {
        const clean = {};

        for (const [key, value] of Object.entries(data)) {
            if (value === undefined) continue;

            if (value instanceof Date) {
                clean[key] = value.toISOString();
            } else if (value?.toDate) {
                clean[key] = value.toDate().toISOString();
            } else if (typeof value === "object") {
                clean[key] = sanitizeForClient(value);
            } else {
                clean[key] = value;
            }
        }
        return clean;
    }
    return data;
}
