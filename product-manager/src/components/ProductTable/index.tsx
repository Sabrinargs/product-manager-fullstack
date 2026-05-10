import { useState, } from "react";
import type { Product } from "../../types/product";

import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Chip,
    Stack,
    Modal,
    Box,
    Button,
    MenuItem,
    TextField,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";

import { useProducts } from "../../hooks/useProducts";
import { useDeleteProduct } from "../../hooks/useDeleteProducts";
import { useUpdateProduct } from "../../hooks/useUpdateProducts";
import { EditProductModal } from "../EditProductModal";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export function ProductTable() {
    const {
        data: products,
        isLoading,
        error,
    } = useProducts();

    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const { mutate: removeProduct } = useDeleteProduct();
    const { mutate: editProduct } = useUpdateProduct();

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    if (isLoading) {
        return <p>Carregando...</p>;
    }

    if (error) {
        return <p>Erro ao carregar produtos</p>;
    }

    if (isLoading) {
        return <p>Carregando...</p>;
    }

    if (error) {
        return <p>Erro ao carregar produtos</p>;
    }

    if (!products?.length) {
        return (
            <Paper
                sx={{
                    p: 6,
                    textAlign: "center",
                    borderRadius: 1,
                }}
            >
                <Typography variant="h6" fontWeight={700}>
                    Nenhum produto encontrado
                </Typography>

                <Typography color="text.secondary" mt={1}>
                    Cadastre seu primeiro produto.
                </Typography>
            </Paper>
        );
    }

    if (isMobile) {
        return (
            <>
                <Stack spacing={2}>
                    {products?.map((product) => (
                        <Paper
                            key={product.id}
                            elevation={0}
                            sx={{
                                p: 3,
                                borderRadius: 1,
                                border: "1px solid #e5e7eb",
                            }}
                        >
                            <Stack spacing={2}>
                                <Stack direction="row" justifyContent="space-between">
                                    <Typography fontWeight={800}>
                                        {product.name}
                                    </Typography>

                                    <Chip
                                        label={product.category}
                                        size="small"
                                    />
                                </Stack>

                                <Typography color="text.secondary">
                                    Preço: R$ {Number(product.price).toLocaleString("pt-BR", {
                                        minimumFractionDigits: 2,
                                    })}
                                </Typography>

                                <Typography color="text.secondary">
                                    Estoque: {product.stock}
                                </Typography>

                                <Stack direction="row" justifyContent="flex-end">
                                    <IconButton
                                        onClick={() => {
                                            setSelectedProduct(product);
                                            setIsEditModalOpen(true);
                                        }}
                                    >
                                        <EditIcon />
                                    </IconButton>

                                    <IconButton
                                        color="error"
                                        onClick={() => removeProduct(product.id)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Stack>
                            </Stack>
                        </Paper>
                    ))}
                </Stack>

                <EditProductModal
                    open={isEditModalOpen}
                    product={selectedProduct}
                    onClose={() => {
                        setIsEditModalOpen(false);
                        setSelectedProduct(null);
                    }}
                />
            </>
        );
    }

    return (
        <>
            <TableContainer
                component={Paper}
                elevation={0}
                sx={{
                    borderRadius: 1,
                    overflow: "hidden",
                    border: "1px solid #e5e7eb",
                }}
            >
                <Table>
                    <TableHead
                        sx={{
                            backgroundColor: "#f9fafb",
                        }}
                    >
                        <TableRow>
                            <TableCell sx={{ fontWeight: 700, color: "#374151" }}>Nome</TableCell>
                            <TableCell sx={{ fontWeight: 700, color: "#374151" }}>Categoria</TableCell>
                            <TableCell sx={{ fontWeight: 700, color: "#374151" }}>Preço</TableCell>
                            <TableCell sx={{ fontWeight: 700, color: "#374151" }}>Estoque</TableCell>
                            <TableCell sx={{ fontWeight: 700, color: "#374151" }} align="right">Ações</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {products?.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell>{product.name}</TableCell>

                                <TableCell>
                                    <Chip
                                        label={product.category}
                                        size="small"
                                        sx={{
                                            fontWeight: 600,
                                            backgroundColor:
                                                product.category === "Eletrônicos" ? "#e0f2fe" : "#f3f4f6",
                                            color:
                                                product.category === "Eletrônicos" ? "#0369a1" : "#374151",
                                        }}
                                    />
                                </TableCell>

                                <TableCell>
                                    R$ {Number(product.price).toLocaleString("pt-BR", {
                                        minimumFractionDigits: 2,
                                    })}
                                </TableCell>

                                <TableCell>{product.stock}</TableCell>

                                <TableCell align="right">
                                    <Stack direction="row" justifyContent="flex-end">
                                        <IconButton
                                            onClick={() => {
                                                setSelectedProduct(product);
                                                setIsEditModalOpen(true);
                                            }}
                                        >
                                            <EditIcon />
                                        </IconButton>

                                        <IconButton
                                            color="error"
                                            onClick={() => removeProduct(product.id)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <EditProductModal
                open={isEditModalOpen}
                product={selectedProduct}
                onClose={() => {
                    setIsEditModalOpen(false);
                    setSelectedProduct(null);
                }}
            />
        </>
    );
}