import type { Collection } from "tinacms";

export const Pages: Collection = {
    name: "pages",
    label: "Pages",
    path: "src/content/pages",
    fields: [
        { name: "title", label: "Title", type: "string", isTitle: true, required: true, },
        { name: "body", label: "Page Content", type: "rich-text", isBody: true, },
    ],
}