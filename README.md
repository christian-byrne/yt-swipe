
# Make YouTube Homepage like Shorts Extension

Adds keyboard hotkeys to toggle through and dismiss videos. When a video is dismissed, the "Not Interested" Button is clicked automatically (so they do not appear on your feed again) and the video is then removed from the page (allowing all the other videos to slide into place so you never have to scroll). 

## Usage

1. Download [zip file](./version1.zip) and extract
2. Go to `chrome://extensions` (enter that in URL bar)
3. Enable developer mode with radio button in top right
4. Click `Load unpacked` button -> Choose the `src` folder in the directory made from the zip extraction


## Changelog

### v2 

- xxx

## To Do
- [ ] Toggle backwards instead of just forwards
- [ ] Improve highlighted border style attributes
- [ ] Add element zapper from UBlock list

## Development Process

<details>
    <summary>Click to Expand</summary>

**1 - Prototype and Testing**

Explained concept to ChatGPT and got a script that was very close to functional.


I created a new, empty chrome user directory and then started Chrome from terminal with `--user-dir` option -- so that I could test on a browser with no customizations or extensions already present.


Use DevTools to improve the Node queries written by ChatGPT.


Tested and debugged ChatGPT's functions in DevTools console while on YouTube homepage. 


The ability for all the videos on the page to slide back into place after one video was removed was already built-in given that the webpage is built to be dynamic and accessible across screen sizes.


Finally, I pasted the entire script into the DevTools console to test overall functionality. 


**2 - Packaging as Extension**


```bash
zip -r compressed_filename.zip foldername
```

I followed the [offical Chrome tutorial](https://developer.chrome.com/docs/extensions/mv3/getstarted/) for making a Chrome Extension. 

https://developer.chrome.com/docs/extensions/mv3/devguide/


**3 - Testing on Different Devices**

https://developer.chrome.com/docs/extensions/mv3/content_scripts/

https://developer.chrome.com/docs/extensions/mv3/content_scripts/#functionality

**4 - Publishing to Chrome Webstore**

https://developer.chrome.com/docs/extensions/mv3/hosting/


</details>

Aug 25, 2023