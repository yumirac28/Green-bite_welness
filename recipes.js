// Recipe Data (could also be loaded from an external JSON file)
const recipes = [
    {
        id: 1,
        title: "Avocado Toast with Egg",
        category: "breakfast",
        image: "images/—Pngtree—avocado toast with toasted bread_15518365.png",
        description: "A simple yet nutritious breakfast packed with healthy fats and protein.",
        ingredients: [
            "2 slices whole grain bread",
            "1 ripe avocado",
            "2 eggs",
            "1/2 tsp red pepper flakes",
            "Salt and pepper to taste",
            "1 tbsp olive oil"
        ],
        instructions: [
            "Toast the bread slices until golden and crisp.",
            "Mash the avocado in a bowl and season with salt and pepper.",
            "Heat olive oil in a pan and fry the eggs to your preference.",
            "Spread the mashed avocado on the toast.",
            "Top with fried eggs and sprinkle with red pepper flakes."
        ],
        nutrition: {
            calories: 350,
            protein: "14g",
            carbs: "28g",
            fat: "22g",
            fiber: "8g"
        }
    },
    {
        id: 2,
        title: "Quinoa Salad Bowl",
        category: "lunch",
        image: "images/—Pngtree—top view of a rustic_13715348.jpg",
        description: "A protein-packed salad with fresh vegetables and a lemon dressing.",
        ingredients: [
            "1 cup cooked quinoa",
            "1/2 cucumber, diced",
            "1 cup cherry tomatoes, halved",
            "1/4 red onion, thinly sliced",
            "1/4 cup feta cheese, crumbled",
            "2 tbsp olive oil",
            "1 tbsp lemon juice",
            "1/2 tsp dried oregano",
            "Salt and pepper to taste"
        ],
        instructions: [
            "In a large bowl, combine cooked quinoa, cucumber, tomatoes, and red onion.",
            "In a small bowl, whisk together olive oil, lemon juice, oregano, salt and pepper.",
            "Pour the dressing over the salad and toss to combine.",
            "Top with crumbled feta cheese before serving."
        ],
        nutrition: {
            calories: 320,
            protein: "10g",
            carbs: "35g",
            fat: "16g",
            fiber: "6g"
        }
    },
    {
        id: 3,
        title: "Grilled Salmon with Asparagus",
        category: "dinner",
        image: "images/Simply-Recipes-Sheet-Pan-Salmon-Asparagus-LEAD-4-bbd1b7edab0a4727a708cd5c2f3b13af.jpg",
        description: "A heart-healthy dinner rich in omega-3 fatty acids.",
        ingredients: [
            "2 salmon fillets",
            "1 bunch asparagus, trimmed",
            "2 tbsp olive oil",
            "1 lemon, sliced",
            "2 cloves garlic, minced",
            "1/2 tsp paprika",
            "Salt and pepper to taste"
        ],
        instructions: [
            "Preheat grill or grill pan to medium-high heat.",
            "Rub salmon with olive oil, garlic, paprika, salt and pepper.",
            "Toss asparagus with remaining olive oil and season with salt.",
            "Grill salmon for 4-5 minutes per side.",
            "Grill asparagus for 3-4 minutes, turning occasionally.",
            "Serve with lemon slices."
        ],
        nutrition: {
            calories: 380,
            protein: "34g",
            carbs: "8g",
            fat: "24g",
            fiber: "3g"
        }
    },
    {
        id: 4,
        title: "Greek Yogurt with Berries",
        category: "snack",
        image: "images/vecteezy_homemade-yogurt-bowl-with-raspberry-blueberry-and-granola_2949408.jpg",
        description: "A creamy, protein-rich snack with antioxidant-packed berries.",
        ingredients: [
            "1 cup Greek yogurt",
            "1/2 cup mixed berries",
            "1 tbsp honey",
            "1 tbsp granola",
            "1 tsp chia seeds"
        ],
        instructions: [
            "Scoop Greek yogurt into a bowl.",
            "Top with fresh berries.",
            "Drizzle with honey.",
            "Sprinkle with granola and chia seeds."
        ],
        nutrition: {
            calories: 220,
            protein: "18g",
            carbs: "28g",
            fat: "4g",
            fiber: "5g"
        }
    },
    {
        id: 5,
        title: "Dark Chocolate Avocado Mousse",
        category: "dessert",
        image: "images/vecteezy_a-bowl-of-chocolate-pudding-with-an-avocado_47137827.jpg",
        description: "A decadent yet healthy dessert with hidden avocado goodness.",
        ingredients: [
            "2 ripe avocados",
            "1/4 cup cocoa powder",
            "1/4 cup maple syrup",
            "1 tsp vanilla extract",
            "Pinch of salt",
            "Fresh berries for garnish"
        ],
        instructions: [
            "Scoop avocado flesh into a food processor.",
            "Add cocoa powder, maple syrup, vanilla and salt.",
            "Process until completely smooth, scraping down sides as needed.",
            "Chill for at least 30 minutes before serving.",
            "Garnish with fresh berries."
        ],
        nutrition: {
            calories: 180,
            protein: "3g",
            carbs: "18g",
            fat: "12g",
            fiber: "7g"
        }
    }
];

