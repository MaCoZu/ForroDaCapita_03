// src/pages/api/tina/[...routes].ts
import { TinaNodeBackend, AuthJsOptions } from '@tinacms/datalayer';
import { AuthJsBackendAuthProvider, TinaAuthJSOptions } from 'tinacms-authjs';
import type { APIRoute } from 'astro';

import databaseClient from '../../../../tina/__generated__/databaseClient';

// Set up Tina backend
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

    try {
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
    } catch (error) {
        console.error('TinaCMS API error:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
};