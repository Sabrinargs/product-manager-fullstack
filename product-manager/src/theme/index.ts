import { createTheme } from "@mui/material";

export const theme = createTheme({
    palette: {
        primary: {
            main: "#09131b",
        },
        secondary: {
            main: "#635bff",
        },
        background: {
            default: "#f5f7fb",
        },
    },

    typography:{
        fontFamily: "inter, sans-serif",
    },

    shape: {
        borderRadius: 12,
    },
});