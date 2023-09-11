
# Recipe App

The Recipe App is a web application that allows users to browse, search, and discover a wide variety of food recipes. Whether you're a seasoned chef or a beginner in the kitchen, this app provides an easy way to find and prepare delicious meals. This App is handle from wordpress api which is handle by [wp-recipe-api](https://github.com/jakaria-istauk/wp-recipe-api) plugin.

## Features

- **Recipe Details**: View detailed information about each recipe, including ingredients, instructions, and nutritional information.
- **Create Recipe**: user can create recipe.
- **Edit Update and Delete**: User can edit, delete and update own recipe.
- **Responsive Design**: The app is optimized for both desktop and mobile devices.

## Installation

Follow these steps to run the Recipe App locally on your machine:

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/your-username/recipe-app.git
   ```

2. Navigate to the project directory:

   ```bash
   cd recipe-app
   ```

3. Install the project dependencies using npm or yarn:

   ```bash
   npm install
   # or
   yarn install
   ```

4. Start the development server:

   ```bash
   npm start
   # or
   yarn start
   ```

5. Open your web browser and visit [http://localhost:3000](http://localhost:3000) or the address apears on command propt to access the Recipe App.

6. Install [wp-recipe-api](https://github.com/jakaria-istauk/wp-recipe-api) plugin to your wordpress site. 

7. Set/Replace api base url in file ```src > config.js : baseSite = 'https://your-site.domain'``` 

## Usage

- **Home Page**: The home page displays featured recipes and a search bar for finding recipes by keywords or ingredients.

- **Recipe Details**: Click on a recipe card to view detailed information about the selected recipe, including ingredients and instructions.

- **User Profile**: Create or log in to your user profile to save your favorite recipes and customize your dietary preferences.

## Contributing

If you would like to contribute to the development of the Recipe App, please follow these steps:

1. Fork the repository on GitHub.

2. Clone your forked repository to your local machine.

3. Create a new branch for your feature or bug fix:

   ```bash
   git checkout -b feature-name
   ```

4. Make your changes and commit them with descriptive messages.

5. Push your changes to your forked repository.

6. Create a pull request to merge your changes into the main repository.

## Support and Issues

If you encounter any issues, have questions, or want to request new features, please open an issue on the [GitHub repository](https://github.com/jakaria-istauk/react-recipe-app/issues).

## License

This Recipe App is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Author

This Recipe API Plugin for WordPress was developed by [Jakaria Istauk](https://profiles.wordpress.org/jakariaistauk/).