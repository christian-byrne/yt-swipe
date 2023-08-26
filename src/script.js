/**
 * @author Christian P. Byrne
 * @from Aug 25, 2023
 *
 * @todo
 *    1.
 *
 */

class Page {
  constructor(animations = true) {
    this.activeMode = false;
    this.currentIndex = 0;

    /**
     * Returns list of nodes containing each video shown on the page.
     * Must re-call function when accessing video list because page might dynamically refresh the shown videos.
     * @returns {NodeList}
     */
    this.getShownVideos = () => {
      return document.querySelectorAll("ytd-rich-grid-media");
    };

    this.highlightVideo = (index) => {
      this.getShownVideos().forEach((video, i) => {
        if (i === index) {
          video.style.border = "2px solid red"; // Highlight the video
          return;
        } else {
          video.style.border = "none"; // Remove highlight from other videos
        }
      });
    };

    this.setActiveMode = () => {
      this.activeMode = !this.activeMode;
      this.currentIndex = 0;
      this.highlightVideo(this.currentIndex);
    };
    this.skipToNextVideo = () => {
      this.currentIndex =
        (this.currentIndex + 1) % this.getShownVideos().length;
      this.highlightVideo(this.currentIndex);
    };

    this.followVideoLink = () => {
      const video = document.querySelectorAll("ytd-rich-grid-media")[
        this.currentIndex
      ];
      const link = video.querySelector("#thumbnail a");
      if (link) {
        link.click(); // Follow the video's hyperlink
      }
    };

    /**
     * Hides video.
     */
    this.hideVideo = async () => {
      const video = document.querySelectorAll("ytd-rich-grid-media")[
        this.currentIndex
      ];

      // Find settings dropdown button next to video then click.
      const settingsButton = video.querySelector("ytd-menu-renderer");
      if (settingsButton) {
        let clickableAttr = settingsButton.children[2].children[0];
        clickableAttr.click(); // Open settings menu

        setTimeout(() => {
          let notInterestedBtn;

          // Select "NotInterested" button.
          let strings = document
            .querySelector("ytd-popup-container")
            .querySelector("tp-yt-iron-dropdown")
            .querySelectorAll("yt-formatted-string");
          strings.forEach((element) => {
            if (element.textContent.toLowerCase().includes("not interested")) {
              notInterestedBtn = element;
            }
          });

          // Click
          if (notInterestedBtn) {
            notInterestedBtn.click(); // Select "Not Interested"
          }

          // Wait for "NotInterested" to apply
          setTimeout(() => {
            // Then remove the video container, therefore sliding the other videos.
            video.parentElement.parentElement.remove();
          }, 200);
        }, 400); // Adjust the delay as needed
      }
    };

    // Create listener for extension's hotkeys
    document.addEventListener("keydown", (event) => {
      if (event.ctrlKey && event.key === "z") {
        this.setActiveMode();
      } else if (this.activeMode) {
        // "b" hotkey: swipe video and move to next
        if (event.key === "b") {
          this.hideVideo().then(() => {
            // this.skipToNextVideo();
          });
        }
        // Enter hotkey: watch video
        else if (event.key === "Enter") {
          this.followVideoLink();
        }
        // Shift hotkey: skip video but don't dismiss (watch later)
        else if (event.key === "Shift") {
          this.skipToNextVideo();
        }
      }
    });
  }
}

const page = new Page();
