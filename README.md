## Please install the Expo Go app from the app store

Clone the repository

```
$ git clone https://github.com/jamibear/pick-n-go.git pickngo
```

Go to client directory which is the entry point of the app

```
$ cd pickngo/client/
```

Setting up Expo

```
$ npm install
```

Start the expo server and scan QR code using the Expo Go app

```
$ npx expo start
```

#TODOS

## user screens

- add a hero section image on user home screen
- add padding on confirm checkout screen and show address
- search bar
- filter products by category
- feature to review products
- add category cards on user's home dashboard
- add a feed section for browsing farmer updates
- allow following users
- group cart items by seller using reduce method

## farmer screens

- add a selection of categories in creating a new product
- fix on pending orders tab from orders screen
- add more content on dashboard
- feature to upload image with caption that users can see on their feed
- revamp product list screen

## admin

- show total sales, top sellers, top products
- show total product shipped
- search bar

## order management

- add drop off points
- show complete address
- need a more definitive list of order status (e.g. 'shipping', 'recieved', 'pending')

## database

- add new table for product reviews
- add new table for followed users
- need a definitive list of product categories
