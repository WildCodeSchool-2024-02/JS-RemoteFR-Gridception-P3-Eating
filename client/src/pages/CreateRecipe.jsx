// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';

export default function CreateRecipePage() {
    const [recipes, setRecipes] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [newIngredient, setNewIngredient] = useState('');
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        steps: '',
        time: '',
        category: '',
        image: '',
        type: '',
        ingredients: []
    });
    const [formError, setFormError] = useState(null);
    const [selectedIngredientsList, setSelectedIngredientsList] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const recipesResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/recipes`);
                const ingredientsResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/ingredients`);

                if (!recipesResponse.ok || !ingredientsResponse.ok) {
                    throw new Error('Failed to fetch data');
                }

                const recipesData = await recipesResponse.json();
                const ingredientsData = await ingredientsResponse.json();

                setRecipes(recipesData);
                setIngredients(ingredientsData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleIngredientChange = (e) => {
        const selectedIngredients = Array.from(e.target.selectedOptions, option => option.value);
        setFormData({
            ...formData,
            ingredients: selectedIngredients
        });
    };

    const handleNewIngredientChange = (e) => {
        setNewIngredient(e.target.value);
    };

    const addNewIngredient = () => {
        if (newIngredient.trim() !== '') {
            // Check if the ingredient already exists
            const existingIngredient = ingredients.find(ingredient => ingredient.name.toLowerCase() === newIngredient.trim().toLowerCase());

            if (!existingIngredient) {
                // Add new ingredient to the list
                const newIngredientObj = { id: Date.now(), name: newIngredient.trim() };
                setIngredients(prevIngredients => [...prevIngredients, newIngredientObj]);
                // Add new ingredient to formData
                setFormData(prevFormData => ({
                    ...prevFormData,
                    ingredients: [...prevFormData.ingredients, newIngredientObj.name]
                }));
                // Add new ingredient to selected ingredients list
                setSelectedIngredientsList(prevList => [...prevList, newIngredientObj.name]);
            } else {
                // If ingredient already exists, just add to formData
                setFormData(prevFormData => ({
                    ...prevFormData,
                    ingredients: [...prevFormData.ingredients, existingIngredient.name]
                }));
                // Add existing ingredient to selected ingredients list if not already added
                if (!selectedIngredientsList.includes(existingIngredient.name)) {
                    setSelectedIngredientsList(prevList => [...prevList, existingIngredient.name]);
                }
            }

            // Clear the newIngredient input field
            setNewIngredient('');
        }
    };


    const handleRemoveSelectedIngredient = (ingredientName) => {
        // Remove from formData ingredients
        const updatedIngredients = formData.ingredients.filter(ingredient => ingredient !== ingredientName);
        setFormData({
            ...formData,
            ingredients: updatedIngredients
        });
        // Remove from selected ingredients list
        setSelectedIngredientsList(prevList => prevList.filter(item => item !== ingredientName));
    };

    const handleDoubleClickIngredient = (ingredientName) => {
        if (!selectedIngredientsList.includes(ingredientName)) {
            setSelectedIngredientsList(prevList => [...prevList, ingredientName]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.title || !formData.category || !formData.time || !formData.ingredients.length) {
            setFormError('Please fill in all required fields.');
            return;
        }
        setFormError(null);

        try {
            let url = `${import.meta.env.VITE_API_URL}/api/recipes`;
            let method = 'POST';

            // If formData has an id, it means we are updating an existing recipe
            if (formData.id) {
                url += `/${formData.id}`;
                method = 'PUT';
            }

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const message = formData.id ? 'Recipe updated successfully!' : 'Recipe created successfully!';
                // eslint-disable-next-line no-alert
                alert(message);
                setFormData({
                    title: '',
                    description: '',
                    steps: '',
                    time: '',
                    category: '',
                    image: '',
                    type: '',
                    ingredients: []
                });
                setSelectedIngredientsList([]);
            } else {
                const errorData = await response.json(); // Assuming backend sends JSON error details
                console.error('Error:', errorData);
                setFormError('Failed to save recipe. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            setFormError('Failed to save recipe. Please try again.');
        }
    };


    return (
        <div className="max-w-4xl mx-auto p-4 pb-20">
            <h1 className="text-2xl font-bold mb-4">Création d'une nouvelle recette</h1>
            {formError && <p className="text-red-600">{formError}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="title" className="block text-sm font-semibold text-gray-700">Titre</label>
                    <input
                        id="title"
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-green-800 focus:border-green-800 sm:text-sm"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-semibold text-gray-700">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="mt-1 block w-full h-[10rem] border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-green-800 focus:border-green-800 sm:text-sm"
                    />
                </div>
                <div>
                    <label htmlFor="category" className="block text-sm font-semibold text-gray-700">Catégorie</label>
                    {recipes.length > 0 && (
                        <select
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-green-800 focus:border-green-800 sm:text-sm"
                            required
                        >
                            <option value="">Sélectionnez une catégorie</option>
                            {recipes.map(recipe => (
                                <option key={recipe.id} value={recipe.category_name}>{recipe.category_name}</option>
                            ))}
                        </select>
                    )
                    }
                </div>
                <div>
                    <label htmlFor="time" className="block text-sm font-semibold text-gray-700">Temps de préparation</label>
                    <input
                        id="time"
                        type="text"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-green-800 focus:border-green-800 sm:text-sm"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="ingredients" className="block text-sm font-semibold text-gray-700">Ingrédients</label>
                    <div className="flex items-center">
                        {ingredients.length > 0 && (
                            <select
                                id="ingredients"
                                name="ingredients"
                                multiple
                                value={formData.ingredients}
                                onChange={handleIngredientChange}
                                className="mt-1 block w-full h-[10rem] border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-green-800 focus:border-green-800 sm:text-sm mr-2"
                                required
                            >
                                {ingredients.map(ingredient => (
                                    <option
                                        key={ingredient.id}
                                        value={ingredient.name}
                                        onDoubleClick={() => handleDoubleClickIngredient(ingredient.name)}
                                    >
                                        {ingredient.name}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>
                    <label htmlFor="selectedIngredients" className="block text-sm font-semibold text-gray-700 mt-4">Ingrédients sélectionnés</label>
                    <div className="mt-2 h-[10rem] border border-gray-300 rounded-xl text-sm p-1 overflow-y-auto">
                        {selectedIngredientsList.length === 0 ? (
                            <p>Aucun ingrédient sélectionné pour le moment.</p>
                        ) : (
                            <ul className="divide-y divide-gray-200">
                                {selectedIngredientsList.map((ingredient) => (
                                    <li key={ingredient.id} className="flex justify-between py-1">
                                        <span>{ingredient}</span>

                                        <button
                                            type="button"
                                            className="text-red-600 ml-2"
                                            onClick={() => handleRemoveSelectedIngredient(ingredient)}
                                        >
                                            Retirer
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <div className="mt-2 flex items-center">
                        <input
                            type="text"
                            value={newIngredient}
                            onChange={handleNewIngredientChange}
                            placeholder="Ajouter un nouvel ingrédient"
                            className="mt-1 block w-full border text-black border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-green-800 focus:border-green-800 sm:text-sm"
                        />
                        <button
                            type="button"
                            onClick={addNewIngredient}
                            className="ml-2 inline-flex items-center px-2 py-2 border border-transparent text-sm font-semibold rounded-md shadow-sm text-white bg-green-800 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800"
                        >
                            Ajouter
                        </button>
                    </div>
                </div>
                <div>
                    <label htmlFor="steps" className="block text-sm font-semibold text-gray-700">Étapes</label>
                    <textarea
                        id="steps"
                        name="steps"
                        value={formData.steps}
                        onChange={handleChange}
                        className="mt-1 block w-full h-[15rem] border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-green-800 focus:border-green-800 sm:text-sm"
                    />
                </div>
                <div>
                    <label htmlFor="image" className="block text-sm font-semibold text-gray-700">Ajoutez une photo</label>
                    <input
                        id="image"
                        type="text"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-green-800 focus:border-green-800 sm:text-sm"
                    />
                </div>
                <div>
                    <button
                        type="submit"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-semibold rounded-md shadow-sm text-white bg-green-800 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800"
                    >
                        Créer la recette
                    </button>
                </div>
            </form>
        </div>
    );
}
