import { Paper, Typography } from "@mui/material";

export function EmptyState() {
    return(
        <Paper 
            sx={{
                p: 6,
                textAlign: "center",
            }}
        >
            <Typography variant="h6">
                Produtos não encontrados
            </Typography>

            <Typography color="text.secondary">
                Crie seu primeiro produto
            </Typography>
        </Paper>
    )
}