// Système de routing
//  des accès aux non connectés
// des accès aux connectés en tant que user
//  des accès en tant que admin

// un systeme de templating => composant App

// accès non connectés => j'appelle le composant directement
//  element: <App />
//  children: [
//       {
//         element: <HomePage />,
//         path: "/",
//         loader: recipesLoader,
//       },
//       {
//         element: <RecipesPage />,
//         path: "/recettes",
//         loader: recipesLoader,
//       }
// ]


// des accès aux connectés en tant que user => j'intercale un composant entre App (layout) et le composant voulu
// le composant qui s'intercale vérifie les droits

//  element: <App />
//  children: [
//      {
      //   path: "utilisateur",
      //   element: <AuthUserVerification />,
      //   children: [
      //     {
      //       element: <CreateRecipe />,
      //       path: "recettes/creation",
      //     },
      //     {
      //       element: <EditRecipe />,
      //       path: "recettes/creation",
      //     },
      
      //   ],
      // },
// ]