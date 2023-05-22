# TypeScript VITE MERN

1. Create TypeScript React App By Vite

   1. npm create vite@latest client -- --template react-ts
   2. cd client
   3. npm install
   4. npm run dev

2. List Products

   1. create Product type
   2. create products array
   3. add product images
   4. render products

3. Add React Bootstrap

   1. npm install react-bootstrap bootstrap
   2. import bootstrap css
   3. update App.tsx

4. Add page routing

   1. npm i react-router-dom
   2. create route for home page
   3. create route for product page

5. Create Node.JS Server

   1. create server folder and run npm init
   2. npm install express
   3. npm install -save-dev typescript ts-node-dev @types/express
   4. npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
   5. create src/index.ts
   6. create route for '/' endpoin and return server is ready.
   7. create data.ts and Product.ts
   8. create route for /api/products
   9. return products

6. Fetch Products

   1. install axios npm install axios
   2. define types in HomePage
   3. define initial state and reducer in HomePage.tsx
   4. define get error function create types/ApiError.ts
   5. fetch products
   6. create LoadingBox component create /components/LoadingBox.tsx
   7. create MessageBox component create /components/MessageBox.tsx
