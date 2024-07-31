import { useState , useEffect } from "react";
import "./App.css"
function App() {
  const API_URL = "https://jsonplaceholder.typicode.com/";
  const [currentPage , setCurrentPage] = useState([])
  const [pageName , setPageName] = useState('')

  useEffect(() => {
    async function initialFetch() {
      try {
        const reqUrl = `${API_URL}users`;
        const response = await fetch(reqUrl);
        if (!response.ok) throw Error("Couldn't fetch users");
        response.json().then((users) => setCurrentPage(users));
        setPageName("Users");
      } catch (err) {
        console.log(err);
      }
    }
    initialFetch();
  } , [])
    return(
      <div className="app">
         <Buttons  
         url = {API_URL}
         setPage = {setCurrentPage} 
         pageName = {pageName}
         setPageName={setPageName}  />

         <DisplayDetails 
          page = {currentPage}
          pageName = {pageName} />

      </div>
    )
}

const Buttons = ({url ,setPage , pageName , setPageName}) => {
  async function handleUsers(){
      try{
         const reqUrl = `${url}users`
         const response = await fetch(reqUrl)
         if(!response.ok) throw Error ("Couldn't fetch users")
        response.json()
        .then((users) => setPage(users))
         setPageName("Users")
      }
      catch(err){
         console.log(err)
      }
  }

   async function handlePosts() {
     try {
       const reqUrl = `${url}posts`;
       const response = await fetch(reqUrl);
       if (!response.ok) throw Error("Couldn't fetch users");
       response.json().then((posts) => setPage(posts));
       setPageName("Posts");
     } catch (err) {
       console.log(err);
     }
   }

   async function handleComments() {
     try {
       const reqUrl = `${url}comments`;
       const response = await fetch(reqUrl);
       if (!response.ok) throw Error("Couldn't fetch users");
       response.json().then((comments) => setPage(comments));
       setPageName("Comments");
     } catch (err) {
       console.log(err);
     }
   }

   function backgroundStyling(page){
     
    return pageName.toLowerCase() === page.toLowerCase() ? { background : "black",
      color : "White"} : {background : "white",
        color : "black"}
    }
      
  return (
    <header>
      <button type = "button" onClick = {()=> {handleUsers()}}  style={backgroundStyling("users")}> Users </button>
      <button type = "button" onClick = {() => {handlePosts()}} style={backgroundStyling("posts")}> Posts </button>
      <button type = "button" onClick = {() => handleComments()} style={backgroundStyling("comments")}> Comments</button>
    </header>
  );
}

const DisplayDetails = ({page , pageName}) => {
  return (
    <ul>
        <h1> {pageName} </h1>
        {
          page.map(detail => (
            <li  key = {detail.id}>
               {JSON.stringify(detail)}
            </li>
          ))
        }
    </ul>
  )
}
export default App;
