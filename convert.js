const fs = require('fs');
const file = fs.readFileSync('src/lib/products.ts', 'utf8');
const match = file.match(/export const allProducts: Product\[\] = (\[[\s\S]*?\]);/);
if (match) {
  const data = eval(match[1]);
  fs.writeFileSync('data/products.json', JSON.stringify(data, null, 2));
  console.log('Success');
} else {
  console.log('Failed');
}
