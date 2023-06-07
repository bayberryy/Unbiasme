// const jsonData = {
//     username : "bayberryy21",
//     email : "bayberryy21@yahoo.com",
//     password : "12345678QWer!"
// }

// elements
const $signupForm = document.querySelector('#signup-form')
const $signupFormButton = $signupForm.querySelector('button')


$signupForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const $signupUsername = document.querySelector('#signup-username').value
    const $signupEmail = document.querySelector('#signup-email').value
    const $signupPassword = document.querySelector('#signup-password').value
    
    const jsonData = {
        username: $signupUsername,
        email: $signupEmail,
        password: $signupPassword
    }

    console.log(jsonData)

    if (true) {
        fetch('/signup', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData)
          })
            .then( (response) => {
                response.json().then((data) => {
                    if (data.error) {
                        console.log(data.error)
                    } else{
                        console.log(data)
                        // window.location.href = '/home';
                    }
                })
            })
            .catch(error => {
              // Handle network error
              console.error('An error occurred:', error);
            });
        
        }
})

