# squarepack
E-commerce website
## How to use the API  
There are 18 routes in total that performs different operations which defines how an ecommerce website works. 
### Admin routes:
##### 1. Api to Login (admin)
method: POST   
route: `/admin/login`  
###### req.body:  
`adminId: admin@squarepack.com`
`key: 333-666-999`  

##### 2. Api to logout (admin) 
method: POST  
route: `/admin/logout`  

##### 3. Api to add product to the database 
method: POST  
route: `/admin/add-product`  
###### req.body: 
Attributes for the body parameter are different for different categories of products. so please checkout the models accordingly. 
###### req.query: 
cat (category of the product),  
subcat (sub-category of the product),  
example: cat=electronics&subcat=mobiles

##### 4. edit product 
method: POST  
route: `/admin/edit-product`  
###### req.body: 
Depends on the product that is to be edited. Please checkout the models accordingly. 
###### req.query: 
id (_id of the product that is to be edited),  
cat (category of the product),  
subcat (sub-category of the product)

##### 5. delete product 
method: POST  
route: `/admin/delete-product`  
###### req.query: 
id (_id of the product that is to be edited),  
cat (category of the product),  
subcat (sub-category of the product) 

### Routes for both user and Admin 
##### 6. Get all products 
method: GET  
route: `/all-products`  or  `/admin/all-products` 

##### 7. Get products by category 
method: GET  
route: `/product-by-category`  or   `/admin/product-by-category` 
###### req.query: 
cat (category)  
example: cat=electronics  

##### 8. Get categories available 
method: GET  
route: `/get-categories`  or  `/admin/get-categories`  

### User routes 
##### 9. signup 
method: POST  
route: `/signup`  
###### req.body: 
firstname, 
lastname, 
email, 
phone, 
password  

##### 10. login 
method: POST  
route: `/login`  
###### req.body: 
email (registered email),  
password (registered password)  

##### 11. logout 
method: POST  
route: `/logout`  

##### 12. add product to cart 
method: POST  
route: `add-to-cart`  
##### req.query: 
id (_id of the product),  
cat (category of the product),  
subcat (sub-category of the product)  

##### 13. Get all the cart contents 
method: GET  
route: `/get-cart`  

##### 14. clear the cart contents 
method: POST  
route: `/clear-cart`  

##### 15. order a product from cart 
method: POST  
route: `/order-from-cart`  
###### req.query: 
id (_id of the cart object of the product)  
NOTE: id is not the product's id.  

### Password recovery system 
There are three steps involved in recovering password:
1. `/password-recovery`

  In this step, registered email of the account to be recovered is sent through body parameters.
  This set a cookie called otpToken which will expire in 10 minutes.
  check your email (in this case, as I do not have access to mail server, I have done this using ethereal.email).

  Login to [ https://ethereal.email ] with following credentails and go to the messages section:  
    user: 'rcwkybo22n7vfqiv@ethereal.email',  
    pass: 'T7rDp5egTezqN1czM3'   
  There in the messages section you will find the email sent by the app.
  copy the otp and follow the second step.

2. `/verify-otp`

  In this step, send copied otp through body parameters with 'otp' attribute. After the otp is verified follow step 3

3. `/reset-password`
 
  In this step, send a new password through body parameters using 'new_password' attribute

#### Routes for the password recovery system 
##### 16. send otp through mail for password recovery 
method: POST  
route: `/password-recovery`  
###### req.body: 
email (registered email)  

##### 17. Route to verify OTP 
method: POST  
route: `/verify-otp`  
###### req.body: 
otp (otp from mail)  

##### 18. Route to set a new password 
method: POST  
route: `/reset-password`  
###### req.body: 
new_password (to set a new password)  

