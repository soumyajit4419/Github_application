function loadDoc() 
{
document.getElementById("bdr").style.border="";
document.getElementById("usnm").innerHTML="";
document.getElementById("dtl").innerHTML="";
document.getElementById("img").src="";
document.getElementById("mycard").innerHTML="";
document.getElementById("hd1").innerHTML="";
document.getElementById("hd2").innerHTML="";
document.getElementById("hd3").innerHTML="";
document.getElementById("mycardhead").innerHTML="";
document.getElementById("followers").innerHTML="";
document.getElementById("following").innerHTML="";
document.getElementById("repos").innerHTML="";
  
input=document.getElementById("usr").value;
   // general detail
  var xhttp = new XMLHttpRequest();
 
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     var obj=JSON.parse(this.responseText);
     document.getElementById("bdr").style.border="solid";
     document.getElementById("usnm").innerHTML=obj.name;
     document.getElementById("dtl").innerHTML=obj.bio;
     document.getElementById("img").src=obj.avatar_url;
     document.getElementById("followers").innerHTML=obj.followers;
     document.getElementById("following").innerHTML=obj.following;
     document.getElementById("repos").innerHTML=obj.public_repos;
     document.getElementById("hd1").innerHTML="FOLLOWERS";
     document.getElementById("hd2").innerHTML="FOLLOWING";
     document.getElementById("hd3").innerHTML="REPOSITORIES";
    
     console.log(JSON.parse(this.responseText));
    }

    else if(this.readyState == 4 &&this.status==404)
    {
    alert('INVALID USER NAME');
    }
  };
  xhttp.open("GET", "https://api.github.com/users/"+input, true);
  xhttp.send();



// repos detail
  var xhttp1 = new XMLHttpRequest();

 xhttp1.onreadystatechange = function() {
   if (this.readyState == 4 && this.status == 200) {
     var obj1=JSON.parse(this.responseText);
     var i;
document.getElementById("mycardhead").innerHTML="USER REPOSITORY";
for(i in obj1)
{
var div=document.createElement("div");
div.classList.add("p-2");
div.classList.add("border");
div.classList.add("border-primary");
 
 var a=document.createElement("a");
 a.href=obj1[i].svn_url;
 a.innerHTML='&nbsp'+obj1[i].name+'&nbsp &nbsp';
 a.target="_blank";
 div.appendChild(a);
 var p=document.createElement("p");
 p.innerHTML=obj1[i].language;
 div.appendChild(p);
 document.getElementById("mycard").appendChild(div);

}
     console.log(JSON.parse(this.responseText));
   }

   };

 xhttp1.open("GET", "https://api.github.com/users/"+input+"/repos", true);
 xhttp1.send();

}