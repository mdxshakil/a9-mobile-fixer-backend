# iRepair - A mobile fixing service provider application

This project is a web application for providing mobile phone repairing services. It consists of total 3 types of user

- Super admin
- Admin
- User

#### Super Admin Email: superadmin@gmail.com
#### Pass: Qw1111

#### Admin Email: admin@gmail.com
#### Pass: Qw1111


### Tech stack:

- React
- Redux
- Prisma
- Postgresql

## Super Admin

- Can add new admin users to the system.
- Manage admin roles.
- Update own profile

## Admin

- Has access to a centralized dashboard to monitor and manage website activities.
- Admins can add, edit, and manage user accounts.
- Admins can add, edit, and remove service listings.
- View and manage booking requests.
- Admins can accept, reject, or adjust schedules as needed.
- Control website content, including blog posts and FAQs.
- Manage their profiles.

## User

- Can register with a valid email address.

- Users must log in to access their accounts.
- Users can create and manage their profiles.
- Users can view and edit their profiles easily.
- Users can browse available services.
- Search services by name and category.
- Filter services by price range.
- Users can select services and choose available dates for booking(if applicable).
- Users able to track the status of their bookings.
- Users can leave reviews and ratings for services they have booked.
- Reviews and ratings displayed on service listings.
- A notifications center where users receive booking status notification.
- Booking history and statuses.
- Users should have the option to cancel bookings if necessary.
- Feedback forms for users to submit comments and suggestions.

live link: [iRepair](https://a9-mobile-fix-service.netlify.app)

## Entity Relation Digram

![iRepair](https://res.cloudinary.com/dwogefm7f/image/upload/v1698722117/a9-requirement-analysis.drawio_xgeu8l.png)

## Application Routes

### Auth

- api/v1/auth/signup (POST)
- api/v1/auth/login (POST)
- api/v1/auth/persist-login (GET)

### Profile

- api/v1/profile/get-profile/:profileId (POST)
- api/v1/profile/get-users (GET)
- api/v1/profile/get-all-users (GET)
- api/v1/profile/edit-profile/:profileId (PATCH)
- api/v1/profile/change-user-role (PATCH)
- api/v1/profile/delete-user (DELETE)

### User

- api/v1/user/get-user/:userId (GET)
- api/v1/user/edit-user-email/:userId (PATCH)

### Blog

- api/v1/blog/add-new-blog (POST)
- api/v1/blog/get-all-blogs (GET)
- api/v1/blog/get-latest-blogs (GET)
- api/v1/blog/:blogId (GET)
- api/v1/blog/:blogId (DELETE)
- api/v1/blog/:blogId (PATCH)

### Faq

- api/v1/faq/add-new-faq (POST)
- api/v1/blog/get-all-faqs (GET)
- api/v1/blog/:faqId (GET)
- api/v1/blog/:faqId (DELETE)
- api/v1/blog/:faqId (PATCH)

### Service

- api/v1/service/add-new-service (POST)
- api/v1/service/get-all-service (GET)
- api/v1/service/get-upcoming-services(GET)
- api/v1/service/get-homepage-services (GET)
- api/v1/service/get-dashboard-services (GET)
- api/v1/service/:serviceId (GET)
- api/v1/service/:serviceId (DELETE)
- api/v1/service/:serviceId (PATCH)

### Cart

- api/v1/cart/add-to-cart (POST)
- api/v1/cart/remove-from-cart/:itemId (DELETE)
- api/v1/cart/get-my-cart/:profileId (GET)
- api/v1/cart/get-cart-item/:cartItemId (GET)

### Booking

- api/v1/booking/check-remaining-slots (GET)
- api/v1/booking/confirm-booking (POST)
- api/v1/booking/my-bookings/:profileId (GET)
- api/v1/booking/get-all-bookings (GET)
- api/v1/booking/update-booking-status (PATCH)
- api/v1/booking/single-booking-info (GET)
- api/v1/booking/check-service-purchase (GET)
- api/v1/booking/cancel-booking/:bookingId (DELETE)

### Notification

- api/v1/notification/get-my-notification/:profileId (GET)

### Review

- api/v1/review/add-review (POST)
- api/v1/review/:serviceId (GET)

### Rating

- api/v1/rating/add-rating (POST)
- api/v1/rating/check-rating-status (GET)
- api/v1/rating/get-service-rating/:serviceId (GET)

### Feedback

- api/v1/feedback/add-feedback (POST)
- api/v1/feedback/get-all-feedback (GET)

### Testimonial

- api/v1/testimonial/add-testimonial (POST)
- api/v1/testimonial/get-all-testimonial (GET)
- api/v1/testimonial/:testimonialId (DELETE)
- api/v1/testimonial/:testimonialId (PATCH)
- api/v1/testimonial/get-approved-testimonial (GET)

### Stat

- api/v1/stat (GET)

### Event

- api/v1/event/create-event (POST)
- api/v1/event/ (GET)
- api/v1/event/upcoming-events (GET)
- api/v1/event/:eventId (DELETE)
- api/v1/event/:eventId (PATCH)
