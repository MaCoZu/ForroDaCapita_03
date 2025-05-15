// tina/database.ts
import { createDatabase, createLocalDatabase } from '@tinacms/datalayer';
import { MongodbLevel } from 'mongodb-level'
import { GitHubProvider } from 'tinacms-gitprovider-github'

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === 'true';

const database = isLocal
    ? createLocalDatabase()
    : createDatabase({
        gitProvider: new GitHubProvider({
            repo: process.env.GITHUB_REPO!,
            owner: process.env.GITHUB_OWNER!,
            token: process.env.GITHUB_PERSONAL_ACCESS_TOKEN!,
            branch: process.env.GITHUB_BRANCH || 'main',
        }),

        databaseAdapter: new MongodbLevel<string, Record<string, any>>({
            collectionName: `tinacms-${process.env.GITHUB_BRANCH || 'main'}`,
            dbName: process.env.MONGODB_DB_NAME!,
            mongoUri: process.env.MONGODB_URI as string,
        }),
    });

export default database;