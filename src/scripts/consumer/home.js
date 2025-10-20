import { db } from '@/lib/firebase';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { NLayout, NFlex, NButton, NList, NListItem } from 'naive-ui';
import { ref, watch } from 'vue';
import { onMounted } from 'vue';

const categoryDatas = ref([]);
const selectedCategoryId = ref("");
const productDatas = ref([]);

async function fetchProducts() {
  try {
    console.log("Fetching Products...");
    let productQuery = null;
    if (selectedCategoryId === "") {
      productQuery = query(collection(db, "product"), orderBy("createdAt", "desc"))
    } else {
      productQuery = query(collection(db, "product"), where("categoryId", "==", selectedCategoryId), orderBy("createdAt", "desc"))
    }
    const products = await getDocs(productQuery);
    productDatas.value = products.docs.map(doc => ({...doc.data() }));
    console.log("Products Fetched Successfully!");
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

onMounted(async () => {
  try {
    console.log("Fetching Category Data...");
    const categoryData = await getDocs(query(collection(db, "category"), orderBy("id")));
    categoryDatas.value = categoryData.docs.map(doc => ({...doc.data()}));
    console.log("Category Data Fetched Successfully!", categoryDatas.value);
    await fetchProducts();
  } catch (error) {
    console.error("Error fetching category data:", error);
  }
});

watch(() => selectedCategoryId, async () => {
  await fetchProducts();
});