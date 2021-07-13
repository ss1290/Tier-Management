const {token} = Qs.parse(location.search,{ignoreQueryPrefix:true})

document.getElementById('add').onclick=function(){
    location.href=`/products?token=${token}`
}
document.getElementById('products').onclick=function(){
    location.href=`/all?token=${token}`
}
document.getElementById('logout').onclick = function(){
    fetch(`/logoutUser?token=${token}`).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                alert(data.error)
                if(data.error === "Please login first"){
                    return location.href = "/"
                }
                return location.href = `/profile?token=${token}`
            }
            alert(data.status)
            location.href = "/"
        })
    })
}

