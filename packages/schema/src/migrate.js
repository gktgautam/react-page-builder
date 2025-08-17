"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVersion = getVersion;
exports.migrateToLatest = migrateToLatest;
const types_1 = require("./types");
const v0_to_v1_1 = require("./migrations/v0_to_v1");
function getVersion(input) {
    if (!input || typeof input !== "object")
        return null;
    const v = input.version;
    return v === 0 || v === 1 ? v : null;
}
function migrateToLatest(input) {
    const v = getVersion(input);
    if (v === 1) {
        const parsed = types_1.PageDocumentZ.safeParse(input);
        if (!parsed.success)
            throw new Error(`Invalid v1 PageDocument: ${parsed.error.message}`);
        return parsed.data;
    }
    if (v === 0) {
        const upgraded = (0, v0_to_v1_1.migrateV0ToV1)(input);
        const parsed = types_1.PageDocumentZ.safeParse(upgraded);
        if (!parsed.success)
            throw new Error(`Migration v0→v1 invalid: ${parsed.error.message}`);
        return parsed.data;
    }
    // Unknown/missing version: best-effort assume v0
    const upgraded = (0, v0_to_v1_1.migrateV0ToV1)(input);
    const parsed = types_1.PageDocumentZ.safeParse(upgraded);
    if (!parsed.success)
        throw new Error(`Cannot migrate: ${parsed.error.message}`);
    return parsed.data;
}
