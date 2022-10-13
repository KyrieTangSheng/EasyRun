# API documentation

## Response definition

### Response for valid request

  ```json
  {
  "status": 1,
  “code”: 100,
  "data": "<requested data>"
}
  ```

### Response for invalid request

  ```json
  {
  "status": 0,
  "code": "<error code>",
  "msg": "<reason for invalid request>"
}
  ```

  ```json
  {
  "status": 0,
  "code": "<error code>",
  "msg": "<reason for invalid request>"
}
  ```

## API list

### `./index: index page

* `./index`: index page
    * Method `GET`: index page
        * Request: null

        * Response
            * `data` null                
        * Error code: null  


### `./account`: 

* `./account/student/register`: student register
    * Method `POST`
        * Request
            * `email`*: String
            * `username`*: String
            * `phoneNumber`*: long
            * `firstName`*: String
            * `lastName`*: String
            * `pwd`*: String
            * `underGradSchool`*: String
            * `overallGPA`*: Float
            * `toeflScore`*: Integer
            * `GREScore`*: Integer
            * `researchExp`*: String
            * `internExp`*: String
            * `majorGPA`*: Float

        * Response
            * `data`
                * Student Type
        * Error code
            * `001`: Email taken

* `./account/instructor/register`: instructor register
    * Method `GET`
        * Request: None
        * Response
            * `data`
                * List<Institution> Type
        * Error code: None
    * Method `POST`
        * Request
	*`email`: String
	*`phoneNumber`: Long
	*`institutionName`: String
	*`firstName`: String
	*`lastName`: String
	*`pwd`: String
	*`education`: String         
        * Response
            * `data`
                * Instructor Type
        * Error code
            * `001`: Email taken
	* `002`: Institution Not Exist

* `./account/student/login`: student log in
    * Method `POST`
        * Request
	*`email`: String
	*`pwd`: String
        * Response
            * `data`: 
	    *Student Type
        * Error code
            * `002`: Incorrect password
            * `003`: Email not registered
	
*`./account/student/updateProfile`: student update profile
    *Method `POST`
        *Request
            * `email`*: String
            * `username`*: String
            * `phoneNumber`*: long
            * `firstName`*: String
            * `lastName`*: String
            * `pwd`*: String
            * `underGradSchool`*: String
            * `overallGPA`*: Float
            * `toeflScore`*: Integer
            * `GREScore`*: Integer
            * `researchExp`*: String
            * `internExp`*: String
            * `majorGPA`*: Float
        * Response
            * `data`
                * Student Type
        * Error code
	*`001`: Email Taken

