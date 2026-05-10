import {
    Paper,
    Stack,
    TextField,
    Typography,
    MenuItem,
    Button,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import type { Product } from "../../types/product"
import { zodResolver } from "@hookform/resolvers/zod"
import { productSchemas } from "../../schemas/productSchemas";

import { createProduct } from "../../services/productService";


export function ProductForm() {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(productSchemas),
    });


    const onSubmit = async (data: any) => {
        try {
            const response = await createProduct(data);

            console.log(response);
        } catch (error: any) {
            alert(error.response?.data);
        }
    };

    const navigate = useNavigate();

    return (
        <Paper
            elevation={0}
            sx={{
                p: 4,
                borderRadius: 1,
                border: "1px solid #e5e7eb",
                maxWidth: 720,
                mx: "auto",
            }}
        >
            <Button
                startIcon={<ArrowBackIcon />}
                variant="text"
                onClick={() => navigate("/")}
                sx={{
                    mb: 3,
                    textTransform: "none",
                    fontWeight: 600,
                    borderRadius: 3,
                    alignSelf: "flex-start",
                }}
            >
                Voltar para produtos
            </Button>
            <Typography
                variant="h5"
                fontWeight={800}
                mb={1}
            >
                Formulário de Produto
            </Typography>

            <Typography
                color="text.secondary"
                mb={4}
            >
                Informe os dados do produto para cadastrá-lo no sistema
            </Typography>

            <Stack
                component="form"
                spacing={3}
                onSubmit={handleSubmit(onSubmit)}
            >
                <TextField
                    label="Nome do Produto"
                    fullWidth
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    {...register("name")}
                />

                <TextField
                    label="SKU"
                    fullWidth
                    error={!!errors.sku}
                    helperText={errors.sku?.message}
                    {...register("sku")}
                />

                <TextField
                    label="Categoria"
                    select
                    fullWidth
                    defaultValue=""
                    error={!!errors.category}
                    helperText={errors.category?.message}
                    {...register("category")}
                >
                    <MenuItem value="Eletrônicos">Eletrônicos</MenuItem>
                    <MenuItem value="Roupas">Roupas</MenuItem>
                    <MenuItem value="Casa">Casa</MenuItem>
                </TextField>

                <Stack direction={{ xs: "column", sm: "row" }} spacing={3}>
                    <TextField
                        label="Preço"
                        type="number"
                        fullWidth
                        error={!!errors.price}
                        helperText={errors.price?.message}
                        {...register("price")}
                    />

                    <TextField
                        label="Estoque"
                        type="number"
                        fullWidth
                        error={!!errors.stock}
                        helperText={errors.stock?.message}
                        {...register("stock")}
                    />
                </Stack>

                <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    sx={{
                        alignSelf: "flex-end",
                        borderRadius: 3,
                        px: 4,
                        py: 1.2,
                        textTransform: "none",
                        fontWeight: 700,
                    }}
                >
                    Salvar Produto
                </Button>
            </Stack>
        </Paper>
    );
}