# TypeScript VITE MERN

1.  Create TypeScript React App By Vite

    1. npm create vite@latest client -- --template react-ts
    2. cd client
    3. npm install
    4. npm run dev

2.  List Products

    1. create Product type
    2. create products array
    3. add product images
    4. render products

3.  Add React Bootstrap

    1. npm install react-bootstrap bootstrap
    2. import bootstrap css
    3. update App.tsx

4.  Add page routing

    1. npm i react-router-dom
    2. create route for home page
    3. create route for product page

5.  Create Node.JS Server

    1. create server folder and run npm init
    2. npm install express
    3. npm install -save-dev typescript ts-node-dev @types/express
    4. npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
    5. create src/index.ts
    6. create route for '/' endpoin and return server is ready.
    7. create data.ts and Product.ts
    8. create route for /api/products
    9. return products

6.  Fetch Products

    1. install axios npm install axios
    2. define types in HomePage
    3. define initial state and reducer in HomePage.tsx
    4. define get error function create types/ApiError.ts
    5. fetch products
    6. create LoadingBox component create /components/LoadingBox.tsx
    7. create MessageBox component create /components/MessageBox.tsx

7.  Create Rating ProductItem Component

    1. Create Rating.tsx
    2. Create ProductItem.tsx
    3. Import and render ProductItem Component in HomePage

8.  Set Page Title

    1. npm i react-helmet-async
    2. Import and use HelmetProvider in main.tsx
    3. Import and use Helmet Component in HomePage.tsx
    4. Import and use Helmet Component in ProductPage.tsx

9.  Load Products By React Query

    1. npm i @tanstack/react-query @tanstack/react-query-devtools
    2. In main.tsx use QueryClientProvider and ReactQueryDevtools
    3. create apiClient.tsx
    4. create hooks/productHook.tsx
    5. implement useGetProductsQuery() in HomePage.tsx

10. Create Product Page

    1. Define a GET endpoint at "/api/products/slug" in index.tsx
    2. Define a Custom hook to fetch product details by slug in productHooks.ts
    3. Build ProductPage ( Conditional rendering )

11. Create React Context Api

    1. Create a Context Store.tsx
    2. Create a StoreProvider
    3. Wrap the app with the StoreProvider component to provide the store
    4. Set the theme based on the mode in App.tsx
    5. Define a switchModeHandler function
    6. Render a switchModeHandler button

12. Connect To MongoDB

    1. create mongodb database
    2. npm install dotenv mongoose @typegoose/typegoose
    3. put mongodb uri in .env
    4. MONGODB_URI=mongodb://localhost/tsmernamazona
    5. edit index.ts
    6. create models/productModel
    7. npm i express-async-handler
    8. create productRouter.ts
    9. edit index.ts
    10. create seedRouter.ts

13. Implement Add To Cart

    1. Cart.ts
    2. Store.js
    3. App.tsx
    4. utils.ts
    5. ProductItem.ts

14. Add To Cart In Product Page

    1. npm i react-router-bootstrap
    2. npm i react-toastify
    3. npm i @types/react-router-bootstrap
    4. Use Context in ProductPage.ts
    5. Define the addToCartHandler function in in ProductPage.ts

15. Create Cart Page

    1. CartPage.tsx
    2. Create CartPage route in main.tsx

16. Implement Remove From Cart

    1. Define removeItemHandler in CartPage.tsx
    2. Implement the CART_REMOVE_ITEM in Store.tsx

17. Create User Signin Api

    1. npm i bcryptjs
    2. npm i jsonwebtoken
    3. npm i @types/bcryptjs
    4. npm i @types/jsonwebtoken
    5. data.tsx
    6. Create userModel.ts
    7. Create userRouter.ts
    8. Create Request.ts

18. Create Signin Page

    1. Create userHooks.ts
    2. Create SigninPage.tsx
    3. Create SigninPage route in main.tsx

19. Create Signup Page

    1. Define a route handler for the POST request to the /signup endpoint ( userRouter.ts )
    2. Define useSignupMutation in ( userHooks.ts )
    3. Create SignunPage.tsx
    4. Define SignupPage route ( main.tsx )

20. Create Shipping Page

    1. Define the action type (SAVE_SHIPPING_ADDRESS) and the corresponding state in Store.tsx
    2. Create CheckoutSteps.ts
    3. Create ShippingAddressPage.ts
    4. Create Shipping route in main.tsx

21. Create Payment Page

    1. Define the action type (SAVE_PAYMENT_METHOD) and the corresponding state in Store.tsx
    2. Create the PaymentMethodPage.ts
    3. Create payment route in main.tsx

22. Build Order Api

    1. orderModel.tsx
    2. orderRouter.ts
    3. index.tsx
    4. utils.js
