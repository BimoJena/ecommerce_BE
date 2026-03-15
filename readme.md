# Ecommerce Backend API

## Features
- User Authentication/Authorization APIs
- Product Management (admin) APIs
- Cart System APIs
- Order APIs
- Reviews & Ratings APIs

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
https://ecommerce-be-slrr.onrender.com/
```

- Live Link (deployed on vercel) use this in all curl commands
```
https://ecommerce-be-live.vercel.app/
```

# cURL for every API
- To run every single API through Command line simply


## Authentication APIs
- Create New User, Login and Logout the current User. By default registered account will be a normal user not admin, to make it admin go to mongodb database and change the role of the registered user to [admin] or contact the developer.

### Register User
```
curl --location 'https://ecommerce-be-live.vercel.app/api/auth/register' \
--header 'Content-Type: application/json' \
--header 'Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5YjZiZWIwMWYyZWE0NTJiMmQ3MDJjZCIsImlhdCI6MTc3MzU4NDA0OSwiZXhwIjoxNzc0MTg4ODQ5fQ.ZGhQMDLGpWzKWegAbRJNNv4JVQRUP7vZbW2FoZJ567Y' \
--data-raw '{
    "name": "kunal jena",
    "email": "jenabimochan33@gmail.com",
    "password": "jenabimochan33@gmail.com"
}'
```

### Login User
```
curl --location 'https://ecommerce-be-live.vercel.app/api/auth/login' \
--header 'Content-Type: application/json' \
--header 'Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5YjZiZWIwMWYyZWE0NTJiMmQ3MDJjZCIsImlhdCI6MTc3MzU4NDA4OCwiZXhwIjoxNzc0MTg4ODg4fQ.YIf6FYzwp_eUA1WlzMIfiHOtISMZc6aoeBrz-3M2h_4' \
--data-raw '{
    "email": "jenabimochan33@gmail.com",
    "password": "jenabimochan33@gmail.com"
}'
```

### Logout User
```
curl --location --request POST 'https://ecommerce-be-live.vercel.app/api/auth/logout' \
--data ''
```

### Send Account Verification OTP
```
curl --location --request POST 'https://ecommerce-be-live.vercel.app/api/auth/send-verify-otp' \
--header 'Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5YjZiZWIwMWYyZWE0NTJiMmQ3MDJjZCIsImlhdCI6MTc3MzU4NDE3MSwiZXhwIjoxNzc0MTg4OTcxfQ.pOZsYzXsPEu1LpCtEQPljaxeP-EzND87s5Z_qXvBNf0' \
--data ''
```

### Verify Email with OTP
- OTP will be sent to registered email address, make sure to enter original email address only.
```
curl --location 'https://ecommerce-be-live.vercel.app/api/auth/verify-account' \
--header 'Content-Type: application/json' \
--header 'Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5YjZiZWIwMWYyZWE0NTJiMmQ3MDJjZCIsImlhdCI6MTc3MzU4NDE3MSwiZXhwIjoxNzc0MTg4OTcxfQ.pOZsYzXsPEu1LpCtEQPljaxeP-EzND87s5Z_qXvBNf0' \
--data '{
    "otp": "650401"
}'
```

### Send Reset Password OTP
```
curl --location 'https://ecommerce-be-live.vercel.app/api/auth/send-resetPassword-otp' \
--header 'Content-Type: application/json' \
--header 'Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5YjZiZWIwMWYyZWE0NTJiMmQ3MDJjZCIsImlhdCI6MTc3MzU4NDE3MSwiZXhwIjoxNzc0MTg4OTcxfQ.pOZsYzXsPEu1LpCtEQPljaxeP-EzND87s5Z_qXvBNf0' \
--data-raw '{
    "email": "taskbimo@gmail.com"
}'
```

### Reset Password
```
curl --location 'https://ecommerce-be-live.vercel.app/api/auth/reset-password' \
--header 'Content-Type: application/json' \
--header 'Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5YjZiZWIwMWYyZWE0NTJiMmQ3MDJjZCIsImlhdCI6MTc3MzU4NDE3MSwiZXhwIjoxNzc0MTg4OTcxfQ.pOZsYzXsPEu1LpCtEQPljaxeP-EzND87s5Z_qXvBNf0' \
--data-raw '{
    "email": "taskbimo@gmail.com",
    "otp": "990256",
    "newPassword": "24MCAFSD0008"
}'
```


## Category APIs (for ADMIN use only)
- Only ADMIN can create categories. Before creating any product, first create the category if it does not exist. Use the category._id when creating a product.

### Create Category
```
curl --location 'https://ecommerce-be-live.vercel.app/api/category/create-category' \
--header 'Content-Type: application/json' \
--header 'Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5YjZiMTQ0NmQ5MDIyM2Y2Zjc4Nzg0ZSIsImlhdCI6MTc3MzU4NDU2OSwiZXhwIjoxNzc0MTg5MzY5fQ.x7ZUdjIFqj3j_LkrZnJEeuT_QVOgHswxQ2VgMP8caSw' \
--data '{
    "name": "clothes"
}'
```

### Get All Categories
```
curl --location 'https://ecommerce-be-live.vercel.app/api/category/get-all-category' \
--header 'Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5YjZiMTQ0NmQ5MDIyM2Y2Zjc4Nzg0ZSIsImlhdCI6MTc3MzU4NDU2OSwiZXhwIjoxNzc0MTg5MzY5fQ.x7ZUdjIFqj3j_LkrZnJEeuT_QVOgHswxQ2VgMP8caSw' \
--data ''
```


## Product APIs

### Create Product (Admin only)
- Only ADMIN can create products. Images are uploaded via [imagekit.io].
- Optional fields: `discountedPrice`, `subcategory`, `featured` (true/false)
```
curl --location 'https://ecommerce-be-live.vercel.app/api/products/create-product' \
--header 'Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5YjZiMTQ0NmQ5MDIyM2Y2Zjc4Nzg0ZSIsImlhdCI6MTc3MzU4NDU2OSwiZXhwIjoxNzc0MTg5MzY5fQ.x7ZUdjIFqj3j_LkrZnJEeuT_QVOgHswxQ2VgMP8caSw' \
--form 'productName="Slipper 3"' \
--form 'productDescription="Comfy Beach Wear"' \
--form 'productPrice="399"' \
--form 'stock="50"' \
--form 'category="69b6b22c6d90223f6f78785c"' \
--form 'subcategory="Beach Wear"' \
--form 'featured="true"' \
--form 'images=@"/C:/Users/jenab/Desktop/cherrypick.png"' \
--form 'discountedPrice="299"'
```

### Get All Products
```
curl --location 'https://ecommerce-be-live.vercel.app/api/products/get-all-product' \
--header 'Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5YjZiMTQ0NmQ5MDIyM2Y2Zjc4Nzg0ZSIsImlhdCI6MTc3MzU4NDU2OSwiZXhwIjoxNzc0MTg5MzY5fQ.x7ZUdjIFqj3j_LkrZnJEeuT_QVOgHswxQ2VgMP8caSw' \
--data ''
```

### Get Featured Products
- Returns products marked as featured. Optional `?limit=` query param (default 8).
```
curl --location 'https://ecommerce-be-live.vercel.app/api/products/featured' \
--header 'Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5YjZiMTQ0NmQ5MDIyM2Y2Zjc4Nzg0ZSIsImlhdCI6MTc3MzU4NDU2OSwiZXhwIjoxNzc0MTg5MzY5fQ.x7ZUdjIFqj3j_LkrZnJEeuT_QVOgHswxQ2VgMP8caSw' \
--data ''
```
- optional with limit
```
curl --location 'https://ecommerce-be-live.vercel.app/api/products/featured?limit=4' \
--header 'Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5YjZiMTQ0NmQ5MDIyM2Y2Zjc4Nzg0ZSIsImlhdCI6MTc3MzU4NDU2OSwiZXhwIjoxNzc0MTg5MzY5fQ.x7ZUdjIFqj3j_LkrZnJEeuT_QVOgHswxQ2VgMP8caSw'
```

### Get Single Product
- Add the product._id at the end of the API signature.
```
curl --location 'https://ecommerce-be-live.vercel.app/api/products/6987fa5ae79bd6aaac57a0ca' \
--header 'Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5YjZiMTQ0NmQ5MDIyM2Y2Zjc4Nzg0ZSIsImlhdCI6MTc3MzU4NDU2OSwiZXhwIjoxNzc0MTg5MzY5fQ.x7ZUdjIFqj3j_LkrZnJEeuT_QVOgHswxQ2VgMP8caSw'
```

### Add Review to Product
- Logged in users can add one review per product. Rating is required (1-5), comment is optional.
```
curl --location 'https://ecommerce-be-live.vercel.app/api/products/69b6c1071f2ea452b2d702e5/add-review' \
--header 'Content-Type: application/json' \
--header 'Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5YjZiMTQ0NmQ5MDIyM2Y2Zjc4Nzg0ZSIsImlhdCI6MTc3MzU4NDU2OSwiZXhwIjoxNzc0MTg5MzY5fQ.x7ZUdjIFqj3j_LkrZnJEeuT_QVOgHswxQ2VgMP8caSw' \
--data '{
    "rating": 4,
    "comment": "Great comfort"
}'
```


## Cart APIs
- Manage logged in user cart by adding, updating, and removing products.

### Add To Cart
```
curl --location 'https://ecommerce-be-live.vercel.app/api/cart/add-to-cart' \
--header 'Content-Type: application/json' \
--header 'Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5YjZiMTQ0NmQ5MDIyM2Y2Zjc4Nzg0ZSIsImlhdCI6MTc3MzU4NDU2OSwiZXhwIjoxNzc0MTg5MzY5fQ.x7ZUdjIFqj3j_LkrZnJEeuT_QVOgHswxQ2VgMP8caSw' \
--data '{
    "productId": "69b6b41e6d90223f6f78786c",
    "quantity": 4
}'
```

### Get Cart
```
curl --location 'https://ecommerce-be-live.vercel.app/api/cart/get-cart' \
--header 'Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5YjZiMTQ0NmQ5MDIyM2Y2Zjc4Nzg0ZSIsImlhdCI6MTc3MzU4NDU2OSwiZXhwIjoxNzc0MTg5MzY5fQ.x7ZUdjIFqj3j_LkrZnJEeuT_QVOgHswxQ2VgMP8caSw'
```

### Update Cart Item
```
curl --location 'https://ecommerce-be-live.vercel.app/api/cart/update-cart' \
--header 'Content-Type: application/json' \
--header 'Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5YjZiMTQ0NmQ5MDIyM2Y2Zjc4Nzg0ZSIsImlhdCI6MTc3MzU4NDU2OSwiZXhwIjoxNzc0MTg5MzY5fQ.x7ZUdjIFqj3j_LkrZnJEeuT_QVOgHswxQ2VgMP8caSw' \
--data '{
    "productId": "69b6b41e6d90223f6f78786c",
    "quantity": 11
}'
```

### Remove Item From Cart
- Add the product._id at the end of the API signature.
```
curl --location --request POST 'https://ecommerce-be-live.vercel.app/api/cart/remove/69b6b3976d90223f6f787862' \
--header 'Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5YjZiMTQ0NmQ5MDIyM2Y2Zjc4Nzg0ZSIsImlhdCI6MTc3MzU4NDU2OSwiZXhwIjoxNzc0MTg5MzY5fQ.x7ZUdjIFqj3j_LkrZnJEeuT_QVOgHswxQ2VgMP8caSw' \
--data ''
```

### Clear Cart
```
curl --location --request POST 'https://ecommerce-be-live.vercel.app/api/cart/clear-cart' \
--header 'Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5YjZiMTQ0NmQ5MDIyM2Y2Zjc4Nzg0ZSIsImlhdCI6MTc3MzU4NDU2OSwiZXhwIjoxNzc0MTg5MzY5fQ.x7ZUdjIFqj3j_LkrZnJEeuT_QVOgHswxQ2VgMP8caSw'
```


## Order APIs
- Order total is auto-calculated: subtotal + 18% GST tax + ₹50 flat shipping = totalAmount.
- shippingAddress is now a structured object (all fields required).

### Place Order
```
curl --location 'https://ecommerce-be-live.vercel.app/api/orders/place-order' \
--header 'Content-Type: application/json' \
--header 'Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5YjZiMTQ0NmQ5MDIyM2Y2Zjc4Nzg0ZSIsImlhdCI6MTc3MzU4NDU2OSwiZXhwIjoxNzc0MTg5MzY5fQ.x7ZUdjIFqj3j_LkrZnJEeuT_QVOgHswxQ2VgMP8caSw' \
--data '{
    "paymentMethod": "COD",
    "shippingAddress": {
        "fullName": "Bimochan Jena",
        "addressLine1": "123 Main Street",
        "city": "Mumbai",
        "state": "Maharashtra",
        "postalCode": "400001",
        "country": "India",
        "phone": "9999999999"
    }
}'
```

### Get Order Details
- Add the order._id at the end of the API signature.
```
curl --location 'https://ecommerce-be-live.vercel.app/api/orders/orderDetails/69b6ba8a8b579bc386c9ae73' \
--header 'Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5YjZiMTQ0NmQ5MDIyM2Y2Zjc4Nzg0ZSIsImlhdCI6MTc3MzU4NDU2OSwiZXhwIjoxNzc0MTg5MzY5fQ.x7ZUdjIFqj3j_LkrZnJEeuT_QVOgHswxQ2VgMP8caSw'
```

### My Orders History
```
curl --location 'https://ecommerce-be-live.vercel.app/api/orders/get-myOrder' \
--header 'Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5YjZiMTQ0NmQ5MDIyM2Y2Zjc4Nzg0ZSIsImlhdCI6MTc3MzU4NDU2OSwiZXhwIjoxNzc0MTg5MzY5fQ.x7ZUdjIFqj3j_LkrZnJEeuT_QVOgHswxQ2VgMP8caSw'
```

### Get All Orders (Admin only)
```
curl --location 'https://ecommerce-be-live.vercel.app/api/orders/all-orders' \
--header 'Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5YjZiMTQ0NmQ5MDIyM2Y2Zjc4Nzg0ZSIsImlhdCI6MTc3MzU4NDU2OSwiZXhwIjoxNzc0MTg5MzY5fQ.x7ZUdjIFqj3j_LkrZnJEeuT_QVOgHswxQ2VgMP8caSw'
```

### Update Order Status (Admin only)
- Add the order._id at the end of the API signature.
- Valid statuses: `placed`, `confirmed`, `shipped`, `out_for_delivery`, `cancelled`
```
curl --location --request PATCH 'https://ecommerce-be-live.vercel.app/api/orders/69b6ba8a8b579bc386c9ae73/status' \
--header 'Content-Type: application/json' \
--header 'Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5YjZiMTQ0NmQ5MDIyM2Y2Zjc4Nzg0ZSIsImlhdCI6MTc3MzU4NDU2OSwiZXhwIjoxNzc0MTg5MzY5fQ.x7ZUdjIFqj3j_LkrZnJEeuT_QVOgHswxQ2VgMP8caSw' \
--data '{
    "orderStatus": "shipped"
}'
```
