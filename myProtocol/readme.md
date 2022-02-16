# Modern Web At Glance
Summarized what I learned about webs. 

## Document Object Model
**Document Object Model** is an **interface of a web page** with object model perspective so that programming language can manipulate the web page. 

- Web page(document) <====== DOM <===== Javascript

Note that DOM is not a programming language but rather **a web API** to create websites. **DOM is programming-language-independent**, meaning it can be built with any language. 

```python 
import xml.dom.minidom as myDOM
doc = myDOM.parse(r"C:\Projects\Py\chap1.xml"))
# do something else 
```

- document object : a web page itself
- table object : implements HTMLTableElement DOM interface

### Understanding DOM data types
1. Document : any web page loaded in a browser. For example, HTML, XML, SVG, and more. APIs are available based on their document type.

- HTML implements HTMLDocument interface.
- XML/SVG implements XMLDocument interface. 

A document is created with Document constructor. 
- document = new Document()

2. Node : Every object within a document is the one type of Node. 

- Element Node
- Text Node
- Attribute Node

3. Element is based on the Node. An element object implements DOM Element interface and the primitively, Node interface. 

- element object <==== Element interface <====== Node interface <==== Document interface 

4. NodeList : an array of elements. Nodelist has a single method called item. For example, list.item(1)

5. Attr : a special interface for attributes. Commonly referred as an attribute. 

### Understanding DOM interfaces
Since the hierarchy of the DOM data types is inter-related, **meaning one object in DOM can implement several types of DOM interfaces**, there may have been confusions. For example, 

- HTML **form** element implements **HTMLFormElement**, getting its **name** property 
- HTML **form** element implements **HTMLElement**, gettting its **className** property.

### DOM parser
> The DOMParser interface provides the ability to parse XML or HTML **source code from a string into a DOM Document**. You can perform the opposite operation—converting a DOM tree into XML or HTML source—using the XMLSerializer interface.

> In the case of an HTML document, you can also replace portions of the DOM with new DOM trees built from HTML by setting the value of the Element.innerHTML and outerHTML properties. **These properties can also be read to fetch HTML fragments corresponding to the corresponding DOM subtree**.

## Web bundling
Spliting big code lines into modules gives us convenience to manage but it trades off multiple requests for the files from browser.

