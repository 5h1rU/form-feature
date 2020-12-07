### Proposed steps to develop the feature:

1. Add new API data structure with needed fields
  1.1. Research about different ways of implementation
  1.2. Define the data structure implementation
  1.3. Write the API implementation as an endpoint (/api/form)
  1.4. Expose the data
2. Implement UI based on designs
  2.1. Determine which components are needed
  2.2. Create a new page component
  2.3. Add layout
  2.4. Add components based on 2.1
  2.5. Add forms library
  2.6. Add client side interactions
    2.6.1. Multi step form login (next/back)
    2.6.2. input fields validation
3. Full Stack integration
  3.1. Add UI fetcher hook in order to call the API endpoint
4. Testing
  4.1. Unit testing
    4.1.1. verify if the form elements rendered match with the expected from the api
  4.2. E2E testing
    4.2.1. form steps verification (back/next buttons)
    4.2.2. inputs validation
  4.3 Manual testing
    4.3.1. Make sure all the flows are working
5. Release
  5.1. Deploy to Staging environment
  5.2. Notify deployment to the qa/team
  5.3. Make a pull request
  5.4. promote to production

