//listing of element//
document.getElementById('resumeForm')?.addEventListener('submit', function(event){
    event.preventDefault();
    //type Assertion
    const profilePictureInput = document.getElementById('profilePicture') as HTMLInputElement;
    const nameElement = document.getElementById('name') as HTMLInputElement;
    const emailElement = document.getElementById('email') as HTMLInputElement;
    const phoneElement = document.getElementById('phone') as HTMLInputElement;
    const educationElement = document.getElementById('education') as HTMLInputElement;
    const experianceElement = document.getElementById('experiance') as HTMLInputElement;
    const skillsElement = document.getElementById('skills') as HTMLInputElement;
    const usernameElement = document.getElementById('username') as HTMLInputElement;

    if(profilePictureInput && nameElement && emailElement && phoneElement && educationElement && experianceElement && skillsElement && usernameElement){


        const name = nameElement.value;
        const email = emailElement.value;
        const phone = phoneElement.value;
        const education = educationElement.value;
        const experiance = experianceElement.value;
        const skills = skillsElement.value;
        // const username = usernameElement.value;+/g
        // const uniquePath = `resumes/${username.replace(/\s, '_')}_cv.html`

        //elements of picture
    const profilePictureFile = profilePictureInput. files?.[0]
    const profilePictureURL = profilePictureFile ? URL.createObjectURL(profilePictureFile) : null;
    
      //create resume output
       const resumeOutput = `
        <h2>resume</h2>
        ${profilePictureURL ? `<img src = "${profilePictureURL}" alt="profile Picture" class="profilePicture">` : ''}
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong>${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>

        <h3>Education</h3>
        <p>${education}</p>
                             
        <h3>Experiance</h3>
        <p>${experiance}</p>

        <h3>Skills</h3>
        <p>${skills}</p>
      `;


     //resume output display
        const resumeOutputElement = document.getElementById('resumeOutput');
        if(resumeOutputElement){
             resumeOutputElement.innerHTML = resumeOutput;
             resumeOutputElement.classList.remove("hidden");
             //create a container for bottons
             const ButtonsContainer = document.createElement('div');
             ButtonsContainer.id = 'buttonsContainer';
             resumeOutputElement.appendChild(ButtonsContainer);

             const downloadButton = document.createElement('button');
             downloadButton.textContent = 'Download as PDF';
             downloadButton.addEventListener('click',  ()  => {
                 window.print();
             });
             ButtonsContainer.appendChild(downloadButton);
             //makeEditable();


             //shareable link button
             const shareLinkButton = document.createElement('button');
             shareLinkButton.textContent = 'Shareable Link';
             shareLinkButton.addEventListener('click', async () =>{
              try{
             //create a unique shareable link
             const shareableLink = `https:// yourdomain.com/resumes/${name.replace(
                /\s+/g, 
                "_"
             )}_cv.html`;

             //copy to clipboard
             await navigator.clipboard.writeText(shareableLink);
             alert('Shareable link copied to clipboard');
             }catch(error){
             console.error('Failed to copy shareable link to clipboard', error);
             alert('Failed to copy shareable link to clipboard');
             }
             });
             ButtonsContainer.appendChild(shareLinkButton);
         }else {
             console.error('resumeOutput container not found');
         }
     
    }else{
         console.error('one or more resumeOutput elements not found');
    }
});

//edit functionality
function makeEditable(){
    const editableElements = document.querySelectorAll('editable');
    editableElements.forEach(element =>{
        element.addEventListener('click', function(event){
            const currentElement = element as HTMLLinkElement;
            const currentValue = currentElement.textContent || "" ;

          //replace content
            if (currentElement.tagName === "p" || currentElement.tagName === 'SPAN'){
                  const input = document.createElement('input');
                  input.type = 'text';
                 input.value = currentValue;
                 input.classList.add('editing-input');
                 input.addEventListener('blur', function(event){
                     currentElement.style.display = 'inline';
                     currentElement.textContent = input.value;
                     input.remove();
                 })
                 currentElement.style.display = 'none';
                 currentElement.parentNode?.insertBefore(input, currentElement);
                 input.focus();
            }
        })
    })
}
