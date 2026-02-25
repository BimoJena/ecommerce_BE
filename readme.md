# Ecommerce Backend API

## Features
- User Authentication/Authorization APIs
- Product Management (admin) APIs
- Cart System APIs
- Order APIs

## Tech Stack
- Node.js
- Express.js
- MongoDB

## Installation Setup

### For Local
- Clone the project from Github repo
Run 
```
git clone https://github.com/BimoJena/ecommerce_BE.git
```

- Install Dependencies
Run 
```
npm install
```

- Start the server
Run 
```
npm run dev
```

### Backend is live here
- Live Link (deployed on render)
```
https://github.com/BimoJena/ecommerce_BE.git 
```

- Live Link (deployed on vercel)
```
https://ecommerce-be-live.vercel.app/
```

# cURL for every API
- To run every single API through Command line simply


## Authentication APIs
- Create New User, Login and Logout the current User, By default registered accound will be a normal user not admin, to make it admin go to mongodb database and change the role of the registered user to [admin] or contact to the developer.

### Register User
```
curl --location 'https://ecommerce-be-slrr.onrender.com/api/auth/register' \
--header 'Content-Type: application/json' \
--header 'Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ODZmOGI4YzFhNjU1ZGM4M2I2OWZlOCIsImlhdCI6MTc3MDgwOTY0MywiZXhwIjoxNzcxNDE0NDQzfQ.KQlMg5jjCtRScjOf81nKJlc0IBFPRKpakeR1XzzAe_k' \
--data-raw '{
    "name": "kunal",
    "email": "kunal@gmail.com",
    "password": "kunal@gmail.com"
}'
```

### Login User
```
curl --location 'https://ecommerce-be-slrr.onrender.com/api/auth/login' \
--header 'Content-Type: application/json' \
--header 'Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ODZmOGI4YzFhNjU1ZGM4M2I2OWZlOCIsImlhdCI6MTc3MDgwOTY0MywiZXhwIjoxNzcxNDE0NDQzfQ.KQlMg5jjCtRScjOf81nKJlc0IBFPRKpakeR1XzzAe_k' \
--data-raw '{
    "email": "kunal@gmail.com",
    "password": "kunal@gmail.com"
}'
```

### Logout User
```
curl --location --request POST 'https://ecommerce-be-slrr.onrender.com/api/auth/logout' \
--header 'Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ODZmOGI4YzFhNjU1ZGM4M2I2OWZlOCIsImlhdCI6MTc3MDgwOTY0MywiZXhwIjoxNzcxNDE0NDQzfQ.KQlMg5jjCtRScjOf81nKJlc0IBFPRKpakeR1XzzAe_k' \
--data ''
```

### Send Account Verification OTP
```
curl --location --request POST 'https://ecommerce-be-slrr.onrender.com/api/auth/send-verify-otp' \
--header 'Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ODZmOGI4YzFhNjU1ZGM4M2I2OWZlOCIsImlhdCI6MTc3MDgwOTY0MywiZXhwIjoxNzcxNDE0NDQzfQ.KQlMg5jjCtRScjOf81nKJlc0IBFPRKpakeR1XzzAe_k' \
--data ''
```

### Verify Email with OTP
- OTP will be sent to registered email address make sure to enter original email address only.
```
curl --location 'https://ecommerce-be-slrr.onrender.com/api/auth/verify-account' \
--header 'Content-Type: application/json' \
--header 'Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ODZmOGI4YzFhNjU1ZGM4M2I2OWZlOCIsImlhdCI6MTc3MDgwOTY0MywiZXhwIjoxNzcxNDE0NDQzfQ.KQlMg5jjCtRScjOf81nKJlc0IBFPRKpakeR1XzzAe_k' \
--data '{
    "otp": "592368"
}'
``` 

