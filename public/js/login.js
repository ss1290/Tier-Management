const loginForm=document.querySelector('#Login-form')
const Email=document.querySelector('#emailID')
const Password=document.querySelector('#pw')
loginForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const email=Email.value
    const password=Password.value
    fetch('/loginUser?email='+email+'&password='+password).then((response)=>{
        response.json().then((data)=>{
            const message=data.message
            alert(message)
            location.href=`/profile?&token=${data.token}`
        })
    })

})