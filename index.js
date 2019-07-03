const url = "https://edabit.com?a=1&b=2&a=2";

console.log(stripUrlParams(url, ["a", "b"]));
console.log(stripUrlParams(url, ["a"]));
console.log(stripUrlParams(url, ["b"]));
console.log(stripUrlParams(url));

function stripUrlParams(url, paramsToStrip) {
  if (validateUrl(url)) {
    let splitedUrl = url.split("?");
    const baseUrl = splitedUrl[0];
    let urlParams = splitedUrl[1];
    let paramKeyObj = {};
    let newUrlParams = "";

    if (splitedUrl.length >= 2) {
      let splitParams = urlParams.split("&");

      if (urlParams) {
        splitParams.forEach(param => {
          //Keys and Values from params
          let [paramKey, paramValue] = param.split("=");

          //If paramsToStrip is undefindes, then just return;
          if (paramsToStrip) {
            //Check if paramsToStrip includes a key
            let includeKey = paramsToStrip.includes(paramKey);
  
            if (!paramsToStrip || !includeKey) {
              //If  paramKeyObj doesnt inlcude paramKey.
              if (!paramKeyObj[paramKey]) {
                paramKeyObj[paramKey] = paramValue;
                newUrlParams += `${paramKey}=${paramValue}&`;
              }
            }
          } else {
            // console.log("Undefined....");
            return;
          }
        });

        if (newUrlParams) {
          newUrlParams = newUrlParams.substring(0, newUrlParams.length - 1);
        }
      }
      let fixedUrl = baseUrl + (newUrlParams ? "?" + newUrlParams : "");
      return fixedUrl;
    } else {
      console.log("Param is a base url");
    }
  } else {
    console.log("Parameter must be a URL");
  }
}

function validateUrl(value) {
  return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
    value
  );
}
