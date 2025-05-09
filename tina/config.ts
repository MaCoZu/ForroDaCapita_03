import { defineConfig } from "tinacms";
import { TinaCMS, Form } from 'tinacms'


interface Values {
  pubDate?: string;
  updatedDate?: string;
  // Add other properties as needed
}

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.NEXT_PUBLIC_TINA_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch: process.env.NEXT_PUBLIC_TINA_BRANCH || "main",
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },

  schema: {
    collections: [
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
          beforeSubmit: async ({ values }) => {
            return {
              ...values,
              updatedDate: new Date().toISOString() // Updates every save
            }
          }
        }
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
