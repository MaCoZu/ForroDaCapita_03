import { defineConfig} from "tinacms";
import { Pages } from './collections/pages'
import { News } from './collections/news'


const branch =
  process.env.GITHUB_BRANCH || // Netlify-style
  process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF || // Vercel-style
  process.env.HEAD || // Fallback (some hosts set this)
  "main"; // Final fallback

export default defineConfig({
  token: process.env.TINA_TOKEN, // This should match the value in your .env file
  clientId: process.env.TINA_CLIENT_ID, // This should match the value in your .env file
  branch,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [Pages, News],
  },
  search: {
    tina: {
      indexerToken: process.env.TINA_SEARCH_TOKEN,
      stopwordLanguages: ['eng'],
    },
    indexBatchSize: 100,
    maxSearchIndexFieldLength: 100,
  },
});