* `./account/instructor/login`: staff log in
    * Method `POST`
        * Request
            * `email`*: String, the email staff used to register
            * `pwd*: String, user's password
        * Response
            * `data`
                * Instructor Type
        * Error code
            * `002`: Incorrect password
            * `003`: Email not registered

*`./account/instructor/updateProfile`: instructor update profile
    *Method `GET`
        *Request: None
        *Response
	* `data`
                * List<Institution> Type
	* Error code: None	
    *Method `POST`
        *Request
            *`email`: String
	*`phoneNumber`: Long
	*`institutionName`: String
	*`firstName`: String
	*`lastName`: String
	*`pwd`: String
	*`education`: String
        * Response
            * `data`
                * Instructor Type
        * Error code
	*`001`: Email Taken


### `./homepage`: 
* `./homepage/student/viewStars`: student view starred program
    * Method `POST`
        * Request
            * `studentId`*: Long
        * Response
            * `data`: List<Program> Type (nullable)
        * Error code
            * None

* `./homepage/student/viewContract`: check contract
    * Method `GET`
        * Request: 
* `studentId`*: Long
        * Response
            * `data`: List<Contract> Type (nullable)
        *Error Code: None

* `./homepage/instructor/viewEnrolledStudent`: check all student in the institution
    * Method `GET`
        * Request: 
* `institutionId`*: Long
        * Response
            * `data`: List<Student> Type (nullable)
        *Error Code: None

* `./homepage/instructor/prepareContract`: send a contract to the student
    * Method `GET`
        * Request: 
 None
        * Response
            * `data`: List<String> Type (all registered students’ email)
        *Error Code: None

* `./homepage/instructor/viewInstitutionInfo`: view the information of the institution
    * Method `GET`
        * Request: 
 *`institutionName`:String
        * Response
            * `data`: Institution Type 
        *Error Code: None


* `./homepage/viewPrograms`
    * Method: `GET`: view all the programs
        * Request 
	*`schoolName`: String,
	*`programName`: String

        * Response
            * `data`: List<Program> Type
        * Error code: None



* `./homepage/viewPrograms/viewSpecificProgram/{programId}`
    * Method: `Get`: view specific program
        * Request         
* `programId`: Long
        * Response
            * `data`: 
	    *Program Type
	    *Boolean (starred or not)
        * Error code: None

    * Method: `POST`: star the program
        * Request          
* `studentId`: Long
* `programId`: Long
        * Response
            * `data`: Star type
        * Error code: None
    
    *Method: `DELETE`: cancel starring the program
        * Request
* `studentId`: Long
* `programId`: Long
        * Response: None

* `./homepage/viewPrograms/viewSpecificSchool`
    * Method: `Get`: view specific school page
        * Request    
*`schoolName`: String       
        * Response
            * `data`: 
	    * List<Program> Type
        * Error code: None
		
* `./homepage/viewInstitutions`
    * Method: `GET`: view selected institutions
        * Request: 
	*`name`: String
        * Response
            * `data`: List<Institution> Type
        * Error code: None

* `./homepage/viewSpecificInstitution/{institutionName}`
    * Method: `GET`: view specific institution
        * Request: 
	*`institutionName`: String
	*`studentId`: Long,  if(studentId==0) {the user is not logged-in student}
        * Response
            * `data`: 
    *`institution`: Institution Type
    *`ratings`: List<Float> Type
    *`comments`: List<Comment> Type
    *`ratable`: Boolean
        * Error code: None

*`./homepage/viewSpecificInstitution/rateInstitution
    * Method: `POST`: post ratings
       * Request: 
	*`institutionId`: String
	*`studentUserName`: String
	*`criteriaRating1`: Integer
	*`criteriaRating2`: Integer
	*`criteriaRating3`: Integer
	*`criteriaRating4`: Integer
	*`criteriaRating5`: Integer
	*`criteriaRating6`: Integer
	*`review`: String
	*`datatime`: String (format: “2022-11-03T14:22:01”) 
        * Response
            * `data`: Rating Type
        * Error code: None

*`./homepage/viewSpecificInstitution/commentRating
    * Method: `POST`: comment rating
       * Request: 
	*`institutionId`: String
	*`ratingid`: integer
	*`raterName`: String 
	*`replierName`: String 
	*`content`: String
	*`datatime`: String (format: “2022-11-03T14:22:01”) 

        * Response
            * `data`: Track Type
        * Error code: None
 




* `./homepage/viewSpecificInsitution/viewTeam/{insitutionName}`
    *Method: `GET`: view all the team members of the institution
        *Request:
	* `institutionName`: String
        *Response
	*`data`: List<Instructor> Type
	*Error Code: None
	    



* `./uploadApplicationResult/chooseProgram`
    *Method: `GET`: 
        *Request: 
*`schoolName`: String,
	*`programName`: String
        *Response
	*`data`: List<Program> Type
	*Error Code: None
    *Method: `POST`: upload the program info
        *Request:
	* `programId`: String
        *Response
	*`data`: Program Type
        *Error Code: None





* `./uploadApplicationResult/uploadPersonalInfo`
    *Method: ‘GET’:
        *Request: None
        *Response: 
	*`data`: List <Institution> Type


	
    *Method: `POST`: upload personal info
        *Request:
	* `programId`: String
	*`studentId`: String
	*`instructorName`: String nullable 
	*`institutionName`: String nullable (Choose from given names, no need for check)
	*`status`: Boolean (success or fail)
        *Response
	*`data`: Application Type
        *Error Code: None
