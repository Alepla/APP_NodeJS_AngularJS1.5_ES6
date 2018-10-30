//HOME
Slider builded with component.
Infinite Scroll.
GraphQL with aggregate function.
Most popular sectors and after selecting one goes to the list and filters by sector.
Toatr in all the app.

//PROJECTS
List with pagination and the projects are selected from mongodb using graphQL, the first mediafile that you select in the create is the file that is showed first, and there are two tipes of projects, the projects that show the time left for themto finisha nd the projects that show the money that is missing to be completed.

Once inside the details of a product you can invest in or help with code, if you select the option to invest the stripe application is opened to be able to pay, if it is not logged in it will be redirected directly to the login and if it is logged and a valid credit card is entered, the money goal bar is auto-incremented. And the slider show you the mediafiles uplodaded.

Search with autocomplete and filter.

//CONTACT
Is a form created with components, using mailgun.

//LOGIN
Once inside the login you have the option to login manually or through social login with gmail or github, there are two options, the register and the login in one html in ng-if that depending the layout it shows you one or the other. In the register if you can't write correctly some field ngMessages show you the error.
In the login if you are a admin the app redirect you to the adminpanel else redirect you to the home. I load html dynamically from javascript in the layout using ngSanitize.

//NEW PROJECT
In this view you can create a new project, you can upload an images and videos add rewards with a form shown in a modal(minimum three). When you upload an images you have a preview of that, you have a maximum of five files, and clicking in one of this you can delete the file selected. You can create a monthly project or a normal project. You can create an aids, for the users help you with code.

//ADMIN PANEL
The admin panel is a crud that allows only a users with type admin access it, the admin can delete update and read the info from the other users and from the projects in the DB. The admin panel have a paginator.

//PROFILE
In the profile you can update or see youre projects, see the projects in which you have participated, the suscribed projects, youre aids, and the projects in which you have aided. And you can logout.
