const signupForm=document.querySelector('#signupForm')
const Email=document.querySelector('#email')
const Password=document.querySelector('#password')
const Name=document.querySelector('#name')
signupForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const email=Email.value
    const password=Password.value
    const name=Name.value
    fetch('/signupUser?name='+name+'&email='+email+'&password='+password).then((response)=>{
        response.json().then((data)=>{
            const message=data.message
            alert(message)
            location.href=`/profile?&token=${data.token}`
        })
    })
})