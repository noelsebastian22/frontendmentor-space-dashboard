const tabList = document.querySelector('[role="tablist"]');
const tabs = tabList.querySelectorAll('[role="tab"]');

tabList.addEventListener("keydown", changeTabFocus);

tabs.forEach((tab) => {
  tab.addEventListener("click", changeTabPanel);
});

// Global variable for tab focus
let tabFocus = 0;
//Function to change the focus of the tabs on arrow key movement
function changeTabFocus(e) {
  const keydownLeft = 37;
  const keydownRight = 39;

  const currentKey = e.keyCode;

  // Chnage the tabindex of the current tab to -1
  if (currentKey === keydownRight || currentKey === keydownLeft) {
    tabs[tabFocus].setAttribute("tabindex", -1);

    if (currentKey === keydownRight) {
      tabFocus++;
      if (tabFocus >= tabs.length) {
        tabFocus = 0;
      }
    }
    //if the left key is pushed, move to the tab on the left
    else if (currentKey === keydownLeft) {
      tabFocus--;
      if (tabFocus < 0) {
        tabFocus = tabs.length - 1;
      }
    }
    tabs[tabFocus].setAttribute("tabindex", 0);
    tabs[tabFocus].focus();
  }
  //if the right key is pushed, move to the next tab to the right
}

function changeTabPanel(e) {
  const targetTab = e.target;
  const targetPanel = targetTab.getAttribute("aria-controls");
  const targetImage = targetTab.getAttribute("data-image");

  const tabContainer = targetTab.parentNode;
  const mainContainer = tabContainer.parentNode;

  // Deselect the previous tab
  tabContainer
    .querySelector("[aria-selected= 'true']")
    .setAttribute("aria-selected", false);

  // Select the current tab
  targetTab.setAttribute("aria-selected", true);

  //   Hide all the panels
  hideContent(mainContainer, "[role = 'tabpanel']");

  //   Display the selected panel
  showContent(mainContainer, [`#${targetPanel}`]);

  //   Hide all the Images
  hideContent(mainContainer, "picture");

  //   Display the selected Image
  showContent(mainContainer, [`#${targetImage}`]);
}

// Function to hide content inside a parent container
function hideContent(parent, content) {
  parent
    .querySelectorAll(content)
    .forEach((item) => item.setAttribute("hidden", true));
}

// Function to show content inside a parent container
function showContent(parent, content) {
  parent.querySelector(content).removeAttribute("hidden");
}
