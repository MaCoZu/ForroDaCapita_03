import { defineConfig} from "tinacms";
import { Pages } from './collections/pages'
import { News } from './collections/news'


const branch =
  process.env.GIT_COMMIT_REF || // ✅ Netlify's branch variable
  process.env.HEAD || // fallback
  'main';

export default defineConfig({
  token: process.env.TINA_TOKEN, // This should match the value in your .env file
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID, 
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