### Send Reset Password OTP
```
curl --location 'https://ecommerce-be-slrr.onrender.com/api/auth/send-resetPassword-otp' \
--header 'Content-Type: application/json' \
--header 'Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ODZmOGI4YzFhNjU1ZGM4M2I2OWZlOCIsImlhdCI6MTc3MDgwOTY0MywiZXhwIjoxNzcxNDE0NDQzfQ.KQlMg5jjCtRScjOf81nKJlc0IBFPRKpakeR1XzzAe_k' \
--data-raw '{
    "email": "taskbimo@gmail.com"
}'
```

### Reset Password
```
curl --location 'https://ecommerce-be-slrr.onrender.com/api/auth/reset-password' \
--header 'Content-Type: application/json' \
--header 'Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ODZmOGI4YzFhNjU1ZGM4M2I2OWZlOCIsImlhdCI6MTc3MDgwOTY0MywiZXhwIjoxNzcxNDE0NDQzfQ.KQlMg5jjCtRScjOf81nKJlc0IBFPRKpakeR1XzzAe_k' \
--data-raw '{
    "email": "taskbimo@gmail.com",
    "otp": "378889",
    "newPassword": "24MCAFSD0008"
}'
```


## Category APIs (for ADMIN use only)
- only ADMIN can create the category for the product, before creating any new product first have to create the category if the category does not exist, later on to create any product use the category._id from category TABLE to create the product

### Create Category
- only ADMIN can create the category 
```
curl --location 'https://ecommerce-be-slrr.onrender.com/api/category/create-category' \
--header 'Content-Type: application/json' \
--header 'Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ODZmOGI4YzFhNjU1ZGM4M2I2OWZlOCIsImlhdCI6MTc3MDgwOTY0MywiZXhwIjoxNzcxNDE0NDQzfQ.KQlMg5jjCtRScjOf81nKJlc0IBFPRKpakeR1XzzAe_k' \
--data '{
    "name": "mobile"
}'
```

### Get All Category List
```
curl --location 'https://ecommerce-be-slrr.onrender.com/api/category/get-all-category' \
--header 'Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ODZmOGI4YzFhNjU1ZGM4M2I2OWZlOCIsImlhdCI6MTc3MDgwOTY0MywiZXhwIjoxNzcxNDE0NDQzfQ.KQlMg5jjCtRScjOf81nKJlc0IBFPRKpakeR1XzzAe_k' \
--data ''
```

## Product APIs (for ADMIN use only)
- Create Products with the help of category._id, if any specific category is not present in the DB, first create the category then we can create the product

### Create Product
- only ADMIN can create the product and to upload images [seperate image services] has been used like [imagekit.io]
```
curl --location 'https://ecommerce-be-slrr.onrender.com/api/products/create-product' \
--header 'Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ODZmOGI4YzFhNjU1ZGM4M2I2OWZlOCIsImlhdCI6MTc3MDgwOTY0MywiZXhwIjoxNzcxNDE0NDQzfQ.KQlMg5jjCtRScjOf81nKJlc0IBFPRKpakeR1XzzAe_k' \
--form 'productName="Realme C21"' \
--form 'productDescription="Best Budget Phone"' \
--form 'productPrice="10500"' \
--form 'stock="50"' \
--form 'category="6987f9c8e79bd6aaac57a0c5"' \
--form 'images=@"/C:/Users/jenab/Desktop/backend images/realmeC21.png"'
```

### Get All Category List
```
curl --location 'https://ecommerce-be-slrr.onrender.com/api/products/get-all-product' \
--header 'Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ODZmOGI4YzFhNjU1ZGM4M2I2OWZlOCIsImlhdCI6MTc3MDgwOTY0MywiZXhwIjoxNzcxNDE0NDQzfQ.KQlMg5jjCtRScjOf81nKJlc0IBFPRKpakeR1XzzAe_k' \
--data ''
```

## Cart APIs
- manage logged in user cart here by adding updating removing products into your cart

