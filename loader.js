/* =========================================================
   DALLAS MOTORS — Loading Screen Controller
   Shows once per browser session (not on every page navigation).
   Browsers block autoplay audio with sound until the user has
   interacted with the page, so this tries to autoplay the cold
   start sound immediately; if that's blocked, the first click/tap
   anywhere on the loading screen plays it instead (a genuine user
   gesture always satisfies autoplay policy). Either way, the
   screen fades out on its own after ~5s so no one is stuck
   waiting on it.

   Engine sound: "Muscle Car" by Daniel Simion, soundbible.com,
   licensed CC BY 3.0 (https://creativecommons.org/licenses/by/3.0/).
--------------------------------------------------------- */
(function(){
  var overlay = document.getElementById("loadingScreen");
  if (!overlay) return;

  var seen = sessionStorage.getItem("dallasIntroSeen");
  if (seen){
    overlay.remove();
    return;
  }
  sessionStorage.setItem("dallasIntroSeen", "1");

  var audio = document.getElementById("engineSound");
  var dismissed = false;

  function dismiss(){
    if (dismissed) return;
    dismissed = true;
    overlay.classList.add("is-hidden");
    setTimeout(function(){ overlay.remove(); }, 750);
  }

  // Best-effort autoplay — succeeds if the browser allows it, silently
  // no-ops if blocked (most first-time visits will block this).
  if (audio){
    audio.volume = 1.00;
    audio.play().catch(function(){ /* blocked until user interacts, that's fine */ });
  }

  // Guaranteed-to-work fallback: any click/tap is a real user gesture.
  overlay.addEventListener("click", function(){
    if (audio){
      audio.currentTime = 0;
      audio.play().catch(function(){});
    }
    dismiss();
  });

  // Never block the site — dismiss on its own shortly after the
  // progress bar finishes filling.
  setTimeout(dismiss, 5000);
})();