// DOM Elements
const recipesGrid = document.getElementById('recipes-grid');
const recipeSearch = document.getElementById('recipe-search');
const categoryFilter = document.getElementById('category-filter');
const recipeModal = document.getElementById('recipe-modal');
const closeModal = document.querySelector('.close-modal');

// Display all recipes on page load
document.addEventListener('DOMContentLoaded', () => {
    displayRecipes(recipes);
    
    // Mobile navigation toggle (same as home page)
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
});

// Display recipes function
function displayRecipes(recipesToDisplay) {
    recipesGrid.innerHTML = '';
    
    if (recipesToDisplay.length === 0) {
        recipesGrid.innerHTML = '<p class="no-results">No recipes found matching your criteria.</p>';
        return;
    }
    
    recipesToDisplay.forEach(recipe => {
        const recipeCard = document.createElement('div');
        recipeCard.className = 'recipe-card';
        recipeCard.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.title}" class="recipe-image">
            <div class="recipe-info">
                <h3 class="recipe-title">${recipe.title}</h3>
                <p class="recipe-description">${recipe.description}</p>
                <span class="recipe-category">${recipe.category.charAt(0).toUpperCase() + recipe.category.slice(1)}</span>
            </div>
        `;
        
        recipeCard.addEventListener('click', () => openRecipeModal(recipe));
        recipesGrid.appendChild(recipeCard);
    });
}

// Open recipe modal
function openRecipeModal(recipe) {
    document.getElementById('modal-image').src = recipe.image;
    document.getElementById('modal-image').alt = recipe.title;
    document.getElementById('modal-title').textContent = recipe.title;
    document.getElementById('modal-description').textContent = recipe.description;
    
    // Ingredients list
    const ingredientsList = document.getElementById('ingredients-list');
    ingredientsList.innerHTML = '';
    recipe.ingredients.forEach(ingredient => {
        const li = document.createElement('li');
        li.textContent = ingredient;
        ingredientsList.appendChild(li);
    });
    
    // Instructions list
    const instructionsList = document.getElementById('instructions-list');
    instructionsList.innerHTML = '';
    recipe.instructions.forEach(instruction => {
        const li = document.createElement('li');
        li.textContent = instruction;
        instructionsList.appendChild(li);
    });
    
    // Nutrition table
    const nutritionTable = document.querySelector('#nutrition-table tbody');
    nutritionTable.innerHTML = '';
    for (const [nutrient, amount] of Object.entries(recipe.nutrition)) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${nutrient.charAt(0).toUpperCase() + nutrient.slice(1)}</td>
            <td>${amount}</td>
        `;
        nutritionTable.appendChild(row);
    }
    
    // Show modal
    recipeModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close modal
closeModal.addEventListener('click', () => {
    recipeModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === recipeModal) {
        recipeModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Filter and search functionality
function filterRecipes() {
    const searchTerm = recipeSearch.value.toLowerCase();
    const selectedCategory = categoryFilter.value;
    
    const filteredRecipes = recipes.filter(recipe => {
        const matchesSearch = recipe.title.toLowerCase().includes(searchTerm) || 
                             recipe.description.toLowerCase().includes(searchTerm);
        const matchesCategory = selectedCategory === 'all' || recipe.category === selectedCategory;
        
        return matchesSearch && matchesCategory;
    });
    
    displayRecipes(filteredRecipes);
}

// Event listeners for filtering
recipeSearch.addEventListener('input', filterRecipes);
categoryFilter.addEventListener('change', filterRecipes);