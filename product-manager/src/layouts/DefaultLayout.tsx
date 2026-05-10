import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";

export function DefaultLayout() {
    return (
        <Box
            sx={{
                minHeight: "100vh",
                backgroundColor: "#f5f7fb",
                py: 4,
            }}
        >
            <Container>
                <Outlet/>
            </Container>
        </Box>
    );
}
