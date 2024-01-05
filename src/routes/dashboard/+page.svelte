<script lang="ts">
  import { auth } from "$lib/firebase.js";
  import { onAuthStateChanged } from "firebase/auth";
  import { goto } from "$app/navigation";
  import { writable } from "svelte/store";

  //UI Elements
  let cardStyle = "card md:w-96 w-72 bg-base-300 shadow-xl hover:scale-110";
  type User = {
    name: string | null;
    email: string | null;
  };

  let user = writable<User | null>(null);

  let vote = writable(false); // Make vote a writable store
  function toggleVote() {
    vote.update((v) => !v); // Update the value of vote

    // Wait for the next microtask to ensure the DOM is updated
    Promise.resolve().then(() => {
      const voteCard = document.getElementById('vote-card');
      if (voteCard) {
        voteCard.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  //dropdown candidate select
  let selectedCandidate: string | null = null;

  function selectCandidate(candidate: string) {
    selectedCandidate = candidate;
  }

  function castVote() {
    if (selectedCandidate) {
      alert(`Voted for ${selectedCandidate}!`);
    } else {
      alert("Please select a candidate.");
    }
  }

  let dropDown = "close";
  function toggleDropDown() {
    dropDown = dropDown === "close" ? "open" : "close";
  }

  onAuthStateChanged(auth, (firebaseUser) => {
    if (firebaseUser) {
      // User is signed in, update the user store
      user.set({
        name: firebaseUser.displayName,
        email: firebaseUser.email,
      });
    } else {
      // No user is signed in.
      user.set(null);
    }
  });

  function logOut() {
    auth
      .signOut()
      .then(() => {
        // Sign-out successful, redirect to home page
        goto("/");
      })
      .catch((error) => {
        // An error happened.
      });
  }
</script>
<!--Navbar-->
<div
  class="navbar bg-neutral flex justify-between max-md:justify-start max-md:space-x-16"
>
  <a
    href="/"
    class="btn-sm btn-ghost text-2xl font-extrabold max-md:text-lg md:ml-4"
    >VOTE APP</a
  >

  <button
    class="btn max-md:btn-sm btn-primary md:mx-6"
    on:click={() => logOut()}>Logout</button
  >
</div>

{#if $user}
  <div id="profile" class="mx-8 max-md:mx-2 my-6">
    <div class="card max-md:w-72 md:card-side bg-primary-content shadow-xl">
      <div class="card-body">
        <h2 class="card-title">Hii {$user.name}!</h2>
        <p class="text-accent">
          Department: Civil Engineering <br />
          Semester: 5th <br />
          Clubs: FotoFreaks, FFI, Cyberlabs <br>
        </p>
        <div class="card-actions justify-end">
          <a href="#topic" class="btn btn-primary">Explore</a>
        </div>
      </div>
    </div>
  </div>
  <!--Topics-->
  <div class="mx-8 max-md:mx-2 my-4">
    <div id="topic" class="grid md:grid-cols-3 max-md:grid-cols-1 md:gap-3">
      <!--Topic Cards-->
      <div class={cardStyle}>
        <div class="card-body">
          <h2 class="card-title">FotoFreaks</h2>
          <p>
            Join us for the annual college photography club elections! Cast your
            vote to choose our next leaders, who will guide us in exploring the
            art and science of photography in the coming year.
          </p>
          <div class="card-actions justify-end">
            <button class="btn btn-primary" on:click={toggleVote}
              >Vote Now</button
            >
          </div>
        </div>
      </div>
      <div class={cardStyle}>
        <div class="card-body">
          <h2 class="card-title">Fastforward India</h2>
          <p>
            Join us for the annual FFI Club elections! Cast your vote to
            choose our next leaders, who will guide us on working for health and education of our brothers and sisters who are unprivilaged.
          </p>
          <div class="card-actions justify-end">
            <button class="btn btn-primary" on:click={toggleVote}
              >Vote Now</button
            >
          </div>
        </div>
      </div>

      <div class={cardStyle}>
        <div class="card-body">
          <h2 class="card-title">Cyberlabs Club</h2>
          <p>
            Join us for the annual Cyberlabs Club elections! Cast your vote to
            choose our next leaders, who will guide us in exploring the world of
            cybersecurity and technology in the coming year.
          </p>
          <div class="card-actions justify-end">
            <button class="btn btn-primary" on:click={toggleVote}
              >Vote Now</button
            >
          </div>
        </div>
      </div>

      <div class={cardStyle}>
        <div class="card-body">
          <h2 class="card-title">Lights Camera ISM</h2>
          <p>
            Join us for the annual Lights Camera ISM Club elections! Cast your vote to
            choose our next leaders, who will guide us in exploring the world of
            cinematography in the coming year.
          </p>
          <div class="card-actions justify-end">
            <button class="btn btn-primary" on:click={toggleVote}
              >Vote Now</button
            >
          </div>
        </div>
      </div>

      <div class={cardStyle}>
        <div class="card-body">
          <h2 class="card-title">Students' Gymkhana IIT(ISM)</h2>
          <p>
            Join us for the annual Students' Gymkhana Club elections! Cast your vote to
            choose our next leaders, who will guide us in promoting fitness and
            sportsmanship in the coming year.
          </p>
          <div class="card-actions justify-end">
            <button class="btn btn-primary" on:click={toggleVote}
              >Vote Now</button
            >
          </div>
        </div>
      </div>
    </div>
  </div>

  <!--Vote Card-->
  {#if $vote}
  <div class="card max-md:w-72 md:card-side bg-primary-content shadow-xl" id="vote-card">
    <div class="card-body">
      <h2 class="card-title text-2xl">Vote Now</h2>
      <p class="">
        <span class="text-primary text-xl">Election for the Club President</span
        ><br />
        <span class="text-lg"
          >Candidates: Hemaa, Ramesh Kumar, Rakesh Agarwal, Bhumi Srivastav </span
        >
      </p>
      <div class="dropdown dropdown-{dropDown}">
        <div tabindex="0" role="button" class="btn m-1" on:click={toggleDropDown}>
          Select Candidate
        </div>
        <ul
          tabindex="0"
          class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
        >
          <button on:click={() => selectCandidate("Hemaa")}
            >Hemaa</button
          >
          <button on:click={() => selectCandidate("Ramesh Kumar")}
            >Ramesh Kumar</button
          >
          <button on:click={() => selectCandidate("Rakesh Agarwal")}
            >Rakesh Agarwal</button
          >
          <button on:click={() => selectCandidate("Bhumi Srivastav")}
            >Bhumi Srivastav</button
          >
        </ul>
      </div>
      <div class="card-actions justify-end">
        <button class="btn btn-primary" on:click={castVote}>Vote</button>
      </div>
    </div>
  </div>
  {/if}
{/if}
