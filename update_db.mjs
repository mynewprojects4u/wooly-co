import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://vfovpxgzvtuaeweyxfry.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_IFzRi0zGyCCRI0pGYEoE6A_3MR3OWFF";

async function run() {
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  try {
    const { data: products, error } = await supabase.from('products').select('*');
    if (error) throw error;
    
    for (const product of products) {
      if (product.desc && product.desc.includes('7-day return policy')) {
        const newDesc = product.desc.replace(/ 7-day return policy for unused items./g, '').replace(/7-day return policy for unused items./g, '');
        const { error: updateError } = await supabase
          .from('products')
          .update({ desc: newDesc })
          .eq('id', product.id);
        
        if (updateError) {
          console.error(`Error updating product ${product.id}:`, updateError);
        } else {
          console.log(`Updated product ${product.id}`);
        }
      }
    }
    console.log("Done");
  } catch (err) {
    console.error("Error", err);
  }
}

run();
