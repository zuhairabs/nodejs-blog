const posts = document.querySelector('#postfiled');
let deleteButton;

fetch(`${api}/posts`)
.then(response => response.json())
.then(data => showContacts(data))

function  showContacts(data){
   let element = `<tr>
   <th>Image</th>
      <th>Title</th>
      <th>Created</th>
      <th>Action</th>
    </tr>
    `;

    $(data.forEach(post =>{
    element += `<tr> 
      <td><img src="${post.media}" width="150px" /></td>
      <td>${post.title}</td>
      <td>${new Date(post.createdAt).toDateString()}</td>
      <td>
        <a class="btn btn-default" href="edit.html?id=${post.postId}&type=post">Edit</a> 
        <a class="btn btn-danger" href="delete.html?id=${post.postId}&type=post" value="${post.postId}" id="delete">Delete</a>
      </td>
      </tr>`;
     })).on('click', function(){
     console.log("ddddd")
   })
   posts.innerHTML = element;
 
}