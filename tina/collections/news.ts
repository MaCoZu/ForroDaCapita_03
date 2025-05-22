import type { Collection } from "tinacms";

export const News: Collection = {
    name: "news",
    label: "News",
    path: "src/content/news",
    defaultItem: () => {
        return {
            pubDate: new Date().toISOString(),
        }
    },
    fields: [
        { name: "title", label: "Title", type: "string", isTitle: true, required: true },
        { name: "pubDate", label: "Publication Date", type: "datetime", },
        { name: "updatedDate", label: "Update Date", type: "datetime", required: false },
        { name: "thumbnail", label: "Image", type: "image", required: false },
        { name: "body", label: "Body", type: "rich-text", isBody: true },
    ],
    ui: {
        allowedActions: {
            create: true,
            delete: true,
            createNestedFolder: false,
        },
        beforeSubmit: async ({ form, values }) => {
            if (form.initialValues.pubDate && form.dirty) {

                return {
                    ...values,
                    updatedDate: new Date().toISOString()
                };
            }
            return values;
        }
    }
}