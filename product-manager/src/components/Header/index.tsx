import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import { useNavigate } from "react-router-dom";

export function Header() {
  const navigate = useNavigate();

  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        mb: 4,
        borderRadius: 1,
        background: "linear-gradient(135deg, #09131b 0%, #1f2937 100%)",
        color: "#fff",
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        spacing={3}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: 3,
              backgroundColor: "rgba(255,255,255,0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Inventory2OutlinedIcon fontSize="large" />
          </Box>

          <Box>
            <Typography variant="h4" fontWeight={800}>
              Gestão de Produtos
            </Typography>

            <Typography sx={{ opacity: 0.75 }}>
              Cadastre, edite e acompanhe os produtos da loja
            </Typography>
          </Box>
        </Stack>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate("/create")}
          sx={{
            backgroundColor: "#fff",
            color: "#09131b",
            fontWeight: 700,
            px: 3,
            py: 1.2,
            borderRadius: 3,
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#e5e7eb",
            },
          }}
        >
          Novo Produto
        </Button>
      </Stack>
    </Paper>
  );
}