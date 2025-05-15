// src/pages/api/tina/[...routes].ts
import { TinaNodeBackend } from '@tinacms/datalayer';
import { AuthJsBackendAuthProvider, TinaAuthJSOptions } from 'tinacms-authjs';
import { MongodbLevel } from 'mongodb-level';
import { createServer } from 'node:http';
import type { APIRoute } from 'astro';

import databaseClient from '../../../../tina/__generated__/databaseClient';

const tinaBackend = TinaNodeBackend({
    authProvider: AuthJsBackendAuthProvider({
        authOptions: TinaAuthJSOptions({
            databaseClient,
            secret: process.env.NEXTAUTH_SECRET as string,
        }),
    }),
    databaseClient,
});

export const all: APIRoute = async ({ request }) => {
    const url = new URL(request.url);
    const body = await request.text();
    const method = request.method;

    const result = await tinaBackend({
        url: url.pathname + url.search,
        method,
        body,
    });

    return new Response(result.body, {
        status: result.status,
        headers: {
            'Content-Type': 'application/json',
        },
    });
};
