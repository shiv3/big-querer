console.log("Content script is running.");
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  const target = document.querySelectorAll(".cfctest-table-body-column .ng-star-inserted span")
  target.forEach((element) => {
    const text = element.textContent?.trim().replace(/\t/g, "")
    const matchUST = text && text.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}).(\d{6})Z$/)
    console.log("match", matchUST);
    if (matchUST) {
      const date = new Date(text);
      console.log("date", date);
      element.textContent = date.toLocaleString("ja-JP", {timeZone: "Asia/Tokyo"});
    }
    const matchUnixTime = text && text.match(/^(\d{10})$/)
    if (matchUnixTime) {
      const date = new Date(parseInt(text) * 1000);
      console.log("date", date);
      element.textContent = date.toLocaleString("ja-JP", {timeZone: "Asia/Tokyo"});
    }
  })
});
