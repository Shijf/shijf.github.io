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

var precacheConfig = [["2018/07/30/a545f2b0-967b-11ea-a177-d1521733a308/index.html","61745e9661020226c1617929b397756e"],["2018/09/04/fc6247d0-9679-11ea-8eb3-976c7845fdb4/index.html","829d0bc10d66b6d2af3910eeaa3e6891"],["2020/02/21/66b0ce80-95f9-11ea-926e-6f56d5e2c488/index.html","a513e611a2958e6c9017d45e80baaca1"],["2020/05/15/30e42f40-9667-11ea-a46f-b77762f93269/index.html","3177c6224b1f010e84009f7b2d4b9cb1"],["2020/06/04/074be1f0-a666-11ea-8193-9355c0848143/index.html","470fba3434e80e719c7b4f2e3f8057a3"],["about/index.html","d2cbb04604614d6897d9a7cf7f34f3c1"],["archives/2018/07/index.html","848e0f090760e2ea50072fd92c0e83d7"],["archives/2018/09/index.html","18b70cd3391ed1202ba0bc5397ffe1e6"],["archives/2018/index.html","11a466f5590634f781730b46c4d81f3f"],["archives/2020/02/index.html","03d67a0d98900bef5e66a0e9c8fd6d62"],["archives/2020/05/index.html","c4ecb8b43146167878901253a56cc677"],["archives/2020/06/index.html","ee488e8ead739a5b54bfe6f15413e4e0"],["archives/2020/index.html","2fdc3d225e744c1cd90cb63dca740300"],["archives/index.html","a1b482bdf8653735f39b640e1bf90381"],["blog/categories/index.html","851499461bb6d2dd7a9da40e6d095b7b"],["blog/message/index.html","4421758fe70bbb60cf8ce2393d3d2220"],["blog/tags/index.html","b446f1869caeac0875546db3cd602a3e"],["categories/linux/index.html","aedbd4867e94c8aebbfc7db064a1ae7f"],["categories/前端/index.html","119571aba7b2adf5ce936470083eb035"],["categories/前端/教程/flex/index.html","d382924436bb3ee38d8ae771a05a5f0b"],["categories/前端/教程/index.html","2953d974df13a9241db4085a054ebaf8"],["categories/环境搭建/index.html","1684af6adf1a40b3592b295a2f6380df"],["collect/index.html","a00b49b469f10608460495554976b454"],["css/style.css","4e97ea90591f9023574e12248a2394e3"],["fonts/Monaco.ttf","7d1b5cf51af724a2641a89a881b342fe"],["fonts/Skranji-Regular.ttf","0f860580e235e4ae4ae655c2bbb9c943"],["fonts/Ubuntu-Regular.ttf","75adbf87abbf62e27f6a738caeb71f75"],["friends/index.html","076b988e2dcf878ca75ad017aafaf746"],["images/1589549935725.png","cf289f7121da0895ce19da246547161a"],["images/1591249213537.png","9c4110d2e0a76829ff721475d805e0c9"],["images/1591249474353.png","9c4110d2e0a76829ff721475d805e0c9"],["images/1591249508155.png","ca31b10772024cc323679011a7e58760"],["images/1591249524969.png","a9b0c55112040b50d298252f135b0e21"],["images/1591249541816.png","62c263a6c09b7260681fc9f029661b0a"],["images/1591249552700.png","9b15467c1522c99038c2ff6d95c574dc"],["images/1591249562980.png","e24410c700c928d4e262811da3aaf0be"],["images/1591256801998.png","aa652bd5a0c60bfaaf7e2ea215aa3596"],["images/1591256835268.png","2358018b34cd7a8da212b12245f3b9d7"],["images/1591256879044.png","92f8d68eed3b2bead47b05a4dce40aa6"],["images/1591257094293.png","f422a031bcc06fe5ef087c8dc6ab1a16"],["images/1591260053670.png","8e54f8bd67101d12e83aa7d36fcf4b85"],["images/1591263672191.png","29156e88df9ae8e020b937cfdfbe3299"],["images/1591263770552.png","3b11c48ce836d21006d8f8ecc4bc9194"],["images/1591275400464.png","63a3e54dc2b7077fb97a4e9d9f3f4ac0"],["images/1591275504200.png","1cf753c5f37a31cf47babb71c94083d1"],["images/1591275540439.png","2f9419331b79a81a1543c081511dc26b"],["images/1591275606306.png","87db4cdab5806de2352f0a62dcc57115"],["images/1591275824900.png","3d08b787da75db9a74069e2cff77c430"],["images/1591275876712.png","e40e477038ffcec9353a979c13daffd4"],["images/1591275946460.png","d626924b5b41a5fae7ef00f6dd319ce4"],["images/1591276143225.png","4cf3646e18bdf87611d2b6ca93096d83"],["images/1591276620047.png","b02a65f45f65498bc778d4c46d7ed326"],["images/1591276712392.png","ab23841c58f83f63305fba9da80b6513"],["images/alipay.png","de76242f87836f9eb2b1761749f4dcf7"],["images/wechatpay.png","cc72f0a61009f215311108bb474a0255"],["img/algolia.svg","7907ab6b9a7b05076e0751fa3a0bda3a"],["img/azure.svg","570248db796e292bf7b59a650cd079c8"],["img/baidu.svg","dc8c2616588c33ff4f70f43579c639d6"],["index.html","d6d441d57393845c7374414c0cf3bd80"],["js/app.js","ea306851b6276a0ffeec351d138589e5"],["js/search.js","8c5e55f8a12105822ef6793c880f0aa7"],["js/valine.js","430596db58e60567246c52c474816ee6"],["mylist/index.html","6c6732f41627af22b40d9218b5d4eed6"],["tags/css/index.html","83b2d24e236db77eaff03b620d47c05e"],["tags/java/index.html","12695dc4521dbc182fabbc4114ac2a82"],["tags/linux/index.html","7433b8981aeed6463d15952fd3ad46c1"],["tags/liunx/index.html","166dab34a18393fc8563b1041eeb9e0b"],["tags/node/index.html","30f6369552487ae394b818b4c3645e8b"],["tags/vscode/index.html","cd1972d86fa802b8f66b38a6b33ac01a"],["tags/工具/index.html","a7471bf9400760458ca1bf6e8c41f7bc"],["tags/微信开发/index.html","2b58b6c98f55cc4acd188613dd093560"]];
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







