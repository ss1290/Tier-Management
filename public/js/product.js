const {token}=Qs.parse(location.search,{ignoreQueryPrefix:true})
const message1=document.querySelector('#name')
const message2=document.querySelector('#cost')
const productForm=document.querySelector('#products')
const productName=document.querySelector('#productName')
const productCost=document.querySelector('#productCost')

productForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const name=productName.value
    const cost=productCost.value

    fetch(`/add?token=${token}&productName=${name}&productCost=${cost}`).then((response)=>{
        response.json().then((data)=>{
            message1.textContent='Product Name: '+data.productName
            message2.textContent='Product Cost: '+data.productCost
        })
    })
})
document.getElementById('profile').onclick=function(){
    location.href=`/profile?&token=${token}`
}





