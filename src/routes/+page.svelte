<script>
    import { auth, googleProvider } from '$lib/firebase.js'
    import { signInWithPopup } from 'firebase/auth';
    import { goto } from '$app/navigation';

    let currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

    function LoginWithGoogle() {
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                // You can access the Google user info here
                const user = result.user;
                // Redirect to /dashboard
                goto('/dashboard');
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // ...
            });
    }
</script>

<!--Navbar-->

<div class="navbar bg-base-200 justify-center">
    <a class="btn btn-ghost text-xl font-bold" href="/">Decentralized Voting System</a>
  </div>

<!--Chat-->
<div class="mx-4 max-md:mx-2 my-6">
    <div class="chat chat-start">
        <div class="chat-header">
          WOC Admin
          <time class="text-xs opacity-50">2 hours ago</time>
        </div>
        <div class="chat-bubble bg-info text-white max-md:text-sm">Made your decentralized voting system project?</div>
        <div class="chat-footer opacity-50">
          Seen
        </div>
      </div>
      <div class="chat chat-start">
        <div class="chat-header">
          WOC Admin
          <time class="text-xs opacity-50">2 hour ago</time>
        </div>
        <div class="chat-bubble bg-info text-white">send it</div>
        <div class="chat-footer opacity-50">
          seen
        </div>
      </div>
      <div class="chat chat-end max-md:mx-[4rem]">
        <div class="chat-header">
          Keshav
          <time class="text-xs opacity-50">1 hours ago</time>
        </div>
        <div class="chat-bubble">Yes, here it is!</div>
        <div class="chat-footer opacity-50">
          Seen at {currentTime}
        </div>
      </div>  
</div>


<div class="flex justify-center items-center my-12">
<button class="btn btn-outline btn-success text-lg" on:click={LoginWithGoogle}>Login with Google</button>
</div>


<div class="my-12 mx-4 max-md:mx-2">
    <div class="mockup-window border bg-base-300">
        <div class="flex justify-center px-4 py-16 bg-base-200">
            <p class="md:text-lg">Project By <a href="https://github.com/keshav815" target="" class="link-primary link">Keshav Mehnawat</a> <br>Department of Civil Engineering <br>First Year
            </p>
        </div>
      </div>
</div>