### Add To Cart 
```
curl --location 'https://ecommerce-be-slrr.onrender.com/api/cart/add-to-cart' \
--header 'Content-Type: application/json' \
--header 'Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ODZmOGI4YzFhNjU1ZGM4M2I2OWZlOCIsImlhdCI6MTc3MDgwOTY0MywiZXhwIjoxNzcxNDE0NDQzfQ.KQlMg5jjCtRScjOf81nKJlc0IBFPRKpakeR1XzzAe_k' \
--data '{
    "productId": "6987fa5ae79bd6aaac57a0ca",
    "quantity": 1
}'
```

### Get Cart
```
curl --location 'https://ecommerce-be-slrr.onrender.com/api/cart/get-cart' \
--header 'Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ODZmOGI4YzFhNjU1ZGM4M2I2OWZlOCIsImlhdCI6MTc3MDgwOTY0MywiZXhwIjoxNzcxNDE0NDQzfQ.KQlMg5jjCtRScjOf81nKJlc0IBFPRKpakeR1XzzAe_k'
```

### Update Cart
```
curl --location 'https://ecommerce-be-slrr.onrender.com/api/cart/update-cart' \
--header 'Content-Type: application/json' \
--header 'Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ODZmOGI4YzFhNjU1ZGM4M2I2OWZlOCIsImlhdCI6MTc3MDgwOTY0MywiZXhwIjoxNzcxNDE0NDQzfQ.KQlMg5jjCtRScjOf81nKJlc0IBFPRKpakeR1XzzAe_k' \
--data '{
    "productId": "6987fa5ae79bd6aaac57a0ca",
    "quantity": 1
}'
```

### Remove Item From Cart
- add the cartId at the end of the api signature
```
curl --location --request POST 'https://ecommerce-be-slrr.onrender.com/api/cart/remove/6987fa5ae79bd6aaac57a0ca' \
--data ''
```

### Clear Cart
```
curl --location --request POST 'https://ecommerce-be-slrr.onrender.com/api/cart/clear-cart' \
--header 'Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ODZmOGI4YzFhNjU1ZGM4M2I2OWZlOCIsImlhdCI6MTc3MDgwOTY0MywiZXhwIjoxNzcxNDE0NDQzfQ.KQlMg5jjCtRScjOf81nKJlc0IBFPRKpakeR1XzzAe_k'
```

## Order APIs

### Place Order
```
curl --location 'https://ecommerce-be-slrr.onrender.com/api/orders/place-order' \
--header 'Content-Type: application/json' \
--header 'Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ODZmOGI4YzFhNjU1ZGM4M2I2OWZlOCIsImlhdCI6MTc3MDgwOTY0MywiZXhwIjoxNzcxNDE0NDQzfQ.KQlMg5jjCtRScjOf81nKJlc0IBFPRKpakeR1XzzAe_k' \
--data '{
  "paymentMethod": "COD",
  "shippingAddress": "Bhubaneswar, Odisha"
}'
```

### Get Order Details
- add the order._id at the end of the API signature
```
curl --location 'https://ecommerce-be-slrr.onrender.com/api/orders/orderDetails/6989e6011e903f1ef7b35212' \
--header 'Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ODZmOGI4YzFhNjU1ZGM4M2I2OWZlOCIsImlhdCI6MTc3MDgwOTY0MywiZXhwIjoxNzcxNDE0NDQzfQ.KQlMg5jjCtRScjOf81nKJlc0IBFPRKpakeR1XzzAe_k'
```

### My Orders History
```
curl --location 'https://ecommerce-be-slrr.onrender.com/api/orders/get-myOrder' \
--header 'Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ODZmOGI4YzFhNjU1ZGM4M2I2OWZlOCIsImlhdCI6MTc3MDgwOTY0MywiZXhwIjoxNzcxNDE0NDQzfQ.KQlMg5jjCtRScjOf81nKJlc0IBFPRKpakeR1XzzAe_k'
```