![multiple-request](https://user-images.githubusercontent.com/83855174/146930464-98382576-795d-435f-983f-e86107f5ca08.png)

In addition, features such as module in ES6 is not fully supported old browser.

![ts-module](https://user-images.githubusercontent.com/83855174/146930352-74b8fd5c-8a3d-48eb-a15c-1221137afaab.png)

Web bundlers, such as webpack and parcel, combat this by bundling them into one file, making even old browser approachable.

### HTML document life cycle
Types of events involved in HTML document life cycle are as follows : 

1. **DOMContentLoaded** : happens as soon as browser finishes reading HTML document. Javascript will manipulate DOM after this event happens. **Does not wait for img or style sheet resource**, meaning they still can be in the process of fetching.
2. load : happens when all **resources including style sheets fetched**. Can take a while so not usually used. 
3. beforeunload : when user about to leave a page. Browser will ask something like : "we have unsaved changes…"
4. unload : when user leaves a page.

## Performance
### HTTP caching
>  For a web site, web caching is a major component in achieving high performance. ... it's important to cache a resource only until it changes, not longer.

> HTTP caching is optional but usually desirable. HTTP caches are **typically limited to** caching responses to the **request method GET**;

> **The performance of web sites** and applications can be significantly improved by reusing previously fetched resources. **Web caches reduce latency and network traffic** and thus lessen the time needed to display resource representations. HTTP caching makes Web sites more responsive.

> For the files in the application that will not change, you can normally **use aggressive caching**. This includes **static files such as images, CSS files, and JavaScript files**.

> When a **web cache** has a requested resource in its store, it **intercepts the request** and returns a copy of the stored resource instead of redownloading the resource from the originating server. ... **improves performance by being closer to the client.**

<img src="reference/cache-types.jpg"  width=870 height=540 alt="cache types"/> 

- Private browser caches
> **Dedicated to a single user**. 
> A browser cache holds all documents the user downloads via HTTP. This cache is used to make visited documents available for back/forward navigation, saving, viewing-as-source, etc. **without requiring an additional trip to the server**.

- Shared proxy caches : 
> **Dedicated to more than one user**.
> Example usage : a web proxy as part of its local network infrastructure to serve many users so that popular resources are reused a number of times, **reducing network traffic and latency**.

#### Controlling caching
> The Cache-Control HTTP/1.1 general-header field is used to specify directives for caching mechanisms in both requests and responses. **Use this header to define your caching policies with the variety of directives it provides**.

- Cache-Control: max-age=31536000 : the maximum amount of time in which a resource will be considered fresh. in seconds. 
- Cache-Control: no-store : The no-store response directive indicates that any caches of any kind (private or shared) should not store this response. If the sense of "don't cache" that you want is actually "don't store", then no-store is the directive to use.
- Cache-Control: no-cache : A cache will send the request to the origin server for validation before releasing a cached copy.

<img src="reference/share-cache-proxy.jpg"  width=822 height=910 alt="client - cache - server"/> 

> The freshness lifetime is calculated based on several headers. If a "Cache-Control: max-age=N" header is specified, the freshness lifetime is equal to N. If this header is not present, which is very often the case, the cache checks whether an Expires header is present. If an Expires header exists, its value minus the value of the Date header determines the freshness lifetime.

```js 
// set server-side cache 
const setCache = (req, res, next) => {
    const cacheTime = 60 * 5 // cache stored for 5 mins
    if (req.method == 'GET') res.set('Cache-control', `no-cache, max-age=${cacheTime}`) 
    else res.set('Cache-control', 'no-store')
    next()
}
```

### Analyzing with PageSpend Insight
Visit below website to find out how your website is doing in terms of loading speed. 

#### Understanding metrics 
Here are some jargons to understand to improve your website performances. 

- First Contentful Paint : when the browser renders the first bit of content from the DOM, providing the first feedback to the user that the page is actually loading

- Largest Contentful Paint : a metric that measures the time a website takes to show the user the largest content on the screen, complete and ready for interaction

- Speed Index : a page load performance metric that shows you how quickly the contents of a page are visibly populated.

- Time to Interactive : a performance metric that measures a page's load responsiveness and helps identify situations where a page looks interactive but actually isn't.

- Total Blocking Time : Total Blocking Time (TBT) is the amount of time, during which Long Tasks (all tasks longer than 50ms) block the main thread and affect the usability of a page. It shows how unresponsive a page is before it becomes fully interactive.

For example, 

<img src="reference/mobile-performance.png" alt="website performance metrics" height=450 width=700 />

## Stateful and Stateless
**어플리케이션의 상태(state)는 현재를 기준으로 결정**되며, 상호 작용의 상태가 얼마 동안이나 기록되어져야 하는지에 따라 stateful과 stateless가 결정된다. Stateful과 Stateless 어플리케이션 모두 **클라이언트의 요청을 서버에 저장**하지만 

- stateful - 이전 세션 정보들은 동일한 서버에 저장됨. 온라인 뱅킹과 같이 이전 거래 내역들을 그대로 보관하고 있어야 할 때 사용됨. **오늘날 대부분의 서비스는 stateful의 형태를 취하고 있으나** 최근 컨테이너 기술의 발달로 인해 stateless의 효율성이 증가되고 있는 듯. 서버의 부하가 높은 편. 예시 : TCP, FTP

- stateless - 이전 세션 정보들을 서버에 저장하지 않고 데이터베이스에 저장함. 서버의 부하가 낮은 편.

## CORS policy
### Understanding Cross origin resource sharing
CORS : Cross Origin Resource Sharing 

1. CORS is simply meaning **HTTP header**
2. which allows a server to indicate a browser **safe places to load resources**
3. cross origin means that you are making requests from different websites

For example, **XMLHttpRequest and Fetch API follows the same-origin policy**. You have to add CORS headers if you are going to get some data from different websites.

### Access-Control-Allow-Origin
> response header indicates whether the **response can be shared** with requesting code from the **given origin**

```js
// A response that tells the browser to allow code from any origin to access a resource 
Access-Control-Allow-Origin: *

// A response that tells the browser to allow requesting code from the origin https://developer.mozilla.org to access a resource
Access-Control-Allow-Origin: "https://developer.mozilla.org"

// Any origin can create a hostile document with a "null" Origin. Should be avoided
Access-Control-Allow-Origin: null
```

You can set CORS-related headers like Access-Control-Allow-Origin in Express CORS middleware.

```js : server.js
const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors( {
    origin: 'http://127.0.0.1:5500', // Access-Control-Allow-Origin header
    methods: ['GET', 'POST', 'DELETE'] // Access-Control-Allow-Methods header
}))
```

## Reference 
- [Access control allow origin](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin)
- [PageSpeed Insight](https://pagespeed.web.dev/)
- [NetNinja - typescript](https://www.youtube.com/watch?v=EpOPR03z4Vw&list=PL4cUxeGkcC9gUgr39Q_yD6v-bSyMwKPUI&index=14&t=1s)
- [Javascript.info - DOMContentLoaded, load, beforeunload, unload](https://ko.javascript.info/onload-ondomcontentloaded)
- [MDN web docs - HTTP caching](https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching#targets_of_caching_operations)
- [MDN Web Docs - DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)