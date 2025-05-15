import { createDatabase, createLocalDatabase } from '@tinacms/datalayer';
import { MongodbLevel } from 'mongodb-level'
import { GitHubProvider } from 'tinacms-gitprovider-github'

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === 'true';

export default isLocal
    ? createLocalDatabase()
    : createDatabase({

        gitProvider: new GitHubProvider({
            repo: process.env.GITHUB_REPO!,
            owner: process.env.GITHUB_OWNER!,
            token: process.env.GITHUB_PERSONAL_ACCESS_TOKEN!,
            branch: process.env.GITHUB_BRANCH || 'main',
        }),
        
        databaseAdapter: new MongodbLevel<string, Record<string, any>>({
            // If you are not using branches you could pass a static collection name. ie: "tinacms"
            collectionName: `tinacms-${process.env.GITHUB_BRANCH}`,
            dbName: process.env.MONGODB_DB_NAME!,
            mongoUri: process.env.MONGODB_URI as string,
        }),

     
    })