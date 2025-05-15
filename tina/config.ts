import { defineConfig } from "tinacms";
import { LocalAuthProvider } from 'tinacms'; 
import {
  TinaUserCollection,
  UsernamePasswordAuthJSProvider,
} from 'tinacms-authjs/dist/tinacms'

// Check if we're in local development mode
const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === 'true';

export default defineConfig({
  branch: process.env.GITHUB_BRANCH || "main",
  token: process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,

  // Very important for Astro setup - point to our API routes
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
            create: true, 
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
