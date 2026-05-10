using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProductManeger.Data;
using ProductManeger.Models;
using ProductManeger.DTOs;

namespace ProductManeger.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProductsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            var products = await _context.Products.ToListAsync();

            return Ok(products);
        }

        [HttpPost]
        public async Task<ActionResult<Product>> CreateProduct(CreateProductDto dto)
        {
            if (dto.Stock < 0)
            {
                return BadRequest("Estoque não pode ser negativo");
            }

            if (dto.Category == "Eletrônicos" && dto.Price < 50)
            {
                return BadRequest("Eletrônicos devem custar pelo menos R$ 50");
            }

            var skuExists = await _context.Products.AnyAsync(
                p => p.Sku == dto.Sku
            );

            if (skuExists)
            {
                return BadRequest("SKU já existe");
            }

            var product = new Product
            {
                Name = dto.Name,
                Sku = dto.Sku,
                Category = dto.Category,
                Price = dto.Price,
                Stock = dto.Stock
            };

            _context.Products.Add(product);

            await _context.SaveChangesAsync();

            return CreatedAtAction(
                nameof(GetProducts),
                new { id = product.Id },
                product
            );
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            _context.Products.Remove(product);

            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct(
            int id,
            Product updatedProduct
            )
        {
            var product = await _context.Products.FindAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            if (updatedProduct.Stock < 0)
            {
                return BadRequest(
                    "Estoque não pode possuir um valor negativo"
                    );
            }

            if (updatedProduct.Category == "Eletrônicos" && updatedProduct.Price < 50)
            {
                return BadRequest("Produtos eletrônicos devem custar pelo menos R$ 50.");
            }

            var skuExists = await _context.Products.AnyAsync(
                p => p.Sku == updatedProduct.Sku
                && p.Id != id
                );

            if (skuExists)
            {
                return BadRequest("SKU já existe");
            }

            product.Name = updatedProduct.Name;
            product.Sku = updatedProduct.Sku;
            product.Category = updatedProduct.Category;
            product.Price = updatedProduct.Price;
            product.Stock = updatedProduct.Stock;

            await _context.SaveChangesAsync();

            return NoContent();

        }
    }
}