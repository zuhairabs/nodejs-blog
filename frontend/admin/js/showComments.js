const posts = document.querySelector('#postfiled');
let deleteButton;

fetch(`${api}/comments`)
.then(response => response.json())
.then(data => showContacts(data))

function  showContacts(data){
    console.log(data)
   let element = `<tr>
      <th>Comment Id</th>
      <th>Post Id</th>
      <th>Created</th>
      <th>Name</th>
      <th>Comment</th>
      <th>Email</th>
      <th>Delete</th>
    </tr>
    `;

    $(data.forEach(cmt =>{
    element += `<tr> 
      <td><p>${cmt.commentId}</p></td>
      <td><p>${cmt.postId}</p></td>
      <td>${new Date(cmt.createdAt).toDateString()}</td>
      <td>${cmt.name}</td>
      <td>${cmt.comment}</td>
      <td>${cmt.email}</td>
      <td>
        <a class="btn btn-danger" href="delete.html?id=${cmt.commentId}&type=comments">Delete</a>
      </td>
      </tr>`;
     })).on('click', function(){
     console.log("ddddd")
   })
   posts.innerHTML = element;
 
}