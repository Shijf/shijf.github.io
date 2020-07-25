/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["2018/07/30/a545f2b0-967b-11ea-a177-d1521733a308/index.html","5dd037347c6ad9c9a2bf73061faa1f46"],["2018/09/04/fc6247d0-9679-11ea-8eb3-976c7845fdb4/index.html","c9545f7028314c70c3b30a26dead985d"],["2020/02/21/66b0ce80-95f9-11ea-926e-6f56d5e2c488/index.html","84ea93f11f4d22d27e71578e73d58a7e"],["2020/05/15/30e42f40-9667-11ea-a46f-b77762f93269/index.html","1c25181d421f1505ce9eeddc64ff168d"],["2020/06/04/074be1f0-a666-11ea-8193-9355c0848143/index.html","63e959574a857df94e4f22965572cf94"],["2020/06/13/d5e66740-ad7f-11ea-aa55-150e2fc8d2f7/index.html","b22cc8501d914255835e64e29eab670c"],["2020/06/16/9624aeb0-afd6-11ea-9390-270475cb65e3/index.html","29eafe48a23d3df5561eb155d2e45833"],["2020/06/16/a625aad0-afd6-11ea-9390-270475cb65e3/index.html","f9754f8ef7b35b7e7fdb26c3258113d3"],["2020/07/25/9624aeb0-afd6-11ea-9390-270475cb65f3/index.html","5d31f84263a954c97e323296932dbe43"],["about/index.html","d2cbb04604614d6897d9a7cf7f34f3c1"],["archives/2018/07/index.html","3a8ec5bc1114870e3daa043b0ca75fcd"],["archives/2018/09/index.html","29f712fbaf1c5e6cf869d70e3a29dcf5"],["archives/2018/index.html","fc29f1d7fad6f2ded405c0618b24abf1"],["archives/2020/02/index.html","1bf1b7d121a8b493a37e0f3cd72064b8"],["archives/2020/05/index.html","4ff41dc066f9918dbbd0f7c8fd63340f"],["archives/2020/06/index.html","501ee53c3c4422e28307f4a66c07e9d4"],["archives/2020/07/index.html","c6965a4a89716e7f85c9cd0be46b517d"],["archives/2020/index.html","04bbce5da73ca08371c97707e2b5b548"],["archives/index.html","0e72df20eb45641a39922b44306cf8ab"],["blog/categories/index.html","24d58783db30f55b36403b88d0bb2b5c"],["blog/message/index.html","4421758fe70bbb60cf8ce2393d3d2220"],["blog/tags/index.html","543e1fc125fbf39cb114bae0851613ea"],["categories/linux/index.html","b47e2332b7b7d05ad07e18d47f9df195"],["categories/前端/index.html","6be93ff1a2122f0f84e8949a1df0cf02"],["categories/前端/教程/flex/index.html","425493d6bf961ef0604a1f9fbf209bc0"],["categories/前端/教程/index.html","7af77cb1c5be97d33fc64a8ef3c02d28"],["categories/环境搭建/index.html","14d60c9bf04ea0efd2477ae2f2f3e76e"],["collect/index.html","4789d6f4be9302fa958fbba23b27da7b"],["css/style.css","4e97ea90591f9023574e12248a2394e3"],["fonts/Monaco.ttf","7d1b5cf51af724a2641a89a881b342fe"],["fonts/Skranji-Regular.ttf","0f860580e235e4ae4ae655c2bbb9c943"],["fonts/Ubuntu-Regular.ttf","75adbf87abbf62e27f6a738caeb71f75"],["friends/index.html","3b25952ef65d3147d5e36bb92a134219"],["images/1589549935725.png","cf289f7121da0895ce19da246547161a"],["images/1591249213537.png","9c4110d2e0a76829ff721475d805e0c9"],["images/1591249474353.png","9c4110d2e0a76829ff721475d805e0c9"],["images/1591249508155.png","ca31b10772024cc323679011a7e58760"],["images/1591249524969.png","a9b0c55112040b50d298252f135b0e21"],["images/1591249541816.png","62c263a6c09b7260681fc9f029661b0a"],["images/1591249552700.png","9b15467c1522c99038c2ff6d95c574dc"],["images/1591249562980.png","e24410c700c928d4e262811da3aaf0be"],["images/1591256801998.png","aa652bd5a0c60bfaaf7e2ea215aa3596"],["images/1591256835268.png","2358018b34cd7a8da212b12245f3b9d7"],["images/1591256879044.png","92f8d68eed3b2bead47b05a4dce40aa6"],["images/1591257094293.png","f422a031bcc06fe5ef087c8dc6ab1a16"],["images/1591260053670.png","8e54f8bd67101d12e83aa7d36fcf4b85"],["images/1591263672191.png","29156e88df9ae8e020b937cfdfbe3299"],["images/1591263770552.png","3b11c48ce836d21006d8f8ecc4bc9194"],["images/1591275400464.png","63a3e54dc2b7077fb97a4e9d9f3f4ac0"],["images/1591275504200.png","1cf753c5f37a31cf47babb71c94083d1"],["images/1591275540439.png","2f9419331b79a81a1543c081511dc26b"],["images/1591275606306.png","87db4cdab5806de2352f0a62dcc57115"],["images/1591275824900.png","3d08b787da75db9a74069e2cff77c430"],["images/1591275876712.png","e40e477038ffcec9353a979c13daffd4"],["images/1591275946460.png","d626924b5b41a5fae7ef00f6dd319ce4"],["images/1591276143225.png","4cf3646e18bdf87611d2b6ca93096d83"],["images/1591276620047.png","b02a65f45f65498bc778d4c46d7ed326"],["images/1591276712392.png","ab23841c58f83f63305fba9da80b6513"],["images/alipay.png","de76242f87836f9eb2b1761749f4dcf7"],["images/wechatpay.png","cc72f0a61009f215311108bb474a0255"],["img/algolia.svg","7907ab6b9a7b05076e0751fa3a0bda3a"],["img/azure.svg","570248db796e292bf7b59a650cd079c8"],["img/baidu.svg","dc8c2616588c33ff4f70f43579c639d6"],["index.html","1ec73c24932f8ebe115e8dc916680979"],["js/app.js","ea306851b6276a0ffeec351d138589e5"],["js/search.js","8c5e55f8a12105822ef6793c880f0aa7"],["js/valine.js","430596db58e60567246c52c474816ee6"],["mylist/index.html","d7cf779beae516b1c116fc2cd0c01163"],["tags/css/index.html","2eb38c601981c1e92591c0f657fc3e0a"],["tags/java/index.html","bbd68cd7b19daefb8e010b697f224360"],["tags/linux/index.html","6b37c1aacd132ff6d3c1449ca64d720f"],["tags/liunx/index.html","daab252987fc055a8228a002413a573f"],["tags/node/index.html","3966b51b964533082535be9a7a367185"],["tags/nodejs/index.html","ea22f538fbb58794722d59c22968acf7"],["tags/php/index.html","6d0d0e0fd0f4ff3feb9fda62fba543fc"],["tags/vscode/index.html","022a4dcd14b5e1093c93c845d09a95bb"],["tags/vue/index.html","f3b394400ec3d5044ef4d70e8087dbbb"],["tags/工具/index.html","2911b52af87f0d4d84bff6486f9cd5b3"],["tags/微信开发/index.html","8c89de291d4e431873b02221eef775a8"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function(originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function(originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function(originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function(whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function(originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







