!function e(n,t,o){function a(i,s){if(!t[i]){if(!n[i]){var c="function"==typeof require&&require;if(!s&&c)return c(i,!0);if(r)return r(i,!0);var u=new Error("Cannot find module '"+i+"'");throw u.code="MODULE_NOT_FOUND",u}var l=t[i]={exports:{}};n[i][0].call(l.exports,function(e){var t=n[i][1][e];return a(t?t:e)},l,l.exports,e,n,t,o)}return t[i].exports}for(var r="function"==typeof require&&require,i=0;i<o.length;i++)a(o[i]);return a}({1:[function(e,n,t){var o=function(e,n,t,o){var a=e(),r={init:function(){console.log("App started."),s.setupEventListeners(),i.init()},dispatchMessage:function(e){i.sendMessage(e,s.clearInput)},messageReceived:function(e){var n=r.formatTime(e.createdAt),t={text:e.text,from:e.from,createdAt:n};s.renderMessage(t)},dispatchLocation:function(){return navigator.geolocation?(s.renderLocationBtn("disable"),void navigator.geolocation.getCurrentPosition(function(e){s.renderLocationBtn("enable");var n={latitude:e.coords.latitude,longitude:e.coords.longitude};i.sendLocation(n)},function(){s.renderLocationBtn("enable"),alert("unable to fecth location")})):alert("Geolocation not support by your browser!")},locationReceived:function(e){var n=r.formatTime(e.createdAt),t={from:e.from,url:e.url,createdAt:n};s.renderLocation(t)},formatTime:function(e){return t(e).format("h:mm a")},updateUserList:function(e){s.renderUserList(e)}},i={sendMessage:function(e,n){a.emit("createMessage",{text:e},n)},sendLocation:function(e){a.emit("createLocationMessage",e)},connect:function(){a.emit("join",s.DOM.$params,function(e){e?(alert(e),window.location.href="/"):console.log("No error")})},disconnect:function(){console.log("Disconnecting from chat")},init:function(){a.on("connect",i.connect),a.on("disconnect",i.disconnect),a.on("newMessage",r.messageReceived),a.on("updateUserList",r.updateUserList),a.on("newLocationMessage",r.locationReceived)}},s={DOM:{$messages:n("#messages"),$messageTemplate:n("#message-template"),$messageForm:n("#message-form"),$users:n("#users"),$messageInput:n("[name=message]"),$locationBtn:n("#send-location"),$locationMessage:n("#location-message-template"),$params:n.deparam(window.location.search)},renderMessage:function(e){var n=o.render(s.DOM.$messageTemplate.html(),e);s.DOM.$messages.append(n)},renderUserList:function(e){var t=n("<ol></ol>");e.forEach(function(e){t.append(n("<li></li>").text(e))}),n("#users").html(t)},renderLocation:function(e){var n=o.render(s.DOM.$locationMessage.html(),e);s.DOM.$messages.append(n)},clearInput:function(){s.DOM.$messageInput.val("")},handleUserInput:function(e){e.preventDefault();var n=s.DOM.$messageInput.val();""!==n.trim()&&r.dispatchMessage(n)},renderLocationBtn:function(e){"disable"===e?s.DOM.$locationBtn.attr("disabled","disabled").text("Sending location..."):"enable"===e&&s.DOM.$locationBtn.removeAttr("disabled").text("Send location")},setupEventListeners:function(){s.DOM.$messageForm.on("submit",s.handleUserInput),s.DOM.$locationBtn.on("click",r.dispatchLocation)}};return{init:r.init}}(io,jQuery,moment,Mustache);o.init()},{}]},{},[1]);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvY2hhdC5qcyJdLCJuYW1lcyI6WyJlIiwidCIsIm4iLCJyIiwicyIsIm8iLCJ1IiwiYSIsInJlcXVpcmUiLCJpIiwiZiIsIkVycm9yIiwiY29kZSIsImwiLCJleHBvcnRzIiwiY2FsbCIsImxlbmd0aCIsIjEiLCJtb2R1bGUiLCJNeUNoYXRDb250cm9sbGVyIiwiaW8iLCIkIiwibW9tZW50IiwiTXVzdGFjaGUiLCJzb2NrZXQiLCJhcHBDdHJsIiwiaW5pdCIsImNvbnNvbGUiLCJsb2ciLCJ1aUN0cmwiLCJzZXR1cEV2ZW50TGlzdGVuZXJzIiwibmV0d29ya0N0cmwiLCJkaXNwYXRjaE1lc3NhZ2UiLCJ0ZXh0Iiwic2VuZE1lc3NhZ2UiLCJjbGVhcklucHV0IiwibWVzc2FnZVJlY2VpdmVkIiwibWVzc2FnZSIsInRpbWUiLCJmb3JtYXRUaW1lIiwiY3JlYXRlZEF0IiwiZm9ybWF0dGVkTWVzc2FnZSIsImZyb20iLCJyZW5kZXJNZXNzYWdlIiwiZGlzcGF0Y2hMb2NhdGlvbiIsIm5hdmlnYXRvciIsImdlb2xvY2F0aW9uIiwicmVuZGVyTG9jYXRpb25CdG4iLCJnZXRDdXJyZW50UG9zaXRpb24iLCJwb3NpdGlvbiIsImNvb3JkcyIsImxhdGl0dWRlIiwibG9uZ2l0dWRlIiwic2VuZExvY2F0aW9uIiwiYWxlcnQiLCJsb2NhdGlvblJlY2VpdmVkIiwibG9jYXRpb25Nc2ciLCJmb3JtYXR0ZWRMb2NhdGlvbiIsInVybCIsInJlbmRlckxvY2F0aW9uIiwiZm9ybWF0IiwidXBkYXRlVXNlckxpc3QiLCJ1c2VycyIsInJlbmRlclVzZXJMaXN0IiwiZW1pdCIsImNvbm5lY3QiLCJET00iLCIkcGFyYW1zIiwiZXJyIiwid2luZG93IiwibG9jYXRpb24iLCJocmVmIiwiZGlzY29ubmVjdCIsIm9uIiwiJG1lc3NhZ2VzIiwiJG1lc3NhZ2VUZW1wbGF0ZSIsIiRtZXNzYWdlRm9ybSIsIiR1c2VycyIsIiRtZXNzYWdlSW5wdXQiLCIkbG9jYXRpb25CdG4iLCIkbG9jYXRpb25NZXNzYWdlIiwiZGVwYXJhbSIsInNlYXJjaCIsImh0bWwiLCJyZW5kZXIiLCJhcHBlbmQiLCJvbCIsImZvckVhY2giLCJ1c2VyIiwiaHRtbExvY2F0aW9uIiwidmFsIiwiaGFuZGxlVXNlcklucHV0IiwicHJldmVudERlZmF1bHQiLCJtZXNzYWdlVGV4dCIsInRyaW0iLCJzdGF0dXMiLCJhdHRyIiwicmVtb3ZlQXR0ciIsImpRdWVyeSJdLCJtYXBwaW5ncyI6IkNBQUEsUUFBQUEsR0FBQUMsRUFBQUMsRUFBQUMsR0FBQSxRQUFBQyxHQUFBQyxFQUFBQyxHQUFBLElBQUFKLEVBQUFHLEdBQUEsQ0FBQSxJQUFBSixFQUFBSSxHQUFBLENBQUEsR0FBQUUsR0FBQSxrQkFBQUMsVUFBQUEsT0FBQSxLQUFBRixHQUFBQyxFQUFBLE1BQUFBLEdBQUFGLEdBQUEsRUFBQSxJQUFBSSxFQUFBLE1BQUFBLEdBQUFKLEdBQUEsRUFBQSxJQUFBSyxHQUFBLEdBQUFDLE9BQUEsdUJBQUFOLEVBQUEsSUFBQSxNQUFBSyxHQUFBRSxLQUFBLG1CQUFBRixFQUFBLEdBQUFHLEdBQUFYLEVBQUFHLElBQUFTLFdBQUFiLEdBQUFJLEdBQUEsR0FBQVUsS0FBQUYsRUFBQUMsUUFBQSxTQUFBZCxHQUFBLEdBQUFFLEdBQUFELEVBQUFJLEdBQUEsR0FBQUwsRUFBQSxPQUFBSSxHQUFBRixFQUFBQSxFQUFBRixJQUFBYSxFQUFBQSxFQUFBQyxRQUFBZCxFQUFBQyxFQUFBQyxFQUFBQyxHQUFBLE1BQUFELEdBQUFHLEdBQUFTLFFBQUEsSUFBQSxHQUFBTCxHQUFBLGtCQUFBRCxVQUFBQSxRQUFBSCxFQUFBLEVBQUFBLEVBQUFGLEVBQUFhLE9BQUFYLElBQUFELEVBQUFELEVBQUFFLEdBQUEsT0FBQUQsS0FBQWEsR0FBQSxTQUFBVCxFQUFBVSxFQUFBSixHQ0FBLEdBQUFLLEdBQUEsU0FBQUMsRUFBQUMsRUFBQUMsRUFBQUMsR0FDQSxHQUFBQyxHQUFB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QU8sZ0JBQUE2RCxJQUVBOUMsa0JBQUEsU0FBQWdELEdBQ0EsWUFBQUEsRUFDQWxFLEVBQUFxQyxJQUFBYSxhQUFBaUIsS0FBQSxXQUFBLFlBQ0EvRCxLQUFBLHVCQUNBLFdBQUE4RCxHQUNBbEUsRUFBQXFDLElBQUFhLGFBQUFrQixXQUFBLFlBQUFoRSxLQUFBLGtCQUdBSCxvQkFBQSxXQUNBRCxFQUFBcUMsSUFBQVUsYUFBQUgsR0FBQSxTQUFBNUMsRUFBQThELGlCQUNBOUQsRUFBQXFDLElBQUFhLGFBQUFOLEdBQUEsUUFBQWhELEVBQUFtQixtQkFJQSxRQUNBbEIsS0FBQUQsRUFBQUMsT0FFQU4sR0FBQThFLE9BQUE1RSxPQUFBQyxTQUVBSixHQUFBTyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBNeUNoYXRDb250cm9sbGVyID0gKGZ1bmN0aW9uKGlvLCAkLCBtb21lbnQsIE11c3RhY2hlKSB7XG4gIHZhciBzb2NrZXQgPSBpbygpO1xuICAvKlxuICAgIGFwcENvbnRyb2xsZXIgLSBNYWluIGNoYXQgY29udHJvbFxuICAqL1xuICB2YXIgYXBwQ3RybCA9IHtcbiAgICBpbml0OiBmdW5jdGlvbigpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdBcHAgc3RhcnRlZC4nKTtcbiAgICAgIHVpQ3RybC5zZXR1cEV2ZW50TGlzdGVuZXJzKCk7XG4gICAgICBuZXR3b3JrQ3RybC5pbml0KCk7XG4gICAgfSxcbiAgICBkaXNwYXRjaE1lc3NhZ2U6IGZ1bmN0aW9uKHRleHQpIHtcbiAgICAgIG5ldHdvcmtDdHJsLnNlbmRNZXNzYWdlKHRleHQsIHVpQ3RybC5jbGVhcklucHV0KTtcbiAgICB9LFxuICAgIG1lc3NhZ2VSZWNlaXZlZDogZnVuY3Rpb24obWVzc2FnZSkge1xuICAgICAgdmFyIHRpbWUgPSBhcHBDdHJsLmZvcm1hdFRpbWUobWVzc2FnZS5jcmVhdGVkQXQpO1xuICAgICAgdmFyIGZvcm1hdHRlZE1lc3NhZ2UgPSB7XG4gICAgICAgIHRleHQ6IG1lc3NhZ2UudGV4dCxcbiAgICAgICAgZnJvbTogbWVzc2FnZS5mcm9tLFxuICAgICAgICBjcmVhdGVkQXQ6IHRpbWUsXG4gICAgICB9O1xuICAgICAgdWlDdHJsLnJlbmRlck1lc3NhZ2UoZm9ybWF0dGVkTWVzc2FnZSk7XG4gICAgfSxcbiAgICBkaXNwYXRjaExvY2F0aW9uOiBmdW5jdGlvbigpIHtcbiAgICAgIGlmICghbmF2aWdhdG9yLmdlb2xvY2F0aW9uKSB7XG4gICAgICAgIHJldHVybiBhbGVydCgnR2VvbG9jYXRpb24gbm90IHN1cHBvcnQgYnkgeW91ciBicm93c2VyIScpO1xuICAgICAgfVxuXG4gICAgICB1aUN0cmwucmVuZGVyTG9jYXRpb25CdG4oJ2Rpc2FibGUnKTtcbiAgICAgIG5hdmlnYXRvci5nZW9sb2NhdGlvbi5nZXRDdXJyZW50UG9zaXRpb24oZnVuY3Rpb24ocG9zaXRpb24pIHtcbiAgICAgICAgdWlDdHJsLnJlbmRlckxvY2F0aW9uQnRuKCdlbmFibGUnKTtcbiAgICAgICAgdmFyIGNvb3JkcyA9IHtcbiAgICAgICAgICBsYXRpdHVkZTogcG9zaXRpb24uY29vcmRzLmxhdGl0dWRlLFxuICAgICAgICAgIGxvbmdpdHVkZTogcG9zaXRpb24uY29vcmRzLmxvbmdpdHVkZSxcbiAgICAgICAgfTtcbiAgICAgICAgbmV0d29ya0N0cmwuc2VuZExvY2F0aW9uKGNvb3Jkcyk7XG4gICAgICB9LCBmdW5jdGlvbigpIHtcbiAgICAgICAgdWlDdHJsLnJlbmRlckxvY2F0aW9uQnRuKCdlbmFibGUnKTtcbiAgICAgICAgYWxlcnQoJ3VuYWJsZSB0byBmZWN0aCBsb2NhdGlvbicpO1xuICAgICAgfSk7XG4gICAgfSxcbiAgICBsb2NhdGlvblJlY2VpdmVkOiBmdW5jdGlvbihsb2NhdGlvbk1zZykge1xuICAgICAgdmFyIHRpbWUgPSBhcHBDdHJsLmZvcm1hdFRpbWUobG9jYXRpb25Nc2cuY3JlYXRlZEF0KTtcbiAgICAgIHZhciBmb3JtYXR0ZWRMb2NhdGlvbiA9IHtcbiAgICAgICAgZnJvbTogbG9jYXRpb25Nc2cuZnJvbSxcbiAgICAgICAgdXJsOiBsb2NhdGlvbk1zZy51cmwsXG4gICAgICAgIGNyZWF0ZWRBdDogdGltZSxcbiAgICAgIH07XG4gICAgICB1aUN0cmwucmVuZGVyTG9jYXRpb24oZm9ybWF0dGVkTG9jYXRpb24pO1xuICAgIH0sXG4gICAgZm9ybWF0VGltZTogZnVuY3Rpb24odGltZSkge1xuICAgICAgcmV0dXJuIG1vbWVudCh0aW1lKS5mb3JtYXQoJ2g6bW0gYScpO1xuICAgIH0sXG4gICAgdXBkYXRlVXNlckxpc3Q6IGZ1bmN0aW9uKHVzZXJzKSB7XG4gICAgICB1aUN0cmwucmVuZGVyVXNlckxpc3QodXNlcnMpO1xuICAgIH0sXG4gIH07XG5cbiAgLypcbiAgICBuZXR3b3JrQ29udHJvbGxlciAtIG5ldHdvcmsgY29udHJvbFxuICAqL1xuICB2YXIgbmV0d29ya0N0cmwgPSB7XG4gICAgc2VuZE1lc3NhZ2U6IGZ1bmN0aW9uKG1lc3NhZ2UsIGNsZWFySW5wdXQpIHtcbiAgICAgIHNvY2tldC5lbWl0KCdjcmVhdGVNZXNzYWdlJywge1xuICAgICAgICB0ZXh0OiBtZXNzYWdlLFxuICAgICAgfSwgY2xlYXJJbnB1dCk7XG4gICAgfSxcbiAgICBzZW5kTG9jYXRpb246IGZ1bmN0aW9uKGNvb3Jkcykge1xuICAgICAgc29ja2V0LmVtaXQoJ2NyZWF0ZUxvY2F0aW9uTWVzc2FnZScsIGNvb3Jkcyk7XG4gICAgfSxcbiAgICBjb25uZWN0OiBmdW5jdGlvbigpIHtcbiAgICAgIHNvY2tldC5lbWl0KCdqb2luJywgdWlDdHJsLkRPTS4kcGFyYW1zLCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIGFsZXJ0KGVycik7XG4gICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnLyc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ05vIGVycm9yJyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0sXG4gICAgZGlzY29ubmVjdDogZnVuY3Rpb24oKSB7XG4gICAgICBjb25zb2xlLmxvZygnRGlzY29ubmVjdGluZyBmcm9tIGNoYXQnKTtcbiAgICB9LFxuICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgc29ja2V0Lm9uKCdjb25uZWN0JywgbmV0d29ya0N0cmwuY29ubmVjdCk7XG4gICAgICBzb2NrZXQub24oJ2Rpc2Nvbm5lY3QnLCBuZXR3b3JrQ3RybC5kaXNjb25uZWN0KTtcbiAgICAgIHNvY2tldC5vbignbmV3TWVzc2FnZScsIGFwcEN0cmwubWVzc2FnZVJlY2VpdmVkKTtcbiAgICAgIHNvY2tldC5vbigndXBkYXRlVXNlckxpc3QnLCBhcHBDdHJsLnVwZGF0ZVVzZXJMaXN0KTtcbiAgICAgIHNvY2tldC5vbignbmV3TG9jYXRpb25NZXNzYWdlJywgYXBwQ3RybC5sb2NhdGlvblJlY2VpdmVkKTtcbiAgICB9LFxuICB9O1xuXG4gIC8qXG4gICAgdWlDb250cm9sbGVyIC0gVXNlciBJbnRlcmZhY2UgQ29udHJvbGxlclxuICAqL1xuICB2YXIgdWlDdHJsID0ge1xuICAgIERPTToge1xuICAgICAgJG1lc3NhZ2VzOiAkKCcjbWVzc2FnZXMnKSxcbiAgICAgICRtZXNzYWdlVGVtcGxhdGU6ICQoJyNtZXNzYWdlLXRlbXBsYXRlJyksXG4gICAgICAkbWVzc2FnZUZvcm06ICQoJyNtZXNzYWdlLWZvcm0nKSxcbiAgICAgICR1c2VyczogJCgnI3VzZXJzJyksXG4gICAgICAkbWVzc2FnZUlucHV0OiAkKCdbbmFtZT1tZXNzYWdlXScpLFxuICAgICAgJGxvY2F0aW9uQnRuOiAkKCcjc2VuZC1sb2NhdGlvbicpLFxuICAgICAgJGxvY2F0aW9uTWVzc2FnZTogJCgnI2xvY2F0aW9uLW1lc3NhZ2UtdGVtcGxhdGUnKSxcbiAgICAgICRwYXJhbXM6ICQuZGVwYXJhbSh3aW5kb3cubG9jYXRpb24uc2VhcmNoKSxcbiAgICB9LFxuICAgIHJlbmRlck1lc3NhZ2U6IGZ1bmN0aW9uKG1lc3NhZ2UpIHtcbiAgICAgIHZhciBodG1sID0gTXVzdGFjaGUucmVuZGVyKHVpQ3RybC5ET00uJG1lc3NhZ2VUZW1wbGF0ZS5odG1sKCksIG1lc3NhZ2UpO1xuICAgICAgdWlDdHJsLkRPTS4kbWVzc2FnZXMuYXBwZW5kKGh0bWwpO1xuICAgIH0sXG4gICAgcmVuZGVyVXNlckxpc3Q6IGZ1bmN0aW9uKHVzZXJzKSB7XG4gICAgICB2YXIgb2wgPSAkKCc8b2w+PC9vbD4nKTtcbiAgICAgIHVzZXJzLmZvckVhY2goZnVuY3Rpb24odXNlcikge1xuICAgICAgICBvbC5hcHBlbmQoJCgnPGxpPjwvbGk+JykudGV4dCh1c2VyKSk7XG4gICAgICB9KTtcbiAgICAgICQoJyN1c2VycycpLmh0bWwob2wpO1xuICAgIH0sXG4gICAgcmVuZGVyTG9jYXRpb246IGZ1bmN0aW9uKGxvY2F0aW9uKSB7XG4gICAgICB2YXIgaHRtbExvY2F0aW9uID0gTXVzdGFjaGUucmVuZGVyKFxuICAgICAgICB1aUN0cmwuRE9NLiRsb2NhdGlvbk1lc3NhZ2UuaHRtbCgpLFxuICAgICAgICBsb2NhdGlvbik7XG4gICAgICB1aUN0cmwuRE9NLiRtZXNzYWdlcy5hcHBlbmQoaHRtbExvY2F0aW9uKTtcbiAgICB9LFxuICAgIGNsZWFySW5wdXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgdWlDdHJsLkRPTS4kbWVzc2FnZUlucHV0LnZhbCgnJyk7XG4gICAgfSxcbiAgICBoYW5kbGVVc2VySW5wdXQ6IGZ1bmN0aW9uKGUpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHZhciBtZXNzYWdlVGV4dCA9IHVpQ3RybC5ET00uJG1lc3NhZ2VJbnB1dC52YWwoKTtcbiAgICAgIGlmIChtZXNzYWdlVGV4dC50cmltKCkgPT09ICcnKSByZXR1cm47XG4gICAgICBhcHBDdHJsLmRpc3BhdGNoTWVzc2FnZShtZXNzYWdlVGV4dCk7XG4gICAgfSxcbiAgICByZW5kZXJMb2NhdGlvbkJ0bjogZnVuY3Rpb24oc3RhdHVzKSB7XG4gICAgICBpZihzdGF0dXMgPT09ICdkaXNhYmxlJykge1xuICAgICAgICB1aUN0cmwuRE9NLiRsb2NhdGlvbkJ0bi5hdHRyKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpXG4gICAgICAgICAgLnRleHQoJ1NlbmRpbmcgbG9jYXRpb24uLi4nKTtcbiAgICAgIH0gZWxzZSBpZihzdGF0dXMgPT09ICdlbmFibGUnKSB7XG4gICAgICAgIHVpQ3RybC5ET00uJGxvY2F0aW9uQnRuLnJlbW92ZUF0dHIoJ2Rpc2FibGVkJykudGV4dCgnU2VuZCBsb2NhdGlvbicpO1xuICAgICAgfVxuICAgIH0sXG4gICAgc2V0dXBFdmVudExpc3RlbmVyczogZnVuY3Rpb24oKSB7XG4gICAgICB1aUN0cmwuRE9NLiRtZXNzYWdlRm9ybS5vbignc3VibWl0JywgdWlDdHJsLmhhbmRsZVVzZXJJbnB1dCk7XG4gICAgICB1aUN0cmwuRE9NLiRsb2NhdGlvbkJ0bi5vbignY2xpY2snLCBhcHBDdHJsLmRpc3BhdGNoTG9jYXRpb24pO1xuICAgIH0sXG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBpbml0OiBhcHBDdHJsLmluaXQsXG4gIH07XG59KShpbywgalF1ZXJ5LCBtb21lbnQsIE11c3RhY2hlKTtcblxuTXlDaGF0Q29udHJvbGxlci5pbml0KCk7XG4iXX0=
