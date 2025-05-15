import { defineConfig } from "tinacms";
import { LocalAuthProvider } from 'tinacms'; 
import {
  TinaUserCollection,
  UsernamePasswordAuthJSProvider,
} from 'tinacms-authjs/dist/tinacms'

interface Values {
  pubDate?: string;
  updatedDate?: string;
}

const user = { username: 'newseditor' }; // or get the user object from somewhere else

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === 'true';

export default defineConfig({
  branch: process.env.GITHUB_BRANCH || "main",
  token: process.env.TINA_TOKEN,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  
  contentApiUrlOverride: '/api/tina/gql',

  authProvider: isLocal
    ? new LocalAuthProvider()
    : new UsernamePasswordAuthJSProvider(),

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },

  schema: {
    collections: [
      TinaUserCollection,
      {
        name: "news",
        label: "News",
        path: "src/content/news",
        defaultItem: () => {
          return {
            pubDate: new Date().toISOString(),
            updateDate: new Date().toISOString(),
          }
        },
        fields: [
          { name: "title", label: "Title", type: "string", isTitle: true, required: true },
          { name: "pubDate", label: "Publication Date", type: "datetime", },
          { name: "updatedDate", label: "Update Date", type: "datetime", },
          { name: "thumbnail", label: "Image", type: "image", required: false },
          { name: "body", label: "Body", type: "rich-text", isBody: true },
        ],
        ui: {
          allowedActions: {
            create: isLocal || (user?.username === 'newseditor'),
            delete: false,
            createNestedFolder: false, 
          },
          beforeSubmit: async ({ values }) => {
            return {
              ...values,
              updatedDate: new Date().toISOString() // Updates every save
            }
          }
        },
      },

      {
        name: "pages",
        label: "Pages",
        path: "src/content/pages",
        fields: [
          { name: "title", label: "Title", type: "string", isTitle: true, required: true, },
          { name: "body", label: "Page Content", type: "rich-text", isBody: true, },
        ],
      },

    ],
    
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
