document.addEventListener("DOMContentLoaded", () => {
   if (!booksWorker) {
       console.log("booksWorker is required!");
       return;
   }

   document.forms.addBook.onsubmit = () => {
       booksWorker.put(new FormData(document.forms.addBook), (response, request) => {
           if (request.status === 200 && response.id !== undefined)
               window.location = `/books/${response.id}`;
           else if (request.status === 401) {
               showLogin();
           }
           else {
               alert(response.error || "Unknown error");
               console.log(response);
           }
       });
       return false;
   }
});