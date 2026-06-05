window.app.component("app-modal", {
    template: "#tpl-app-modal",

    props: {
        type: String,
        message: String
    },

    emits: ["close", "confirm"]
})