import type { Collection } from "tinacms";

export const News: Collection = {
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
}