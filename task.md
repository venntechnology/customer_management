Description:

Our Customer Service Reps need the ability add Notes to a specific Customer during the process of communicating and/or servicing the customer so that future reps have a frame of reference for later service touchpoints. There are different types of access levels, however, so we do not want all users to be able to edit or delete notes made by others and should be scoped down to the access level they have due to certain regulations.

This should be done in a way that makes it easy to manage all within the customer view page and we need to the ability to manage these across 

Acceptance Criteria:
- [ ] Notes appear in the Customer Show Page
- [ ] Notes section are a dynamic list component that uses Stimulus to allow for adding unlimited notes withing the Customer Show Page
- [ ] Notes are displayed in reverse chronological order
- [ ] Notes are displayed with the User's name and the date they were created along with their message
- [ ] Notes from all Users are accessible by Advanced Users
- [ ] Notes from all Users are accessible by Admins Users
- [ ] Notes from all Usersare accessible by Basic Users
- [ ] Basic Users cannot delete or edit any but their own
- [ ] Advanced users cannot delete any but their own
- [ ] Utilizes the current authorization system to determine who can see what notes
- [ ] Unit Tests and request specs are written for the Notes feature
