const passwordInput=document.querySelector("#password"),passwordText=sessionStorage.getItem("password");if(passwordText){sessionStorage.removeItem("password"),passwordInput.value=passwordText,document.querySelector("#copy").dataset.clipboardText=passwordText;const e=new ClipboardJS("#copy");e.on("success",(function(){notify({type:"success",message:"Copied"})})),e.on("error",(function(){notify({type:"error",message:"Error"})}))}else location.href="index.html";document.querySelector("#toggle").addEventListener("click",(function(){"password"===passwordInput.type?passwordInput.type="text":passwordInput.type="password"}));