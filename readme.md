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
--data-raw '{
    "name": "verceltest",
    "email": "verceltest@gmail.com",
    "password": "verceltest@gmail.com"
}'
```

### Login User
```
curl --location 'https://ecommerce-be-live.vercel.app/api/auth/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "verceltest@gmail.com",
    "password": "verceltest@gmail.com"
}'
```

### Logout User
```
curl --location --request POST 'https://ecommerce-be-live.vercel.app/api/auth/logout' \
--header 'Cookie: token=<your_token>' \
--data ''
```

### Send Account Verification OTP
```
curl --location --request POST 'https://ecommerce-be-live.vercel.app/api/auth/send-verify-otp' \
--header 'Cookie: token=<your_token>' \
--data ''
```

### Verify Email with OTP
- OTP will be sent to registered email address, make sure to enter original email address only.
```
curl --location 'https://ecommerce-be-live.vercel.app/api/auth/verify-account' \
--header 'Content-Type: application/json' \
--header 'Cookie: token=<your_token>' \
--data '{
    "otp": "592368"
}'
```

### Send Reset Password OTP
```
curl --location 'https://ecommerce-be-live.vercel.app/api/auth/send-resetPassword-otp' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "your@email.com"
}'
```

### Reset Password
```
curl --location 'https://ecommerce-be-live.vercel.app/api/auth/reset-password' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "your@email.com",
    "otp": "378889",
    "newPassword": "yournewpassword"
}'
```


## Category APIs (for ADMIN use only)
- Only ADMIN can create categories. Before creating any product, first create the category if it does not exist. Use the category._id when creating a product.

### Create Category
```
curl --location 'https://ecommerce-be-live.vercel.app/api/category/create-category' \
--header 'Content-Type: application/json' \
--header 'Cookie: token=<your_admin_token>' \
--data '{
    "name": "mobile"
}'
```

### Get All Categories
```
curl --location 'https://ecommerce-be-live.vercel.app/api/category/get-all-category'
```


## Product APIs

### Create Product (Admin only)
- Only ADMIN can create products. Images are uploaded via [imagekit.io].
- Optional fields: `discountedPrice`, `subcategory`, `featured` (true/false)
```
curl --location 'https://ecommerce-be-live.vercel.app/api/products/create-product' \
--header 'Cookie: token=<your_admin_token>' \
--form 'productName="Realme C21"' \
--form 'productDescription="Best Budget Phone"' \
--form 'productPrice="10500"' \
--form 'discountedPrice="9500"' \
--form 'stock="50"' \
--form 'category="6987f9c8e79bd6aaac57a0c5"' \
--form 'subcategory="android"' \
--form 'featured="true"' \
--form 'images=@"/C:/Users/jenab/Desktop/backend images/realmeC21.png"'
```

### Get All Products
```
curl --location 'https://ecommerce-be-live.vercel.app/api/products/get-all-product' \
--header 'Cookie: token=<your_token>'
```

### Get Featured Products
- Returns products marked as featured. Optional `?limit=` query param (default 8).
```
curl --location 'https://ecommerce-be-live.vercel.app/api/products/featured'
```

```
curl --location 'https://ecommerce-be-live.vercel.app/api/products/featured?limit=4'
```

### Get Single Product
- Add the product._id at the end of the API signature.
```
curl --location 'https://ecommerce-be-live.vercel.app/api/products/6987fa5ae79bd6aaac57a0ca'
```

### Add Review to Product
- Logged in users can add one review per product. Rating is required (1-5), comment is optional.
```
curl --location 'https://ecommerce-be-live.vercel.app/api/products/6987fa5ae79bd6aaac57a0ca/add-review' \
--header 'Content-Type: application/json' \
--header 'Cookie: token=<your_token>' \
--data '{
    "rating": 4,
    "comment": "Great product, fast delivery!"
}'
```


## Cart APIs
- Manage logged in user cart by adding, updating, and removing products.

### Add To Cart
```
curl --location 'https://ecommerce-be-live.vercel.app/api/cart/add-to-cart' \
--header 'Content-Type: application/json' \
--header 'Cookie: token=<your_token>' \
--data '{
    "productId": "6987fa5ae79bd6aaac57a0ca",
    "quantity": 1
}'
```

### Get Cart
```
curl --location 'https://ecommerce-be-live.vercel.app/api/cart/get-cart' \
--header 'Cookie: token=<your_token>'
```

### Update Cart Item
```
curl --location 'https://ecommerce-be-live.vercel.app/api/cart/update-cart' \
--header 'Content-Type: application/json' \
--header 'Cookie: token=<your_token>' \
--data '{
    "productId": "6987fa5ae79bd6aaac57a0ca",
    "quantity": 3
}'
```

### Remove Item From Cart
- Add the product._id at the end of the API signature.
```
curl --location --request POST 'https://ecommerce-be-live.vercel.app/api/cart/remove/6987fa5ae79bd6aaac57a0ca' \
--header 'Cookie: token=<your_token>' \
--data ''
```

### Clear Cart
```
curl --location --request POST 'https://ecommerce-be-live.vercel.app/api/cart/clear-cart' \
--header 'Cookie: token=<your_token>'
```


## Order APIs
- Order total is auto-calculated: subtotal + 18% GST tax + ₹50 flat shipping = totalAmount.
- shippingAddress is now a structured object (all fields required).

### Place Order
```
curl --location 'https://ecommerce-be-live.vercel.app/api/orders/place-order' \
--header 'Content-Type: application/json' \
--header 'Cookie: token=<your_token>' \
--data '{
    "paymentMethod": "COD",
    "shippingAddress": {
        "fullName": "John Doe",
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
curl --location 'https://ecommerce-be-live.vercel.app/api/orders/orderDetails/6989e6011e903f1ef7b35212' \
--header 'Cookie: token=<your_token>'
```

### My Orders History
```
curl --location 'https://ecommerce-be-live.vercel.app/api/orders/get-myOrder' \
--header 'Cookie: token=<your_token>'
```

### Get All Orders (Admin only)
```
curl --location 'https://ecommerce-be-live.vercel.app/api/orders/all-orders' \
--header 'Cookie: token=<your_admin_token>'
```

### Update Order Status (Admin only)
- Add the order._id at the end of the API signature.
- Valid statuses: `placed`, `confirmed`, `shipped`, `out_for_delivery`, `cancelled`
```
curl --location --request PATCH 'https://ecommerce-be-live.vercel.app/api/orders/6989e6011e903f1ef7b35212/status' \
--header 'Content-Type: application/json' \
--header 'Cookie: token=<your_admin_token>' \
--data '{
    "orderStatus": "shipped"
}'
```
