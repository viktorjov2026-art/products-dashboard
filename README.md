# Products Dashboard

A React dashboard for managing and exploring products using the [DummyJSON API](https://dummyjson.com/).

## Features

- Product table with product information
- Pagination
- Debounced product search
- Date filtering
- Sorting by price, rating, and stock
- KPI cards:
  - Total Products
  - Average Price
  - Average Rating
  - Total Stock
  - Low Stock

- Product details
- URL state persistence for search, filters, sorting, and page
- Loading, error, and empty states
- Responsive dashboard layout

## Technologies

- React
- Vite
- JavaScript
- CSS
- DummyJSON API

## Getting Started

Clone the repository and install the dependencies:

npm install

Start the development server:

npm run dev

Then open the local URL shown in the terminal.

## Build

To create a production build:

npm run build

## Approach

The application is structured into reusable React components with shared product state managed through React Context.

API requests are handled through React effects and the dashboard state controls search, filtering, pagination, sorting, and product details. Search requests use a debounce to avoid unnecessary API calls while typing.

KPI data is fetched separately so that aggregate values reflect the current search and date filters.
