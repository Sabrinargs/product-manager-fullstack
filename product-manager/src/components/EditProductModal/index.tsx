import {
  Box,
  Button,
  MenuItem,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import type { Product } from "../../types/product";
import { useUpdateProduct } from "../../hooks/useUpdateProducts";

type EditProductModalProps = {
  open: boolean;
  product: Product | null;
  onClose: () => void;
};

export function EditProductModal({
  open,
  product,
  onClose,
}: EditProductModalProps) {
  const { mutate: editProduct } = useUpdateProduct();

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        component="form"
        onSubmit={(event) => {
          event.preventDefault();

          if (!product) return;

          const formData = new FormData(event.currentTarget);

          const data = {
            name: String(formData.get("name")),
            sku: String(formData.get("sku")),
            category: String(formData.get("category")),
            price: Number(formData.get("price")),
            stock: Number(formData.get("stock")),
          };

          editProduct(
            {
              id: product.id,
              data,
            },
            {
              onSuccess: () => {
                onClose();
              },

              onError: (error: any) => {
                alert(error.response?.data);
              },
            }
          );
        }}
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: {
            xs: "80%",
            sm: 500,
          },
          maxHeight: "90vh",
          overflowY: "auto",
          bgcolor: "background.paper",
          borderRadius: 1,
          p: {
            xs: 3,
            sm: 4,
          },
          border: "1px solid #e5e7eb",
          boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
        }}
      >
        <Typography variant="h5" fontWeight={800} mb={3}>
          Editar Produto
        </Typography>

        <Stack spacing={3}>
          <TextField
            name="name"
            label="Nome"
            defaultValue={product?.name}
            fullWidth
          />

          <TextField
            name="sku"
            label="SKU"
            defaultValue={product?.sku}
            fullWidth
          />

          <TextField
            name="category"
            label="Categoria"
            defaultValue={product?.category}
            select
            fullWidth
          >
            <MenuItem value="Eletrônicos">Eletrônicos</MenuItem>
            <MenuItem value="Roupas">Roupas</MenuItem>
            <MenuItem value="Casa">Casa</MenuItem>
          </TextField>

          <TextField
            name="price"
            label="Preço"
            type="number"
            defaultValue={product?.price}
            fullWidth
          />

          <TextField
            name="stock"
            label="Estoque"
            type="number"
            defaultValue={product?.stock}
            fullWidth
          />

          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button
              variant="outlined"
              onClick={onClose}
              sx={{
                borderRadius: 3,
                textTransform: "none",
                fontWeight: 600,
              }}
            >
              Cancelar
            </Button>

            <Button
              type="submit"
              variant="contained"
              sx={{
                borderRadius: 3,
                textTransform: "none",
                fontWeight: 700,
              }}
            >
              Salvar alterações
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
}